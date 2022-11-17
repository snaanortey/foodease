import express, {RequestHandler} from "express";
import { searchIngredientsByKeyWords } from "../services/search";

const router = express.Router();

const routeHandler: RequestHandler = async (req, res) => {
  try {
    const response = await searchIngredientsByKeyWords(req.body);

    res.send(response);
  } catch (err) {
    console.log("error:", err);
    res.status(404).send("failed to load recipes");
  }
};

router.post("/", routeHandler);

export default router;