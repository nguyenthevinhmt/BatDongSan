import React from "react";
import { Header } from "antd/es/layout/layout";
import Avatar from "antd/es/avatar";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import Menu from "antd/es/menu";
import Image from "next/image";
import type { MenuProps } from "antd";
import Link from "next/link";
import DownOutlined from "@ant-design/icons/DownOutlined";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import SolutionOutlined from "@ant-design/icons/SolutionOutlined";
import UnorderedListOutlined from "@ant-design/icons/UnorderedListOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import WalletOutlined from "@ant-design/icons/WalletOutlined";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/image/logo.svg";
import Badge from "antd/lib/badge";
import { cookies } from "next/headers";

const ServerHeaderComponent = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const fetchData = async (): Promise<any> => {
    const response = await fetch("http://localhost:5083/api/user/my-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.value,
      },
    });
    const data = await response.json();
    console.log(data);
    return data?.data;
  };
  const data: any = await fetchData();
  const fullname = await data?.fullname;
  const avatarUrl = await data?.avatarUrl;
  await console.log({ fullname, avatarUrl });

  const headerItems: MenuProps["items"] = [
    "Nhà đất bán",
    "Nhà đất cho thuê",
    "Dự án",
    "Tin tức",
    "Liên hệ",
  ].map((key) => ({
    key: Math.random(),
    label: `${key}`,
    title: `${key}`,
    style: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",
    },
  }));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Badge style={{ fontFamily: "__Lexend_126e48 " }}>
          <span style={{ fontFamily: "__Lexend_126e48 " }}>
            Thông tin cá nhân
          </span>
        </Badge>
      ),
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
        border: "1px solid #f1f1f1",
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
        <Link href={"/"}>
          <Image
            src={logo}
            alt="batdongsan"
            width={164}
            height={48}
            // priority={true}
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
        items={headerItems}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "30px",
          }}
        >
          {!fullname ? (
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
                  {!avatarUrl ? (
                    <Badge
                      style={{
                        width: "10px",
                        height: "10px",
                        transform: "translateX(-9px)",
                      }}
                    >
                      <Avatar
                        style={{
                          backgroundColor: "#fde3cf",
                          color: "#f56a00",
                          marginRight: "10px",
                        }}
                        size={44}
                        icon={<UserOutlined />}
                      ></Avatar>
                    </Badge>
                  ) : (
                    <Badge
                      style={{
                        width: "10px",
                        height: "10px",
                        transform: "translateX(-9px)",
                      }}
                    >
                      <Avatar
                        style={{
                          backgroundColor: "#fff",
                          color: "#fff",
                          marginRight: "10px",
                        }}
                        size={"large"}
                        src={
                          <img
                            src={avatarUrl}
                            alt="avatar"
                            height={44}
                            width={44}
                          />
                        }
                      ></Avatar>
                    </Badge>
                  )}
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {fullname ?? ""}
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
// export default React.memo(ServerHeaderComponent);
export default ServerHeaderComponent;
