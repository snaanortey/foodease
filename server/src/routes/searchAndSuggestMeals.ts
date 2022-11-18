import express, { RequestHandler } from "express";
import { elasticClient } from "../services/elasticClient";
import { ElasticSearchHits, ElasticSearchIndexRecipe, Recipe } from "../types";

const router = express.Router();

/**
 * RecipeTeaser is a subset of recipe which contains meal names(title) and id properties of the recipe object
 * RecipeTeaser type was created from (is a subset of) type Recipe which has been defined in types.ts file
 */
type RecipeTeaser = Pick<Recipe, "id" | "title">;

/**
 * This function takes Elastic search hits results which is of type ElasticSearchHits in the type.ts file
 * and transform the elastic search hits object into a simplifiled object of type RecipeTeaser
 * @param item Elastic search hits results which is of type ElasticSearchHits in the type.ts file
 * @returns Null or Simplified object of properties id and title
 */
const buildRecipeTeaserFromSearchResults = (
  item: ElasticSearchHits
): RecipeTeaser | null => {
  if (!item.fields?.title) {
    return null;
  }
  const result = {
    id: item._id,
    title: item.fields.title[0],
  };
  return result;
};

const routeHandler: RequestHandler = async (req, res) => {
  try {
    const query = {
      index: "recipes",
      _source: false,
      query: {
        match_phrase_prefix: {
          title: req.query.query,
        },
      },
      fields: ["title"],
    };

    const result = await elasticClient.search<ElasticSearchIndexRecipe>(query);

    const array: ElasticSearchHits[] = result.hits.hits;

    const apiResponse = array.map(buildRecipeTeaserFromSearchResults);

    const nullFilterHandler = (item: RecipeTeaser | null): boolean => {
      // Returns true if the item is not null. Otherwise, returns false
      if (item !== null) return true;
      return false;
    };
    const filteredApiResponse = apiResponse.filter(nullFilterHandler);

    res.send(filteredApiResponse);
  } catch (err) {
    console.log(err);
    res.status(404).send("failed to load meal suggestions");
  }
};

router.get("/", routeHandler);

export default router;
