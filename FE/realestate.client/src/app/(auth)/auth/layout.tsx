import React from "react";
import HeaderComponent from "@/components/shareLayout/header";
import { Flex, MenuProps } from "antd";
import loginBg from "@/assets/image/loginbackgroud.png";
import Image from "next/image";

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
        <div style={{ marginTop: "150px" }}>
          <Flex
            style={{
              backgroundColor: "#fafafa",
              boxShadow: "0px 2px 8px #ccc",
              borderRadius: "5px",
            }}
            align="center"
          >
            <Image
              src={loginBg}
              alt="batdongsan.com"
              style={{ objectFit: "cover" }}
              priority={true}
              width={400}
              height={650}
            />
            {children}
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default AuthLayout;
