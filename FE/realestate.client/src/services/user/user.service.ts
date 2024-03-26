import axios from "axios";
import axiosInstance from "@/shared/configs/axiosInstance";
import { environment } from "@/shared/environment/environment";

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
      return response?.data;
    }
  } catch (error) {
    return null;
  }
};

//update thông tin người dùng hiện tại
export const updateUserInfo = async (payload: any) => {
  try {
    const response = await axiosInstance.put(`${environment.baseUrl}/api/user/update`, {
      email: payload?.email,
      phone: payload?.phoneNumber,
      fullname: payload?.fullname,
      status: payload?.status,
      taxCode: payload?.taxCode
    });
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log("Error: api thay đổi thông tin người dùng bị lỗi!!!");
    return null;
  }
}

//thay đổi mật khẩu
export const changePassword = async (payload: any) => {
  try {
    const response = await axiosInstance.put(`${environment.baseUrl}/api/user/change-password`, {
      oldPassword: payload?.oldPassword,
      newPassword: payload?.newPassword
    });
    if (response.status === 200) {
      return response?.data;
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

export const deactiveAccount = async (password: string) => {
  try {
    const response = await axiosInstance.put(`${environment.baseUrl}/api/user/deactive-account?password=${password}`);
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    console.log("error: api khóa tài khoản lỗi!!!");
    return null;
  }
}

export const logout = async () => {
  try {
    const response = await axiosInstance.post(
      `${environment.baseUrl}/connect/logout`,
      null,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response?.data
  }
  catch {
    return null
  }
}

export const getFrontIdentificationCardInfo = async (formData: any) => {
  try {
    const response = await axios.post(
      `${environment.OcrUrl}?type=1`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data
  }
  catch (error) {
    console.log(error)
    return error
  }
}

export const getBackwardIdentificationCardInfo = async (formData: any) => {
  try {
    const response = await axios.post(
      `${environment.OcrUrl}?type=2`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data
  }
  catch (error) {
    console.log(error)
    return error
  }
}

export const getAllUserIdentification = async () => {
  try {
    const response = await axiosInstance.get(`${environment.baseUrl}/api/user/user-identification/find-all`);
    return response?.data
  }
  catch (error) {
    console.log(error)
    return error
  }
}