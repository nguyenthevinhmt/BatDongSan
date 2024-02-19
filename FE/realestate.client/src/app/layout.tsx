import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./public.global.css";

import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import StoreProvider from "./StoreProvider";
import SessionProviders from "./SessionProvider";
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Batdongsan.com",
  description: "Trang tin uy tín hàng đầu về bất động sản",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <StoreProvider>
    <html lang="en">
      <body>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  </StoreProvider>
);

export default RootLayout;
