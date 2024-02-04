"use client";
import React, { useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

type RegisterType = {
  username: string;
  password: string;
  email: string;
  phone: string;
  fullname: string;
  status: number;
};

const Register = () => {
  const router = useRouter();
  return (
    <Form style={{ padding: "10px 20px 40px" }}>
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
          <p style={{ fontSize: "20px", fontWeight: "500" }}>Xin chào bạn</p>
          <p style={{ fontSize: "24px", fontWeight: "600" }}>
            Đăng ký tài khoản mới
          </p>
        </div>
      </div>
      <Form.Item<RegisterType>
        name="fullname"
        rules={[{ required: true, message: "Họ tên không được bỏ trống" }]}
      >
        <Input
          size="middle"
          placeholder="Họ tên"
          prefix={
            <UserOutlined style={{ height: "32px", marginRight: "10px" }} />
          }
          style={{ width: "100%", backgroundColor: "#fff" }}
        />
      </Form.Item>
      <Form.Item<RegisterType>
        name="phone"
        rules={[
          { required: true, message: "Số điện thoại không được bỏ trống" },
        ]}
      >
        <Input
          size="middle"
          placeholder="Số điện thoại"
          prefix={
            <UserOutlined style={{ height: "32px", marginRight: "10px" }} />
          }
          style={{ width: "100%", backgroundColor: "#fff" }}
        />
      </Form.Item>
      <Form.Item<RegisterType>
        name="email"
        rules={[{ required: true, message: "Email không được bỏ trống" }]}
      >
        <Input
          size="middle"
          placeholder="Email"
          prefix={
            <UserOutlined style={{ height: "32px", marginRight: "10px" }} />
          }
          style={{ width: "100%", backgroundColor: "#fff" }}
        />
      </Form.Item>
      <Form.Item<RegisterType>
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
      <Form.Item<RegisterType>
        name="password"
        rules={[{ required: true, message: "Mật khẩu không được bỏ trống!" }]}
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
          Đã có tài khoản{" "}
          <span
            style={{
              color: "#FF4D4F",
              fontWeight: "500",
              cursor: "pointer",
            }}
            onClick={() => {
              router.replace("/auth/login");
            }}
          >
            {" "}
            Đăng nhập{" "}
          </span>{" "}
          tại đây
        </p>
      </Flex>
    </Form>
  );
};

export default Register;
