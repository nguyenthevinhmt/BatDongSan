"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./public.global.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <Provider store={store}>
        <AntdRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </AntdRegistry>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
