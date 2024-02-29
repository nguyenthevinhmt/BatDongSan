import React, { useState } from "react";
import HeaderComponent from "@/components/shareLayout/header";
import { Affix, Flex, MenuProps } from "antd";
import loginBg from "@/assets/image/loginbackgroud.png";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div>
      <Affix offsetTop={0}>
          <HeaderComponent />
      </Affix>
      <Flex vertical align="center" justify="center" gap="middle">
        <div style={{ marginTop: "25px" }}>
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
