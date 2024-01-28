import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import StoreProvider from "./StoreProvider";
import "./public.global.css";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
      <StoreProvider>
        <AntdRegistry>{children}</AntdRegistry>
      </StoreProvider>
    </body>
  </html>
);

export default RootLayout;
