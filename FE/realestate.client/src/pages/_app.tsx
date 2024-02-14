import React from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import theme from "@/theme/themeConfig";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
