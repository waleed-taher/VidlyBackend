import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { genresRouter } from "./routes/genres.mjs";
import { connectToDatabase } from "./db/genresdb.mjs";
import { customerRouter } from "./routes/customer.mjs";
import { moviesRouter } from "./routes/movies.mjs";
const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();
app.use(express.json());
app.use("/api/genres", genresRouter);
app.use("/api/customers", customerRouter);
app.use("/api/movies", moviesRouter);

app.listen(port, () => console.log(`Server Running on PORT: ${port}`));

// fawn
// object_id
