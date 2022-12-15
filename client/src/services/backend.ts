import axios, { AxiosStatic } from "axios";
import { UserProfile } from "../types";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

class BackendService {
  private httpClient: AxiosStatic;

  private baseUrl: string;
  private bearerToken: string | null;

  constructor() {
    this.baseUrl = "http://localhost:8000";
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

  public login = async (
    userCredentials: LoginCredentials
  ): Promise<boolean> => {
    try {
      const loginRoute = "/login";
      const url = this.buildFullUrl(loginRoute);
      const { data } = await this.httpClient.post<LoginResponse>(
        url,
        userCredentials,
        {
          withCredentials: true,
        }
      );
      const { token } = data;
      // Save token to bearerToken property
      this.bearerToken = token;
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  public getUserProfile = async (): Promise<UserProfile> => {
    try {
      const url = this.buildFullUrl("/profile");
      const { data } = await this.httpClient.get<UserProfile>(url, {
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export const backendService = new BackendService();
