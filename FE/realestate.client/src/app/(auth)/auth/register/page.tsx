"use client";
import React, { useEffect, useState } from "react";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import message from "antd/es/message";
import Flex from "antd/es/flex";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "../_services/auth.service";
import SpinComponent from "@/components/shareComponents/spinComponent";
import { useDispatch } from "react-redux";
import { updateFormData } from "@/redux/slices/registerSlice";
import { createWallet } from "@/services/wallet/wallet.service";

type RegisterType = {
  username: string;
  password: string;
  email: string;
  phone: string;
  fullname: string;
  status: number;
};
const InitialRegisterForm: RegisterType = {
  username: "",
  fullname: "",
  password: "",
  email: "",
  phone: "",
  status: 1,
};

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const getEmailFromStore = useSelector((state: RootState) => state.register);
  const [registerForm, setRegisterForm] =
    useState<RegisterType>(InitialRegisterForm);
  const [register, { isError, error, isLoading, isSuccess }] =
    useRegisterMutation();

  async function handleRegister(formValue: any) {
    const registerBody: RegisterType = {
      ...registerForm,
      username: formValue.username,
      password: formValue.password,
      email: formValue.email,
      fullname: formValue.fullname,
      phone: formValue.phone,
    };
    setRegisterForm(registerBody);
    try {
      const res = await register(registerBody);
      let response = res as any;
      dispatch(updateFormData(response.data));
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  useEffect(() => {
    if (isError && error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    } else if (isSuccess) {
      router.push("/auth/validate-otp");
    }
  }, [error, isError, isSuccess, registerForm, router]);
  return (
    <>
      {isLoading ? (
        <SpinComponent />
      ) : (
        <Form
          style={{ padding: "10px 20px 40px" }}
          onFinish={(formValue) => {
            handleRegister(formValue);
          }}
          onFinishFailed={() => {
            console.error("Có lỗi xảy ra, vui lòng thử lại", 3);
          }}
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
                <PhoneOutlined
                  style={{ height: "32px", marginRight: "10px" }}
                />
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
                <MailOutlined style={{ height: "32px", marginRight: "10px" }} />
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
              Đăng ký
            </Button>
          </Form.Item>
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
      )}
    </>
  );
};

export default Register;
