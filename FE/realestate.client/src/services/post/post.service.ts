import { environment } from "@/shared/environment/environment";
import axios from "axios";
import crypto from "crypto";

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
