import axios from "axios";
import axiosInstance from "@/shared/configs/axiosInstance";
import { environment } from "@/shared/environment/environment";
import { headers } from "next/headers";

//lấy thông tin người dùng hiện tại
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment.baseUrl}/api/user/my-info`,
      {
        headers: {
          accept: "text/plain",
        },
      }
    );
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    return null;
  }
};
