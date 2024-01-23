import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import theme from '@/theme/themeConfig';
import StoreProvider from '@/app/StoreProvider';

const App = ({ Component, pageProps }: AppProps) => (
  <StoreProvider>
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  </StoreProvider>
);

export default App;