import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  postedBy: { type: String, required: true },
  text: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

const mangaSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String },
  imageUrl: { type: String },
  upvotes: { type: Number, default: 0 },
  comments: [commentSchema],
});

const Manga = model("Manga", mangaSchema);

export default Manga;
