// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { LoginConfig } from "@/shared/configs/authConfig";
import axios from "axios";
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = "http://localhost:5083/connect/token";
  const { username, password } = req.body;
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", LoginConfig.grant_type);
  params.append("client_id", LoginConfig.client_id);
  params.append("scope", LoginConfig.scope);
  params.append("client_secret", LoginConfig.client_secret);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params.toString(),
  };
  req.headers.cookie = "";
  try {
    const response = await axios(url, options);
    const data = await response.data;
    const cookies = new Cookies(req, res);
    cookies.set("access_token", data.access_token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(data.expires_in),
    });
    cookies.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + data.expires_in),
    });
    const accessTokenCookie = `access_token=${data.access_token}; HttpOnly; SameSite=Lax; Expires=Session`;
    const refreshTokenCookie = `refresh_token=${data.refresh_token}; HttpOnly; SameSite=Lax; Expires=Session`;
    res.setHeader("Set-Cookie", [accessTokenCookie, refreshTokenCookie]);
    // res. = cookies.toString();
    console.log("data", data);
    (res as NextApiResponse).status(200).json(data);
  } catch (err) {
    let getError = (err as any).response.data;
    console.error("error login", getError);
    (res as NextApiResponse).status(400).json(getError);
  }
}
