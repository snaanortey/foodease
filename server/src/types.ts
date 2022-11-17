export interface Recipe {
  id: string;
  imageUrl: string;
  ingredients?: string[];
  picture_link?: string;
  instructions?: string;
  title?: string;
}

export interface ElasticSearchIndexRecipe {
  ingredients?: string[];
  picture_link?: string;
  instructions?: string;
  title?: string;
}

export interface RecipeInJSONFile {
  ingredients: string[];
  picture_link: string;
  instructions: string;
  title: string;
}

export interface ElasticSearchHits {
  _id: string;
  _source?: ElasticSearchIndexRecipe
  fields?: {
    ingredients?: string[][];
    picture_link?: string[];
    instructions?: string[];
    title?: string[];
  }
}

