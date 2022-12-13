import { errors } from "@elastic/elasticsearch";
import express, { RequestHandler } from "express";
import { elasticClient } from "../services/elasticClient";

const router = express.Router();

const routeHandler: RequestHandler = async (req, res) => {
  try {
    const query = {
      index: "recipes",
      id: req.params.id,
    };

    const result = await elasticClient.get(query);

    res.json(result._source);
  } catch (err) {
    console.log("Error getting ingredients by id", err);
    // if err is an object of the class ResponseError
    if (err instanceof errors.ResponseError) {
      res
        .status(err.meta.statusCode!)
        .send("Ingredients not found in database");
      return;
    }

    res.status(500).send("An unknown error occurred");
  }
};

router.get("/:id", routeHandler);

export default router;