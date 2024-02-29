"use client";
import React, { useState } from "react";
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
import { Affix, Button, ConfigProvider, Layout, Menu } from "antd";
import HeaderComponent from "@/components/shareLayout/header";
import BreadscrumbComp from "@/components/shareLayout/breadscrumb";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import theme from "@/theme/themeConfig";
import isAuth from "@/app/isAuth";
import withTheme from "@/theme";
import MenuItem from "antd/es/menu/MenuItem";
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
  const items: MenuItem[] = [
    getItem("Tổng quan", "1", <PieChartOutlined />),
    getItem("Quản lý tin đăng", "2", <DesktopOutlined />, [
      getItem("Đăng mới", "a"),
      getItem("Danh sách tin", "b"),
      getItem("Danh sách tin nháp", "c"),
    ]),
    getItem("Thông tin cá nhân", "3", <ContainerOutlined />, [
      getItem("Thông tin tài khoản", "d"),
      getItem("Đổi mật khẩu", "e"),
      getItem("Đổi mật khẩu", "f"),
    ]),

    getItem("Quản lý tài chính", "sub1", <MailOutlined />, [
      getItem("Thông tin số dư", "5"),
      getItem("Lịch sử giao dịch", "6"),
      getItem("Nạp tiền", "7"),
    ]),

    getItem("Báo giá & hướng dẫn", "sub2", <AppstoreOutlined />, [
      getItem("Báo giá", "9"),
      getItem("Hướng dẫn thanh toán", "10"),
      getItem("Hướng dẫn sử dụng", "11"),
    ]),
    getItem("Yêu cầu xóa tài khoản", "12", <UserOutlined />),
  ];

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <ConfigProvider theme={theme}>
      <div style={{ height: "100%", width: "100%" }}>
        <HeaderComponent />
        <Layout style={{ backgroundColor: "#fff", height: "100%" }}>
          <Layout hasSider style={{ position: "relative" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              width={248}
              style={{
                height: "100vh",
                backgroundColor: "#fff",
                // transition: "0.01s",
                // position: "fixed",
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
                mode="inline"
                defaultSelectedKeys={["1"]}
                style={{
                  height: "100%",
                  borderRight: 0,
                  position: "relative",
                  overflow: "auto",
                }}
                items={items}
              ></Menu>
            </Sider>
            <Layout
              style={{
                padding: "0px 0px 24px 24px",
                overflow: "initial",
                height: "100vh",
              }}
            >
              {/* <BreadscrumbComp items={breadscrumbItems} /> */}
              <Content
                style={{
                  padding: 14,
                  margin: 0,
                  minHeight: 280,
                  /*background: "#fff",*/
                  borderRadius: "8px",
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

// export default withTheme(isAuth(PrivateLayout));
// export default PrivateLayout;
export default isAuth(PrivateLayout);
