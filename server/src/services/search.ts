import { elasticClient } from "./elasticClient";
import axios from "axios";
import {Recipe} from "../../src/types";

interface PartialMatchQueries {
  match: PartialMatchQueriesInnerValue;
}

interface PartialMatchQueriesInnerValue {
  ingredients: string;
}



/**
 * The functions takes an array of ingredients and return an array of objects with a format to be queried in elastic search
 * @param keywordsToSearch an array of ingredients
 * @returns an array of objects
 */
function buildPartialQueriesFromKeywords(
  keywordsToSearch: string[]
): PartialMatchQueries[] {
  const partialMatchQueries = keywordsToSearch.map((item) => ({
    match: { ingredients: item },
  }));
  return partialMatchQueries;
}

/**
 * Returns a promise
 * @returns the image propery of the API response
 */
async function getRandomImage(): Promise<string> {
  const { data } = await axios.get("https://foodish-api.herokuapp.com/api/");
  return data.image;
}

export const searchIngredientsByKeyWords = async (keywords: string[]): Promise<Recipe[]> => {
    const modifiedArray = buildPartialQueriesFromKeywords(keywords);
  
    const elasticSearchQuery = {
      query: {
        bool: {
          should: modifiedArray,
        },
      },
    };
  
    const result = await elasticClient.search<Recipe>(elasticSearchQuery as any);
  
    // for each result in hits, start fetching n number of random images in parallel
    const imagePromises = result.hits.hits.map(getRandomImage);
    const images = await Promise.all(imagePromises);
  
    const response = result.hits.hits.map((item, i) => ({
      id: item._id,
      imageUrl: images[i],
      ...item._source,
    }));
  
    return response;
  };

