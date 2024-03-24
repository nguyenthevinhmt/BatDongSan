import React, { Suspense } from "react";
import "./public.global.css";
import { Metadata } from "next";
import CommontLayout from "@/components/commonLayout/CommontLayout";
import ToastProvider from "@/shared/provider/toast.provider";
import { Lexend } from "next/font/google";
import StyledComponentsRegistry from "./AntdRegistry";
import dynamic from "next/dynamic";

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

const RootLayout = ({ children }: { children: React.ReactElement }) => (
  <html lang="en">
    <body className={lexend.className}>
      <link rel="icon" href="../../favicon_io/favicon.ico" sizes="any" />
      <StyledComponentsRegistry>
        <ReduxProvider>
          <CommontLayout>
            <ToastProvider>{children}</ToastProvider>
          </CommontLayout>
        </ReduxProvider>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
