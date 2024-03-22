"use client";

import ConfigProvider from "antd/es/config-provider";
import theme from "./themeConfig";
import React from "react";

const withTheme = (node: React.ReactNode) => (
  <ConfigProvider theme={theme}>{node}</ConfigProvider>
);

export default withTheme;
