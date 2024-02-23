import axios from "axios";
import { RefreshTokenConfig } from "./authConfig";
import { environment } from "../environment/environment";
import { authConst } from "@/app/(auth)/auth/const/authConst";
import { useRouter } from "next/navigation";
import {
  CookieService,
  SaveTokenToLocalStorage,
  saveToken,
} from "../services/cookies.service";
import { CommonStatus } from "../consts/CommonStatus";

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
let refreshSubscribers: any[] = [];

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = CookieService.getAccessToken();
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
    if (response.status === CommonStatus.ERROR) {
      console.log("Lỗi trả về từ .net 500");
      window.location.href = authConst.RouteConst.loginRouter;
    }
    return response;
  },
  async (error) => {
    const refreshToken = CookieService.getRefreshToken();
    if (!refreshToken) {
      console.log("Không có refresh token trong cookies", refreshToken);
      // window.location.href = authConst.RouteConst.loginRouter;
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        const body: RefreshTokenType = {
          client_id: RefreshTokenConfig.client_id,
          client_secret: RefreshTokenConfig.client_secret,
          grant_type: RefreshTokenConfig.grant_type,
          refresh_token: refreshToken,
        };

        try {
          const response = await axios.post(
            environment.authBaseUrl,
            body,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          if (response.status === 200) {
            const { res } = response?.data;
            console.log("Data from refresh token success", res);

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

            // Resolve all the subscribers with the new token
            refreshSubscribers.forEach((callback) =>
              callback(res.access_token)
            );
          } else {
            console.log("Error refreshing token");
            // window.location.href = authConst.RouteConst.loginRouter;
          }
        } catch (error) {
          console.log("Error calling refresh token API", error);
          // window.location.href = authConst.RouteConst.loginRouter;
        } finally {
          isRefreshing = false;
          refreshSubscribers = [];
        }
      }

      // Return a promise that will resolve with the new token
      return new Promise((resolve) => {
        refreshSubscribers.push((newToken: string) => {
          error.config.headers.Authorization = `Bearer ${newToken}`;
          resolve(axios(error.config));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance
