import express from "express";
import { genresRouter } from "./routes/genres.mjs";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/genres", genresRouter);

app.listen(port, () => console.log(`Server Running on PORT: ${port}`));
