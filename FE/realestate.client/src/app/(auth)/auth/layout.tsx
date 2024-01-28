import React from "react";
import HeaderComponent from "@/components/shareLayout/header";
import { Flex, MenuProps } from "antd";

const AuthLayout = ({ children }: { children: React.ReactElement }) => {
  const headerItems: MenuProps["items"] = [
    "Nhà đất bán",
    "Nhà đất cho thuê",
    "Dự án",
    "Tin tức",
    "Liên hệ",
  ].map((key) => ({
    key,
    label: `${key}`,
    title: `${key}`,
    style: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",
    },
  }));

  return (
    <div>
      <HeaderComponent prop={headerItems} />
      <Flex vertical align="center" justify="center" gap="middle">
        {children}
      </Flex>
    </div>
  );
};

export default AuthLayout;
