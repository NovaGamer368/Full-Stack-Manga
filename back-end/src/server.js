import express from "express";
import { connectDB } from "./db.js";
import Manga from "../models/manga.js";
import mangaList from "../data/mangaList.js";

const PORT = 8000;
const app = express();
app.use(express.json());
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
  console.log("Fetching id:", mangaId);
  try {
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    res.json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT endpoint for upvoting a manga
app.put("/api/mangas/:mangaId/upvote", async (req, res) => {
  const { mangaId } = req.params;
  console.log("Upvoting:", mangaId);
  try {
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }
    manga.upvotes += 1;
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
  const { postedBy, text } = req.body;

  console.log("Adding comment to:", mangaId);
  try {
    const manga = await Manga.findById(mangaId);
    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }

    const comment = { postedBy, text, postedAt: new Date() };
    manga.comments.push(comment);
    await manga.save();
    res.status(201).json(manga);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
