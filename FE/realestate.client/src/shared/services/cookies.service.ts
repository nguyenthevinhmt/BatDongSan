// Trong file trang hoặc API route
import Cookies from "js-cookie";

export class CookieService {
  static saveToken(params: any) {
    Cookies.set("access_token", params.access_token, {
      expires: Date.now() + params.expires_in,
    });
    Cookies.set("refresh_token", params.refresh_token, {
      expires: Date.now() + params.expires_in,
    });
  }
  static removeToken() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  }
  static getAccessToken() {
    return Cookies.get("access_token");
  }
  static getRefreshToken() {
    return Cookies.get("refresh_token");
  }
}

export const saveToken = (params: any) => {
  try {
    Cookies.set("access_token", params.access_token, {
      expires: Date.now() + params.expires_in,
      secure: true,
    });
    Cookies.set("refresh_token", params.refresh_token, {
      expires: Date.now() + params.expires_in,
      secure: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const SaveTokenToLocalStorage = (params: any) => {
  try {
    localStorage.setItem("access_token", params.access_token);
    localStorage.setItem("refresh_token", params.refresh_token);
  } catch (error) {
    console.log(error);
  }
};
export const GetTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  return {
    accessToken,
    refreshToken,
  };
};
