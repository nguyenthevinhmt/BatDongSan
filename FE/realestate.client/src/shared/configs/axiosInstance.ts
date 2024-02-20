// axiosInstance.js
import axios from "axios";
import { RefreshTokenConfig } from "./authConfig";
import { environment } from "../environment/environment";
import { authConst } from "@/app/(auth)/auth/const/authConst";
import { redirect } from "next/navigation";
import {
  // CookieService,
  SaveTokenToLocalStorage,
  saveToken,
} from "../services/cookies.service";

interface RefreshTokenType {
  grant_type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

const axiosInstance = axios.create({
  baseURL: environment.baseUrl, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here, e.g., handling pagination
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        redirect(authConst.RouteConst.loginRouter);
      }
      const body: RefreshTokenType = {
        client_id: RefreshTokenConfig.client_id,
        client_secret: RefreshTokenConfig.client_secret,
        grant_type: RefreshTokenConfig.grant_type,
        refresh_token: refreshToken,
      };
      const response = await axios.post(environment.authBaseUrl, body);
      if (response.status === 200) {
        const { res } = response?.data;
        saveToken({
          access_token: res.access_token,
          refresh_token: res.refresh_token,
        });
        SaveTokenToLocalStorage({
          access_token: res.access_token,
          refresh_token: res.refresh_token,
        });
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.access_token}`;
        // Retry request ban đầu
        return axios.request(error.config);
      } else {
        redirect(authConst.RouteConst.loginRouter);
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
