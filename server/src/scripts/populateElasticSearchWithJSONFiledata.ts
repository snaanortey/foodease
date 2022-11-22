import {config} from "dotenv";
config();
import { elasticClient } from "../services/elasticClient";
import { RecipeInJSONFile } from "../types";
import untypedRecipes from "./ingredients.json";

interface RecipesDataInJSONFile {
  [k: string]: RecipeInJSONFile;
}

const recipes = untypedRecipes as RecipesDataInJSONFile;

const populateIndexWithRecipes = async (): Promise<void> => {
  for (const property in recipes) {
    try {
      const recipe = recipes[property];


      //Post each of the recipe objects (recipe) from the json file to the elasticsearch database
      const result = await elasticClient.index({
        index: "recipes",
        document: recipe,
      });
      console.log(`Uploaded doc with id: ${result._id}`);
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to upload recipe to the index`);
    }
  }
};

populateIndexWithRecipes().then(() => {
  console.log("finished indexing");
});
