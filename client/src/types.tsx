export interface Recipes {
  id: string;
  imageUrl: string;
  ingredients: string[];
  picture_link?: string | null;
  instructions: string;
  title: string;
}
