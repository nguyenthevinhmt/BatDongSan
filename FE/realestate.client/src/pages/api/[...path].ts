// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { environment } from "@/shared/environment/environment";
import Cookies from "cookies";
import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
// 	name: string
// }

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise((resolve) => {
    // Convert cookies to Authorization header
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access_token");
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    // don't forward cookies to API server
    req.headers.cookie = "";

    proxy.web(req, res, {
      target: `${environment.baseUrl}`,
      autoRewrite: false,
      changeOrigin: true,
      selfHandleResponse: false,
    });

    proxy.on("proxyRes", () => resolve(true));
  });
}
