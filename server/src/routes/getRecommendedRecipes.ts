import express, { RequestHandler } from "express";
import { readFileSync } from "fs";
import path from "path";

const router = express.Router();

const routeHandler: RequestHandler = async (req, res) => {
  try {
    const recipeJSONFile = path.join(__dirname, "../data/recipes.json");
    const fileContent = readFileSync(recipeJSONFile, { encoding: "utf-8" });
    const recipeArray = await JSON.parse(fileContent);

    res.send(recipeArray);
  } catch (err) {
    console.log("Error getting recommended recipes", err);
    res.status(500).send("An unknown error occurred");
  }
};

router.get("/", routeHandler);

export default router;
