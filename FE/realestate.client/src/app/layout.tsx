import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./public.global.css";

import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import StoreProvider from "./StoreProvider";
import SessionProviders from "./SessionProvider";
import { Metadata, NextPage } from "next";
import CommontLayout from "@/components/commonLayout/CommontLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Batdongsan.com",
  description: "Trang tin uy tín hàng đầu về bất động sản",
};

const RootLayout = ({ children }: {children: React.ReactElement}) => (
    <html lang="en">
      <body>
        <AntdRegistry>
          <StoreProvider>
            <CommontLayout>
              {children}
            </CommontLayout>
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
);

export default RootLayout;
