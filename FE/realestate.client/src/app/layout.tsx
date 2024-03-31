import React from "react";
import "./public.global.css";
import { Metadata } from "next";
import CommontLayout from "@/components/commonLayout/CommontLayout";
import ToastProvider from "@/shared/provider/toast.provider";
import { Lexend } from "next/font/google";
import StyledComponentsRegistry from "./AntdRegistry";
import dynamic from "next/dynamic";
import ServerHeaderComponent from "@/components/shareLayout/serverHeader";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const ReduxProvider = dynamic(() => import("@/app/StoreProvider"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Batdongsan.com",
  description: "Trang tin uy tín hàng đầu về bất động sản",
};

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const RootLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <link rel="icon" href="../../favicon_io/favicon.ico" sizes="any" />
        {/* <ServerHeaderComponent /> */}
        <AntdRegistry>
          <ReduxProvider>
            <CommontLayout>
              <ToastProvider>{children}</ToastProvider>
            </CommontLayout>
          </ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
