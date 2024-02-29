import axios from "axios";
import { RefreshTokenConfig } from "./authConfig";
import { environment } from "../environment/environment";
import { authConst } from "@/app/(auth)/auth/const/authConst";
import { CookieService, saveToken } from "../services/cookies.service";
import { CommonStatus } from "../consts/CommonStatus";
import { useDispatch } from "react-redux";

interface RefreshTokenType {
  grant_type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

const axiosInstance = axios.create({
  baseURL: environment.baseUrl,
  timeout: 300000,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = CookieService.getAccessToken();
    if(accessToken){
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === CommonStatus.ERROR) {
      window.location.href = authConst.RouteConst.loginRouter;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = CookieService.getRefreshToken();

    if (!refreshToken) {
      console.log("Không có refresh token trong cookies", refreshToken);
      localStorage.clear();
      return Promise.reject(error);
    } else if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        const body: RefreshTokenType = {
          client_id: RefreshTokenConfig.client_id,
          client_secret: RefreshTokenConfig.client_secret,
          grant_type: RefreshTokenConfig.grant_type,
          refresh_token: refreshToken,
        };

        try {
          const response = await axios.post(environment.authBaseUrl, body, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          if (response.status === 200) {
            const { res } = response?.data;
            console.log("Data from refresh token success", response?.data);
            saveToken({
              access_token: response?.data.access_token,
              refresh_token: response?.data.refresh_token,
            });
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.access_token}`;

            return axiosInstance(error.config);
          } else {
            console.log("Error refreshing token");
          }
        } catch (error) {
          CookieService.removeToken();
        } finally {
          isRefreshing = false;
        }
      }

      // Return a promise that will resolve with the new token
      return new Promise((resolve) => {
        refreshSubscribers.push((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
