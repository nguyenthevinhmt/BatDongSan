"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../_services/auth.service";
import SpinComponent from "@/components/shareComponents/spinComponent";

type LoginType = {
  username: string;
  password: string;
};

const Page = () => {
  const router = useRouter();
  const [login, { data, error, isError, isLoading, isSuccess }] =
    useLoginMutation();
  const [loginFormValue, setLoginFormValue] = useState({
    username: "",
    password: "",
    grant_type: "password",
    scope: "offline_access",
    client_id: "client-react",
    client_secret: "52F4A9A45C1F21B53B62F56DA52F7",
  });
  useEffect(() => {
    if (isError) {
      console.log("Login Error:");
      // console.log("Login Error:", error.);
    } else if (isSuccess) {
      console.log("Login Success");
      console.log("data", data);
      router.push("/");
    }
  }, [isSuccess, error, router, isError]);
  const handleLogin = async (formValue: any) => {
    const loginBody = {
      ...loginFormValue,
      username: formValue.username,
      password: formValue.password,
    };
    try {
      await login(loginBody);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleLoginFailed = () => {
    if (error) {
      console.log("login failed");
    }
  };
  return (
    <>
      {isLoading ? (
        <SpinComponent />
      ) : (
        <Form
          style={{ padding: "20px 20px 40px" }}
          onFinish={handleLogin}
          onFinishFailed={handleLoginFailed}
        >
          <div
            style={{
              marginBottom: "30px",
              width: "400px",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ fontSize: "20px", fontWeight: "500" }}>
                Xin chào bạn
              </p>
              <p style={{ fontSize: "24px", fontWeight: "600" }}>
                Đăng nhập để tiếp tục
              </p>
            </div>
          </div>
          <Form.Item<LoginType>
            name="username"
            rules={[
              { required: true, message: "Tên người dùng không được bỏ trống" },
            ]}
          >
            <Input
              size="middle"
              placeholder="Username"
              prefix={
                <UserOutlined style={{ height: "32px", marginRight: "10px" }} />
              }
              style={{ width: "100%", backgroundColor: "#fff" }}
            />
          </Form.Item>
          <Form.Item<LoginType>
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được bỏ trống!" },
            ]}
          >
            <Input.Password
              size="middle"
              placeholder="Password"
              prefix={
                <LockOutlined style={{ height: "32px", marginRight: "10px" }} />
              }
            />
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            <Button
              style={{
                width: "100%",
                backgroundColor: "#FF4D4F",
                color: "#fff",
                fontWeight: "500",
              }}
              size="large"
              htmlType="submit"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          {/* <Divider style={{ fontWeight: "normal", color: "#999" }}>
            Hoặc
          </Divider> */}
          <Flex align="center" justify="center" style={{ width: "390px" }}>
            <p
              style={{
                color: "999",
                fontSize: "11px",
              }}
            >
              Bằng việc tiếp tục, bạn đồng ý với{" "}
              <span style={{ color: "#FF4D4F" }}>
                Điều khoản sử dụng , Chính sách bảo mật , Quy chế , Chính sách
              </span>{" "}
              của chúng tôi.
            </p>
          </Flex>
          <Flex align="center" justify="center" style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "14px" }}>
              {" "}
              Chưa là thành viên?{" "}
              <span
                style={{
                  color: "#FF4D4F",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push("/auth/register");
                }}
              >
                {" "}
                Đăng ký{" "}
              </span>{" "}
              tại đây
            </p>
          </Flex>
        </Form>
      )}
    </>
  );
};

export default Page;
