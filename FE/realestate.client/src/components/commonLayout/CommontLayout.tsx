"use client";
import theme from "@/theme/themeConfig";
import { ConfigProvider, Layout, Menu, MenuProps, message, Affix } from "antd";
import React,{useState} from "react";
import HeaderComponent from "../shareLayout/header";
import { CookieService } from "@/shared/services/cookies.service";
import axiosInstance from "@/shared/configs/axiosInstance";
import useSWR from "swr";
import { environment } from "@/shared/environment/environment";
import axios from "axios";

// const fetcher = async (url: string) => {
//   const token = CookieService.getAccessToken();
//   if (!token) {
//     console.error("Hết hạn đăng nhập! Vui lòng đăng nhập lại");
//   }
//   const res = await axiosInstance.get(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await res.data;
//   return data;
// };
const CommontLayout = ({ children }: { children: React.ReactElement }) => {
  // const { data, error } = useSWR(
  //   `${environment.baseUrl}/api/user/my-info`,
  //   fetcher,
  //   { shouldRetryOnError: false, refreshInterval: 0 }
  // );
  // let userInfo;
  // if (data) {
  //   userInfo = data;
  // }
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
  const [top, setTop] = useState<number>(0);
  return (
    <ConfigProvider theme={theme}>
      <div style={{ height: "100%", width: "100%" }}>
        <Layout style={{ backgroundColor: "#fff", height: "100%" }}>
          <Affix offsetTop={top}>
            <HeaderComponent prop={headerItems} />
          </Affix>
          {children}
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default CommontLayout;
