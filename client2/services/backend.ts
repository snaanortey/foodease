import axios, { AxiosStatic } from 'axios';
import { MealSearchResult, RecipePerMealSelected } from '../types';

class BackendService {
  private httpClient: AxiosStatic;
  private baseUrl: string;
  private bearerToken: string | null;

  constructor() {
    this.baseUrl = 'http://localhost:8000';
    this.httpClient = axios;
    this.bearerToken = null;
  }

  /**
   * Returns a full backend API url which includes the base url and a route
   * @param route a / prefixed route segment e.g. /profile
   * @returns a full backend API url
   */
  private buildFullUrl = (route: string): string => {
    return `${this.baseUrl}${route}`;
  };

  public searchMealName = async (
    mealId: string
  ): Promise<MealSearchResult[]> => {
    try {
      const url = this.buildFullUrl(`/meals/search?query=${mealId}`);
      const { data } = await this.httpClient.get<MealSearchResult[]>(url);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  public getRecipebyId = async (
    recipeId: string
  ): Promise<RecipePerMealSelected> => {
    try {
      const url = this.buildFullUrl(`/ingredients/${recipeId}`);
      const { data } = await this.httpClient.get(url);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export const backendService = new BackendService();
