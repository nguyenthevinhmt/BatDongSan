"use client";
import theme from "@/theme/themeConfig";
import { Affix, ConfigProvider, Layout } from "antd";
import React, { useState } from "react";
import HeaderComponent from "../shareLayout/header";

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
