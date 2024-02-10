"use client";
import React from "react";
import { Header } from "antd/es/layout/layout";
import { Avatar, Button, Dropdown, Menu } from "antd";
import Image from "next/image";
import type { MenuProps } from "antd";
import Link from "next/link";
import {
  DownOutlined,
  HeartOutlined,
  LockOutlined,
  LogoutOutlined,
  SolutionOutlined,
  UnorderedListOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import logo from "@/assets/image/logo.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const HeaderComponent = ({ prop }: { prop: MenuProps["items"] }) => {
  const isLogin = true;
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => {
    state.auth;
  });
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <>Thông tin cá nhân</>,
      icon: (
        <SolutionOutlined style={{ fontSize: " 16px", marginRight: "15px" }} />
      ),
    },
    {
      key: "2",
      label: <>Quản lý đăng tin</>,
      icon: (
        <UnorderedListOutlined
          style={{ fontSize: " 16px", marginRight: "15px" }}
        />
      ),
    },
    {
      key: "3",
      label: <>Quản lý ví tiền</>,
      icon: (
        <WalletOutlined
          style={{
            fontSize: " 16px",
            marginRight: "15px",
          }}
        />
      ),
    },
    {
      key: "4",
      label: <>Đổi mật khẩu</>,
      icon: (
        <LockOutlined
          style={{
            fontSize: " 16px",
            marginRight: "15px",
          }}
        />
      ),
    },
    {
      key: "5",
      danger: true,
      label: <>Đăng xuất</>,
      icon: (
        <LogoutOutlined style={{ fontSize: " 16px", marginRight: "15px" }} />
      ),
      onClick: () => {
        router.replace("/auth/login");
      },
    },
  ];
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#fff",
        alignItems: "center",
        padding: "46px 30px",
        borderBottom: "none",
        borderBottomColor: "#111",
        boxShadow: "0px 2px 10px #ccc",
        zIndex: 99,
      }}
    >
      <div
        style={{
          width: "164px",
          height: "48px",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link href={"/home"}>
          <Image
            src={logo}
            alt="batdongsan"
            width={164}
            height={48}
            priority={true}
          />
        </Link>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        selectable={false}
        style={{
          flex: 1,
          minWidth: 0,
          borderBottom: "none",
          margin: "0 40px",
        }}
        items={prop}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "30px",
          }}
        >
          {isLogin ? (
            <>
              <Button
                size="large"
                type="text"
                style={{
                  height: "46px",
                  fontWeight: 500,
                }}
              >
                Đăng nhập
              </Button>
              <span
                style={{
                  width: "1px",
                  height: "14px",
                  backgroundColor: "#f1f1f1",
                }}
              ></span>
              <Button
                size="large"
                type="text"
                style={{
                  height: "46px",
                  padding: "0px 20px",
                  fontWeight: 500,
                }}
              >
                Đăng ký
              </Button>
            </>
          ) : (
            <>
              <Link
                href={"/"}
                style={{
                  marginRight: "20px",
                  fontSize: "24px",
                  color: "#111",
                }}
              >
                <HeartOutlined />
              </Link>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <div>
                  <Avatar
                    style={{
                      backgroundColor: "#fde3cf",
                      color: "#f56a00",
                      marginRight: "10px",
                    }}
                    size={"large"}
                  >
                    V
                  </Avatar>
                  <span style={{ fontSize: "16px", fontWeight: 500 }}>
                    Nguyễn Thế Vinh
                  </span>
                  <DownOutlined style={{ marginLeft: "10px" }} />
                </div>
              </Dropdown>
            </>
          )}
        </div>

        <Button
          size="large"
          type="primary"
          danger
          ghost
          style={{ fontWeight: 500 }}
        >
          Đăng tin
        </Button>
      </div>
    </Header>
  );
};

export default React.memo(HeaderComponent);
