"use client";
import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  LeftOutlined,
  MailOutlined,
  PieChartOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "@/app/(pages)/(private)/styles/style.layout.css";
import type { MenuProps } from "antd";
import { Button, ConfigProvider, Layout, Menu } from "antd";
import HeaderComponent from "@/components/shareLayout/header";
import theme from "@/theme/themeConfig";
import MenuItem from "antd/es/menu/MenuItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ToastProvider from "@/shared/provider/toast.provider";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
const { Content, Sider } = Layout;
const PrivateLayout = ({ children }: { children: React.JSX.Element }) => {
  const parentKey = ["post/manager", "user/info", "wallet/manager"];
  const items: MenuItem[] = [
    getItem(
      <Link href={"/dashboard"}>Tổng quan</Link>,
      "/dashboard",
      <PieChartOutlined />
    ),
    getItem("Quản lý tin đăng", "post", <DesktopOutlined />, [
      getItem(<Link href={"/post/create"}>Đăng mới</Link>, "/post/create"),
      getItem(<Link href={"/post/manage"}>Danh sách tin</Link>, "/post/manage"),
      getItem(
        <Link href={"post/draft"}>Danh sách tin nháp</Link>,
        "post/draft"
      ),
    ]),
    getItem(
      <Link href={"/user"}>Thông tin cá nhân</Link>,
      "/user",
      <ContainerOutlined />
    ),

    getItem("Quản lý tài chính", "wallet/manager", <MailOutlined />, [
      getItem("Thông tin số dư", "5"),
      getItem("Lịch sử giao dịch", "6"),
      getItem("Nạp tiền", "7"),
    ]),

    getItem("Báo giá & hướng dẫn", "guide", <AppstoreOutlined />, [
      getItem("Báo giá", "9"),
      getItem("Hướng dẫn thanh toán", "10"),
      getItem("Hướng dẫn sử dụng", "11"),
    ]),
    getItem("Yêu cầu xóa tài khoản", "12", <UserOutlined />),
  ];

  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string[] | undefined>();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setActiveKey((prev) => [pathname]);
  }, [pathname]);

  return (
    <ConfigProvider theme={theme}>
      <div style={{ height: "100vh", width: "100%" }}>
        <div style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}><HeaderComponent /></div>
        <Layout style={{ backgroundColor: "#fff", height: "100%" }}>
          <Layout hasSider style={{ position: "relative" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              width={248}
              style={{
                height: "100%",
                backgroundColor: "#fff",
                zIndex: 99,
              }}
            >
              <Button
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "20px",
                  zIndex: 999,
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  transform: "translate(50%, 0%)",
                }}
                onClick={toggleCollapsed}
              >
                {collapsed ? <RightOutlined /> : <LeftOutlined />}
              </Button>
              <Menu
                forceSubMenuRender={true}
                mode="inline"
                selectedKeys={activeKey}
                defaultOpenKeys={parentKey}
                style={{
                  height: "100%",
                  borderRight: 0,
                  backgroundColor: "#fff",
                  position: "relative",
                  overflow: "auto",
                }}
                items={items}
              ></Menu>
            </Sider>
            <Layout
              style={{
                padding: "0px 0px 24px 24px",
                overflow: "scroll",
                height: "100%",
              }}
            >
              <Content
                style={{
                  padding: 14,
                  margin: 0,
                  minHeight: 280,
                  borderRadius: "8px",
                }}
              >
                <ToastProvider>{children}</ToastProvider>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};
export default PrivateLayout;
