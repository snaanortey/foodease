import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import "express-async-errors";
import { config } from "dotenv";
import bodyParser from "body-parser";

config({ debug: true });

import getIngredientsById from "../src/routes/getIngredientsById";

const app = express();
const PORT: number = parseInt(process.env.PORT || "8000");

app.use(bodyParser.json());

app.use(cors());

app.use(fileUpload({ createParentPath: true }));

app.use("/ingredients", getIngredientsById);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
