import { environment } from "@/shared/environment/environment";
import axios from "axios";
import crypto from "crypto";
import axiosInstance from "@/shared/configs/axiosInstance";

const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};
export const apiUploadImage = async ({ file, onSuccess, onError }: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cm322ypn");

    const response = await fetch(environment.cloudinary_url, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      onSuccess();
      return result;
    } else {
      onError();
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    onError();
  }
};
export const getPublicIdFromUrl = (url: string) => {
  const regex = /\/image\/upload\/v\d+\/(.*)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const apiRemoveImage = async (publicId: string) => {
  const cloudName = environment.CLOUDINARY_NAME;
  const timestamp = new Date().getTime();
  const apiKey = environment.API_KEY;
  const apiSecret = environment.API_SECRET;
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });
  } catch (error) {
    console.error(error);
  }
};

interface post {
  title: string,
  description: string,
  province: string,
  distinct: string,
  ward: string,
  street: string,
  detailAddress: string,
  area: number,
  price: number,
  rentalObject: number,
  youtubeLink: string,
  postTypeId: number,
  realEstateTypeId: number,
  walletNumber: string,
  transactionAmount: number,
  transactionNumber: string,
  listMedia: MediaType[]
}

interface MediaType {
  name: string;
  description: string;
  mediaUrl: string;
}

export const addPost = async (info: post) => {
  const {
    title,
    description,
    province,
    distinct,
    ward,
    street,
    detailAddress,
    area,
    price,
    rentalObject,
    youtubeLink,
    postTypeId,
    realEstateTypeId,
    walletNumber,
    transactionAmount,
    transactionNumber,
    listMedia
  } = info;

  try {
    const response = await axiosInstance.post(`${environment.baseUrl}/api/post/add`,
      {
        title,
        description,
        province,
        distinct,
        ward,
        street,
        detailAddress,
        area,
        price,
        rentalObject,
        youtubeLink,
        postTypeId,
        realEstateTypeId,
        walletNumber,
        transactionAmount,
        transactionNumber,
        listMedia
      }, {
      headers: {
        accept: "text/plain"
      }
    });
    if (response.status === 200) {
      return response;
    }
  }
  catch (error) {
    console.log("Error: Gọi api đăng bài bị lỗi!!!");
    return null;
  }
}

export const getById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`${environment.baseUrl}/api/post/find-by-id?id=${id}`);
    if (response.status === 200) {
      return response;
    }
  }
  catch (error) {
    console.log("Error: Gọi api getbyid của post bị lỗi!!!");
    return null;
  }
}