// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyReqCallback, ProxyResCallback } from "http-proxy";
import { environment } from "@/shared/environment/environment";
import { LoginConfig } from "@/shared/configs/authConfig";

export const config = {
  api: {
    bodyParser: true,
  },
};

type Data = {
  message: string;
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "method not supported" });
  }
  console.log("req.body", req.body);
  const { username, password } = req.body;
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", LoginConfig.grant_type);
  params.append("client_id", LoginConfig.client_id);
  params.append("scope", LoginConfig.scope);
  params.append("client_secret", LoginConfig.client_secret);
  const encodedData = params.toString();
  req.body = encodedData;
  console.log("req.body1", req.body);

  return new Promise((resolve) => {
    // don't forward cookie
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyResponse, req, res) => {
      let apiResponseBody = "";
      proxyResponse.on("data", (chunk) => {
        console.log(chunk);
        apiResponseBody += chunk;
      });

      proxyResponse.on("end", () => {
        try {
          // Extract the authToken from API's response:
          const { access_token, refresh_token, expires_in } =
            JSON.parse(apiResponseBody);
          console.log({ accessToken: access_token, expires_in, refresh_token });
          // Set the authToken as an HTTP-only cookie.
          // We'll also set the SameSite attribute to
          // 'lax' for some additional CSRF protection.
          const cookies = new Cookies(req, res);
          cookies.set("access_token", access_token, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(expires_in),
          });
          cookies.set("refresh_token", refresh_token, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(expires_in),
          });

          // Our response to the client won't contain
          // the actual authToken. This way the auth token
          // never gets exposed to the client.
          (res as NextApiResponse)
            .status(200)
            .json({ message: "Đăng nhập thành công" });
        } catch (error) {
          console.log("parse token error", error);
          (res as NextApiResponse)
            .status(400)
            .json({ message: "Đăng nhập thất bại" });
        }

        resolve(true);
      });
    };
    // const handleLoginRequest: ProxyReqCallback = (proxyRequest, req, res) => {
    //   proxyRequest.setHeader("Content-Type", "x-www-form-urlendcoded");
    // };
    // proxy.on("proxyReq", handleLoginRequest);
    proxy.on("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: `${environment.authBaseUrl}?`,
      autoRewrite: false,
      changeOrigin: true,
      selfHandleResponse: false,
    });
  });
}
