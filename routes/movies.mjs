import express from "express";
import Joi from "joi";
import { Movie } from "../db/moviesDB.mjs";
import { Genre } from "../db/genresdb.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error, value } = validateMovies(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({
    title: value.title,
    genre: value.genre.map((genre) => new Genre({ name: genre.name })),
    numberInStock: value.numberInStock,
    dailyRentalRate: value.dailyRentalRate,
  });
  movie = await movie.save();
  res.status(200).send(movie);
});

router.get("/", async (req, res) => {
  const movie = await Movie.find().sort({ title: 1 });
  res.status(200).send(movie);
});

const validateMovies = (body) => {
  const genreSchemaForValidation = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.array().items(genreSchemaForValidation).required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  });

  return schema.validate(body);
};

export { router as moviesRouter };
