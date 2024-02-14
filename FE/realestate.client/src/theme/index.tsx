"use client";

import { ConfigProvider } from "antd";
import theme from "./themeConfig";
import React from "react";

const withTheme = (node: React.ReactNode) => (
  <ConfigProvider theme={theme}>{node}</ConfigProvider>
);

export default withTheme;
