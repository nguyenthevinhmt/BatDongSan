"use client";
import React, { useEffect, useState } from "react";
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
import logo from "@/assets/image/logo-clone.png";
import { CookieService } from "@/shared/services/cookies.service";
import axiosInstance from "@/shared/configs/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearUserInfo, saveUserInfo } from "@/redux/slices/authSlice";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { formatVietnameseToString } from "@/shared/utils/common-helpers";
import Badge from "antd/lib/badge";
import UserType from "@/shared/consts/userType";

const HeaderComponent = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>();
  const pathname = usePathname();
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
    onClick: () => {
      if (`/${formatVietnameseToString(key)}`.includes("nha-dat-ban")) {
        router.push(`/${formatVietnameseToString(key)}?postType=1`);
      } else {
        router.push(`/${formatVietnameseToString(key)}?postType=2`);
      }
    },
  }));

  useEffect(() => {
    const repo = async () => {
      try {
        const res = await axiosInstance.get(
          "http://localhost:5083/api/user/my-info"
        );
        const data = await res?.data;
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    repo().then((res) => setUserInfo(res));
  }, []);

  const dispatch = useDispatch();
  const userSelector = useSelector((state: RootState) => {
    return state.auth.user.data;
  });
  useEffect(() => {
    if (userInfo) {
      dispatch(saveUserInfo(userInfo));
    }
  }, [userInfo, dispatch]);
  const fullname = (userSelector as any)?.fullname;
  const avatarUrl = (userSelector as any)?.avatarUrl;
  const role = (userSelector as any)?.userType;
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
        CookieService.removeToken();
      }
      dispatch(clearUserInfo());
      localStorage.clear();
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
      label: (
        <Badge
          dot={!userSelector?.isConfirm}
          style={{ fontFamily: "__Lexend_126e48 " }}
        >
          <span style={{ fontFamily: "__Lexend_126e48 " }}>
            Thông tin cá nhân
          </span>
        </Badge>
      ),
      icon: (
        <SolutionOutlined style={{ fontSize: " 16px", marginRight: "15px" }} />
      ),
      onClick: () => {
        router.push("/user");
      },
    },
    {
      key: "2",
      label: <>Quản lý đăng tin</>,
      icon: (
        <UnorderedListOutlined
          style={{ fontSize: " 16px", marginRight: "15px" }}
        />
      ),
      onClick: () => {
        router.push("/post/manage");
      },
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
      onClick: () => {
        router.push("/wallet/detail");
      },
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
      onClick: () => {
        router.push("/user");
      },
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
                href={"/favorites"}
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
                      dot={!userSelector?.isConfirm}
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
                      dot={!userSelector?.isConfirm}
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

        <>
          {role === UserType.CUSTOMER && <Button
          size="large"
          type="primary"
          danger
          ghost
          style={{ fontWeight: 500 }}
          onClick={() => {
            router.push("/post/create");
          }}
        >
          Đăng tin
        </Button>
        }
        </>
      </div>
    </Header>
  );
};
// export default React.memo(HeaderComponent);
export default HeaderComponent;
