import { environment } from "@/shared/environment/environment";
import axios from "axios";

export const getProvinces = async () => {
  try {
    const response = await axios.get(
      `${environment.baseUrl}/api/address-infomation/province`
    );
    return response.data;
  } catch (error) {
    console.log("api get provinces error.");
    return null;
  }
};

export const getDistricts = async (id: number) => {
  try {
    const response = await axios.get(
      `${environment.baseUrl}/api/address-infomation/districts/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("api get districs error.");
    return null;
  }
};

export const getWards = async (id: number) => {
  try {
    const response = await axios.get(
      `${environment.baseUrl}/api/address-infomation/ward/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("api get districs error.");
    return null;
  }
};
