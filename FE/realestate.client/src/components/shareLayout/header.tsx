"use client";
import React, { useEffect, useState } from "react";
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
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/image/logo.svg";
import { CookieService } from "@/shared/services/cookies.service";
import axiosInstance from "@/shared/configs/axiosInstance";
import { environment } from "@/shared/environment/environment";
import useSWR from "swr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearUserInfo, saveUserInfo } from "@/redux/slices/authSlice";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";

const fetcher = async (url: string) => {
  const token = CookieService.getAccessToken();
  if (!token) {
    console.log("Hết hạn đăng nhập! Vui lòng đăng nhập lại");
  }
  const res = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.data;
  return data;
};

const HeaderComponent = () => {
  const [userInfo, setUserInfo] = useState();
  const pathname = usePathname();
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
  useEffect(() => {
    const repo = async () => {
      try {
        const res = await axiosInstance.get(
          "http://localhost:5083/api/user/my-info",
          {}
        );
        const data = await res.data;
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    repo().then((res) => setUserInfo(res));
  }, []);

  const dispatch = useDispatch();
  // const { data, error } = useSWR(`${environment.baseUrl}/api/user/my-info`, fetcher, {
  //   shouldRetryOnError: false,
  //   refreshInterval: 0,
  // });
  const userSelector = useSelector((state: RootState) => {
    return state.auth.user.data;
  });
  // console.log(userSelector);
  const fullname = (userSelector as any)?.fullname;
  const avatarUrl = (userSelector as any)?.avatarUrl;
  const router = useRouter();
  const handleLogout = async () => {
    dispatch(clearUserInfo());
    try {
      const response = await axiosInstance.post(
        "http://localhost:5083/connect/logout",
        null,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      if (response.status === HTTP_STATUS_CODE.OK) {
        console.log("Đăng xuất thành công");
        // localStorage.clear();
        CookieService.removeToken();
      }
      if (pathname?.includes("/dashboard")) {
        router.replace("/auth/login");
      }
    } catch (error) {
      console.log("Có lỗi xảy ra khi đăng xuất", error);
    }
  };
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
        handleLogout();
      },
    },
  ];
  useEffect(() => {
    if (userInfo) {
      // userInfo = data;
      dispatch(saveUserInfo(userInfo));
    } else {
      dispatch(clearUserInfo());
    }
  }, [userInfo, dispatch]);
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
        marginBottom: "10px",
        position: "sticky",
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
                onClick={() => {
                  router.push("/auth/login");
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
                onClick={() => {
                  router.push("/auth/register");
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
                    <Avatar
                      style={{
                        backgroundColor: "#fde3cf",
                        color: "#f56a00",
                        marginRight: "10px",
                      }}
                      size={44}
                      icon={<UserOutlined />}
                    ></Avatar>
                  ) : (
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
                          height={"100%"}
                          width={"100%"}
                        />
                      }
                    ></Avatar>
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
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Đăng tin
        </Button>
      </div>
    </Header>
  );
};

// export default React.memo(HeaderComponent);
export default HeaderComponent;
