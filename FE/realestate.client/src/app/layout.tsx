"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
// import StoreProvider from "./StoreProvider";
import "./public.global.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Provider store={store}>
        <AntdRegistry>{children}</AntdRegistry>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
