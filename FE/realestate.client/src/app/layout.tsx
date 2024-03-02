import React, { Suspense } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./public.global.css";

import StoreProvider from "./StoreProvider";
import { Metadata, NextPage } from "next";
import CommontLayout from "@/components/commonLayout/CommontLayout";
import SpinComponent from "@/components/shareComponents/spinComponent";

export const metadata: Metadata = {
  title: "Batdongsan.com",
  description: "Trang tin uy tín hàng đầu về bất động sản",
};

const RootLayout = ({ children }: { children: React.ReactElement }) => (
  <html lang="en">
    <body>
      <AntdRegistry>
        <StoreProvider>
            <CommontLayout>{children}</CommontLayout>
        </StoreProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;
