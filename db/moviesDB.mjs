import mongoose from "mongoose";
import { genreSchema } from "./genresdb.mjs";

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLenght: 50,
  },
  genre: [genreSchema],
  numberInStock: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value.",
    },
  },
  dailyRentalRate: {
    type: Number,
    required: true,
  },
});

// Adding a pre-save middleware to round off daily rental rate to 2 decimal places
movieSchema.pre("save", function (next) {
  if (this.dailyRentalRate !== undefined && this.dailyRentalRate % 1 !== 0) {
    this.dailyRentalRate = parseFloat(this.dailyRentalRate.toFixed(3));
  }
  next();
});

export const Movie = mongoose.model("Movies", movieSchema);
