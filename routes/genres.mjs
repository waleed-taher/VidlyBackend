import express from "express";
import Joi from "joi";

const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Thriller" },
  { id: 5, name: "Sci-Fi" },
];

// all the required genres
router.get("/", (req, res) => {
  return res.status(200).json({ data: genres });
});

// create a new genre
router.post("/", (req, res) => {
  const name = req.body.name;
  const { error } = ValidateInput(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genreName = genres.find((genre) => genre.name === name);
  if (genreName)
    return res
      .status(409)
      .send("The Genre You are trying is already entered in to the system");

  const body = {
    id: genres.length + 1,
    name,
  };
  genres.push(body);
  return res.status(201).send(body);
});

// update a genre
router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("The Genre you are looking to update not found in the system");

  const name = req.body.name;
  const { error } = ValidateInput(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  genre.name = name;
  return res.status(200).send(genre);
});

// delete a genre
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("The Genre you are looking to delete not found in the system");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  return res.status(200).send(genre);
});

// validation logic
const ValidateInput = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
  });

  return schema.validate(body);
};

export { router as genresRouter };
