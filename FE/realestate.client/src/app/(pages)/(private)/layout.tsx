"use client";
import React, { useState } from "react";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import "@/app/(pages)/(private)/styles/style.layout.css";
import type { MenuProps } from "antd";
import { Button, ConfigProvider, Layout, Menu } from "antd";
import HeaderComponent from "@/components/shareLayout/header";
import BreadscrumbComp from "@/components/shareLayout/breadscrumb";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import theme from "@/theme/themeConfig";

const { Content, Sider } = Layout;
const PrivateLayout = ({ children }: { children: React.ReactElement }) => {
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

  const siderItem: MenuProps["items"] = [
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
    UserOutlined,
  ].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `${key}`,
      icon: React.createElement(icon),
      label: `${key}`,
    };
  });
  const breadscrumbItems: BreadcrumbItemType[] = [
    {
      title: "Trang chủ",
    },
    {
      title: "Dashboard",
    },
  ];

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <ConfigProvider theme={theme}>
      <div style={{ height: "100%", width: "100%" }}>
        <Layout style={{ backgroundColor: "#fff", height: "100%" }}>
          <HeaderComponent prop={headerItems} />
          <Layout hasSider style={{ position: "relative" }}>
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              width={248}
              style={{
                height: "100vh",
                backgroundColor: "#fff",
                transition: "0.01s",
                position: "relative",
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
                items={siderItem}
              ></Menu>
            </Sider>
            <Layout
              style={{
                padding: "0px 0px 24px 24px",
                overflow: "initial",
                height: "100vh",
              }}
            >
              <BreadscrumbComp items={breadscrumbItems} />
              <Content
                style={{
                  padding: 14,
                  margin: 0,
                  minHeight: 280,
                  background: "#fff",
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

export default PrivateLayout;
