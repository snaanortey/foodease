import fs from "fs";
import { elasticClient } from "../services/elasticClient";
import { RecipeInJSONFile } from "../types";

const fileContent = fs.readFileSync("./scripts/ingredients.json", {
  encoding: "utf-8",
});
const recipes = JSON.parse(fileContent) as RecipesDataInJSONFile;

interface RecipesDataInJSONFile {
  [k: string]: RecipeInJSONFile;
}

const populateIndexWithRecipes = async (): Promise<void> => {
  for (const property in recipes) {
    try {
      const recipe = recipes[property];

      //Post each of the recipe objects (recipe) from the json file to the elasticsearch database
      await elasticClient.index({
        index: "recipes",
        document: recipe,
      });
      console.log("one doc has finished uploading");
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to upload recipe to the index`);
    }
  }
};

populateIndexWithRecipes().then(() => {
  console.log("finished indexing");
});
