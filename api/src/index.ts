import express, { Request, Response } from "express";
import dotenv from "dotenv";

import { catalogRouter } from "./routes/catalog.js";

dotenv.config();

const app = express();
const port = process.env.NODE_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", catalogRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
