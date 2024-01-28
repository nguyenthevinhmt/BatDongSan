"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Form, Input } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import login from "@/assets/image/login.png";

type LoginType = {
  username: string;
  password: string;
};

const Page = () => {
  const [loginForm, setLoginForm] = useState<LoginType>({
    username: "",
    password: "",
  });
  return (
    <div style={{ marginTop: "20px" }}>
      <Flex
        style={{
          backgroundColor: "#fafafa",
          boxShadow: "0px 2px 8px #ccc",
          borderRadius: "5px",
        }}
        align="center"
      >
        <Image
          src={login}
          alt="batdongsan.com"
          style={{ objectFit: "cover" }}
          priority={true}
          width={400}
          height={600}
        />
        <Form style={{ padding: "20px 20px 40px" }}>
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
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                {" "}
                Đăng ký{" "}
              </span>{" "}
              tại đây
            </p>
          </Flex>
        </Form>
      </Flex>
    </div>
  );
};

export default Page;
