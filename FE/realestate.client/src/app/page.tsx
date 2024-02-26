"use client";
import HeaderComponent from "@/components/shareLayout/header";
import withTheme from "@/theme";
import { MenuProps } from "antd";
const App = () => {
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
    // <LoadingComponent />
    <>
    <HeaderComponent/>
    </>
    // <div style={{height: '2000px'}}>
    // </div>
  );
};
const AppPage = () => {
  return withTheme(<App />);
};

export default AppPage;
