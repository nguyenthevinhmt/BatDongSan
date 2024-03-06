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

//update thông tin người dùng hiện tại
export const updateUserInfo = async (email: string, phone: string, fullname: string, id: number, status: number) => {
  try {
    const response = await axiosInstance.put(`${environment.baseUrl}/api/user/update`, {
      username: "",
      password: "",
      email: email,
      phone: phone,
      fullname: fullname,
      status: status,
      id: id
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log("Error: api thay đổi thông tin người dùng bị lỗi!!!");
    return null;
  }
}

//thay đổi mật khẩu
export const changePassword = async (oldPass: string, newPass: string) => {
  try {
    const response = await axiosInstance.put(`${environment.baseUrl}/api/user/change-password`, {
      oldPassword: oldPass,
      newPassword: newPass
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log("Error: api thay đổi mật khảu lỗi!!!");
    return null;
  }
}

//xóa tài khoản (yêu cầu quyền)
export const removeAccount = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`${environment.baseUrl}/api/user/remove?id=${id}`);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log("error: api xóa tài khoản lỗi!!!");
    return null;
  }
}