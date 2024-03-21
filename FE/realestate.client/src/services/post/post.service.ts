import { options } from './../../app/utils/index';
import { postStatus } from "@/shared/consts/postStatus";

import { environment } from "@/shared/environment/environment";
import axios from "axios";
import crypto from "crypto";
import axiosInstance from "@/shared/configs/axiosInstance";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";

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

export const deleteImage = async (id: number, publicId: string) => {
  try {
    const DbResponse = await axiosInstance.delete(
      `${environment.baseUrl}/api/post/delete-image?id=${id}`
    );
    if (DbResponse.status === HTTP_STATUS_CODE.OK) {
      const CloudResponse = await apiRemoveImage(publicId);
      return DbResponse;
    }
  } catch (error) {
    console.log("Error: Gọi api delete của image bị lỗi!!!");
    return null;
  }
}

interface IPost {
  title: string;
  description: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  detailAddress?: string;
  area: number;
  price: number;
  rentalObject?: number;
  youtubeLink?: string;
  postTypeId: number;
  realEstateTypeId: number;
  options: number;
  lifeTime: number;
  calculateType: number;
  listMedia?: MediaType[];
}

interface MediaType {
  name: string;
  description: string;
  mediaUrl: string;
}

export const addPost = async (info: IPost) => {
  const {
    title,
    description,
    province,
    district,
    ward,
    street,
    detailAddress,
    area,
    price,
    rentalObject,
    youtubeLink,
    postTypeId,
    realEstateTypeId,
    options,
    calculateType,
    lifeTime,
    listMedia,
  } = info;

  try {
    const response = await axiosInstance.post(
      `${environment.baseUrl}/api/post/add`,
      {
        title,
        description,
        province,
        district,
        ward,
        street,
        detailAddress,
        area,
        price,
        rentalObject,
        youtubeLink,
        postTypeId,
        realEstateTypeId,
        options,
        calculateType,
        lifeTime,
        listMedia,
      },
      {
        headers: {
          accept: "text/plain",
        },
      }
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response?.data;
    }
  } catch (error) {
    console.log("Error: Gọi api đăng bài bị lỗi!!!");
    return null;
  }
};

interface IFindAllPost {
  status?: number;
  postType?: number;
  realEstateType?: number;
  pageSize?: number;
  pageNumber?: number;
  keyword?: string;
}

export const findAll = async (info: IFindAllPost) => {
  try {
    const response = await axiosInstance.get(
      `${environment.baseUrl}/api/post/find-all`,
      {
        params: {
          status: info.status || null,
          postType: info.postType || null,
          realEstateType: info.realEstateType || null,
          pageSize: info.pageSize || -1,
          pageNumber: info.pageNumber || 1,
          keyword: info.keyword || null,
        },
      }
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response?.data;
    }
  } catch (error) {
    console.log("Error: Gọi api findAll của post bị lỗi!!!");
    return null;
  }
};

export const getById = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `${environment.baseUrl}/api/post/find-by-id?id=${id}`
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response;
    }
  } catch (error) {
    console.log("Error: Gọi api getbyid của post bị lỗi!!!");
    return null;
  }
};

export const getRealEstateType = async () => {
  try {
    const response = await axiosInstance.get(
      `${environment.baseUrl}/api/real-estate-type/find-all?pageSize=-1`
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response?.data;
    }
  } catch (error) {
    console.log("Error: Gọi api GET loại bất động sản");
    return null;
  }
};

interface IPayment {
  options: number;
  lifeTime: number;
  postStartDate?: Date;
  postEndDate?: Date;
}
export const updatePaymentStatus = async (payload: IPayment) => {
  try {
    const response = await axiosInstance.put(
      `${environment.baseUrl}/api/post/update-payment-status`,
      payload
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response?.data;
    }
  } catch {
    console.log("Error: Gọi api GET loại bất động sản");
    return null;
  }
};

