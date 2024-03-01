"use client";
import theme from "@/theme/themeConfig";
import {ConfigProvider, Layout } from "antd";
import React from "react";

const CommontLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <ConfigProvider theme={theme}>
      <div style={{ height: "100%", width: "100%" }}>
        <Layout style={{ backgroundColor: "#fff", height: "100%" }}>
          {children}
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default CommontLayout;
