import express from "express";
import Joi from "joi";
import { Genre, connectToDatabase } from "../db/genresdb.mjs";

const router = express.Router();

connectToDatabase();

// creating a genre and saving to db
router.post("/", (req, res) => {
  const { error } = ValidateInput(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });
  const createGenre = async () => {
    try {
      const isPresent = Genre.find({ name: req.body.name });
      if (!isPresent) {
        const result = await genre.save();
        return res.status(201).send(result);
      } else {
        return res
          .status(409)
          .send("The Genre You are trying is already entered in to the system");
      }
    } catch (error) {
      throw error;
    }
  };
  createGenre();
});

// getting all the genres
router.get("/", (req, res) => {
  const getAllGenres = async () => {
    try {
      const genres = await Genre.find();
      return res.status(200).send(genres);
    } catch (error) {
      throw error;
    }
  };

  getAllGenres();
});

// get from a specific id from the db
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const findGenreById = async () => {
    try {
      const result = await Genre.findById(id);
      return res.status(200).send(result);
    } catch (error) {
      throw error;
    }
  };

  findGenreById();
});

// update a genre in db
router.put("/:id", (req, res) => {
  async function genreById() {
    try {
      const genre = await Genre.findById(req.params.id);
      if (!genre)
        return res
          .status(404)
          .send("The Genre you are looking to update not found in the system");

      const { error } = ValidateInput(req.body);
      if (error) return res.status(404).send(error.details[0].message);

      genre.set({
        name: req.body.name,
      });
      await genre.save();
      return res.status(200).send(genre);
    } catch (error) {
      throw error;
    }
  }

  genreById();
});

// delete a genre from db
router.delete("/:id", (req, res) => {
  async function genreById() {
    try {
      const genre = await Genre.findByIdAndDelete(req.params.id);
      if (!genre)
        return res
          .status(404)
          .send("The Genre you are looking to update not found in the system");
      return res.status(200).send(genre);
    } catch (error) {
      throw error;
    }
  }

  genreById();
});

// validation logic
const ValidateInput = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
  });

  return schema.validate(body);
};

export { router as genresRouter };
