import mongoose from "mongoose";

let isConnected = false;
let db;
const MONGOURL = process.env.MONGO_URL;
export async function connectToDatabase() {
  if (isConnected) {
    console.log("Database Already Connected");
    return;
  }

  try {
    db = await mongoose.connect(MONGOURL, { dbName: "vidly" });
    isConnected = true;
    console.log("MongoDB is connected");
    return db;
  } catch (error) {
    throw error;
  }
}

export const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Genre Name"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const Genre = mongoose.model("Genre", genreSchema);
