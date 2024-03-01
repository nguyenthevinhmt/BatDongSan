import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./public.global.css";

import StoreProvider from "./StoreProvider";
import { Metadata, NextPage } from "next";
import Head from 'next/head';
import CommontLayout from "@/components/commonLayout/CommontLayout";

export const metadata: Metadata = {
  title: "Batdongsan.com",
  description: "Trang tin uy tín hàng đầu về bất động sản",
};

const RootLayout = ({ children }: { children: React.ReactElement }) => (
  <html lang="en">
    <body>
      <link rel="icon" href="../../favicon_io/favicon.ico" sizes="any" />
      <AntdRegistry>
        <StoreProvider>
          <CommontLayout>{children}</CommontLayout>
        </StoreProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
