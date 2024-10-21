import express from "express";
import { connectDB } from "./db.js";
import Manga from "../models/manga.js";
import fs from "fs";
import admin from "firebase-admin";
import mangaList from "../data/mangaList.js";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.use(async (req, res, next) => {
  const { authtoken } = req.headers;
  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }
  req.user = req.user || {};
  next();
});

connectDB().then(async () => {
  //If the database is empty refill it here
  // Prefill data if the collection is empty
  const count = await Manga.countDocuments();
  if (count === 0) {
    try {
      await Manga.insertMany(mangaList);
      console.log(
        "Sample mangas with comments and descriptions inserted into the database."
      );
    } catch (error) {
      console.error("Error inserting sample mangas:", error.message);
    }
  }
});

app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Connection works!" });
});

app.get("/api/mangas", async (req, res) => {
  console.log("Fetching all mangas");
  try {
    const mangas = await Manga.find();
    res.status(200).json(mangas);
  } catch (error) {
    console.error("Error fetching manga:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching manga data." });
  }
});

// Sample GET endpoint to fetch a manga by title
app.get("/api/mangas/:mangaId", async (req, res) => {
  const { mangaId } = req.params;
  const { uid } = req.user;

  console.log("Fetching id:", mangaId);
  try {
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    const upvoteIds = manga.upvoteIds || [];
    manga.canUpvote = uid && !upvoteIds.includes(uid);
    res.json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

// PUT endpoint for upvoting a manga
app.put("/api/mangas/:mangaId/upvote", async (req, res) => {
  const { mangaId } = req.params;
  const { uid } = req.user;

  console.log("Upvoting:", mangaId);
  try {
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    const upvoteIds = manga.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);
    if (canUpvote) {
      manga.upvotes += 1;
      manga.upvoteIds.push(uid);
    }

    await manga.save();
    res.json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST endpoint to add a comment to a manga
app.post("/api/mangas/:mangaId/comments", async (req, res) => {
  const { mangaId } = req.params;
  const { text } = req.body;
  const { email } = req.user;
  console.log("Adding comment to:", mangaId);
  try {
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }

    console.log(email);
    const comment = { postedBy: email, text, postedAt: new Date() };
    manga.comments.push(comment);
    await manga.save();
    res.status(201).json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is listening on port ${PORT}`);
});
