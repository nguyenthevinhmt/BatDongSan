// Trong file trang hoặc API route
import Cookies from "js-cookie";

export class CookieService {
  static saveToken(params: any) {
    Cookies.set("access_token", params.access_token, {
      expires: params.expires_in,
    });
    Cookies.set("refresh_token", params.refresh_token, {
      expires: params.expires_in,
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
    console.log("params", params);
    Cookies.set("access_token", params.access_token, {
      expires: params.expires_in,
      // httpOnly: true,
    });
    Cookies.set("refresh_token", params.refresh_token, {
      expires: params.expires_in,
      // httpOnly: true,
    });
  } catch (error) {
    console.log("Có lỗi xảy ra khi lưu token vào cookies", error);
  }
};
