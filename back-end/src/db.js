import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const db = "React-Manga";
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING + db);
    console.log(
      `Express server now connected to MongoDB using the ${db} database`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