//status pending mới phê duyệt dc
export const approvedPost = async (id: number) => {
  try {
    const response = await axiosInstance.put(
      `${environment.baseUrl}/api/post/approve?id=${id}`
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response;
    }
  } catch (error) {
    console.log("Error: Gọi api approved của post bị lỗi!!!");
    return null;
  }
};

export const removePost = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `${environment.baseUrl}/api/post/remove?id=${id}`
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response;
    }
  } catch (error) {
    console.log("Error: Gọi api remove của post bị lỗi!!!");
    return null;
  }
};

interface IUpdateStatus {
  id: number;
  status: number;
}

export const updateStatus = async (info: IUpdateStatus) => {
  try {
    const response = await axiosInstance.put(
      `${environment.baseUrl}/api/post/update-status`,
      {
        id: info.id,
        postStatus: info.status,
      }
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response;
    }
  } catch (error) {
    console.log("Error: Gọi api updateStatus của post bị lỗi!!!");
    return null;
  }
};

export const recommendPost = async ({ pageSize, pageNumber }: { pageSize: number, pageNumber: number }) => {
  try {
    const response = await axiosInstance.get(`${environment.baseUrl}/api/post/public/find-all`, {
      params: {
        pageSize: pageSize || -1,
        pageNumber: pageNumber
      },
    })
    return response?.data;
  } catch (error) {
    console.log("Error: Gọi api get public của post bị lỗi!!!");
    return null;
  }
}

interface IUpdatePost {
  id: number;
  status: number;
  title: string;
  description: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  detailAddress?: string;
  area: number;
  price: number;
  rentalObject?: number;
  youtubeLink?: string;
  postTypeId: number;
  realEstateTypeId: number;
  options: number;
  calculateType: number;
  lifeTime: number;
  listMedia?: UpdateMediaType[];
};

interface UpdateMediaType {
  id: number;
  name: string;
  description: string;
  mediaUrl: string;
}

export const updatePost = async (info: IUpdatePost) => { 
  try {
    const response = await axiosInstance.put(
      `${environment.baseUrl}/api/post/update`,
      {
        status: info.status,
        id: info.id,
        title: info.title,
        description: info.description,
        province: info.province,
        district: info.district,
        ward: info.ward,
        street: info.street,
        detailAddress: info.detailAddress,
        area: info.area,
        price: info.price,
        rentalObject: info.rentalObject,
        youtubeLink: info.youtubeLink,
        postTypeId: info.postTypeId,
        realEstateTypeId: info.realEstateTypeId,
        options: info.options,
        calculateType: info.calculateType,
        lifeTime: info.lifeTime,
        listMedia: info.listMedia,
      }
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response?.data;
    }
  } catch (error) {
    console.log("Error: Gọi api update của post bị lỗi!!!");
    return null;
  }
}

export const findAllPersonal = async (info: IFindAllPost) => {
  try {
    const response = await axiosInstance.get(
      `${environment.baseUrl}/api/post/personal/find-all`,
      {
        params: {
          status: info.status || null,
          postType: info.postType || null,
          realEstateType: info.realEstateType || null,
          pageSize: info.pageSize || -1,
          pageNumber: info.pageNumber || 1,
          keyword: info.keyword || null,
        },
      }
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response?.data;
    }
  } catch (error) {
    console.log("Error: Gọi api findAllPersional của post bị lỗi!!!");
    return null;
  }
}

interface IRepublishPost {
  id: number,
  lifeTime: number,
  options: number,
  walletNumber: string,
  postEndDate?: string
}

export const republishPost = async (info: IRepublishPost) => {
  try {
    const response = await axiosInstance.put(
      `${environment.baseUrl}/api/post/republish-post`,
      info
    );
    if (response.status === HTTP_STATUS_CODE.OK) {
      return response?.data;
    }
  } catch (error) {
    console.log("Error: Gọi api republish của post bị lỗi!!!");
    return null;
  }
}