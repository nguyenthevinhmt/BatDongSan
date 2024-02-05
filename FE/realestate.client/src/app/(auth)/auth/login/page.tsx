"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Form, Input,message  } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../_services/auth.service";
import SpinComponent from "@/components/shareComponents/spinComponent";
import { LoginConfig } from "@/shared/configs/authConfig";
import { CookieService } from "@/shared/services/cookies.service";
import { ITokenResponse } from "@/shared/interfaces/ITokenResponse";


type LoginType = {
  username: string;
  password: string;
};

const Page = () => {  
  const router = useRouter();
  const [login, { data, error, isError, isLoading, isSuccess }] = useLoginMutation();
  const [form] = Form.useForm();
  const [loginFormValue, setLoginFormValue] = useState({
    username: "",
    password: "",
    grant_type: LoginConfig.grant_type,
    scope: LoginConfig.scope,
    client_id: LoginConfig.client_id,
    client_secret: LoginConfig.client_secret,
  });
  useEffect(() => {
    let errorMessage = error as any;
    if (isError) {
      message.error(errorMessage?.data?.error_description || "Đăng nhập không thành công!");
      if(errorMessage?.status === '400'){
        form.setFieldsValue({username: loginFormValue.username, password: loginFormValue.password});
      }
    } else if (isSuccess) {
      console.log("Login Success");
      console.log("data", data);
      CookieService.saveToken(data as ITokenResponse);
      router.push("/");
    }
  }, [isSuccess, form, data, error, router, isError, loginFormValue.username, loginFormValue.password]);

  const handleLogin = async (formValue: any) => {
    const loginBody = {
      ...loginFormValue,
      username: formValue.username,
      password: formValue.password,
    };
    try {
      const res = await login(loginBody);
      console.log(res);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleLoginFailed = ({ values }:any) => {
    console.log("Form values when login fails:", values);
  };
  return (
    <>
      {isLoading ? (
        <SpinComponent />
      ) : (
        <Form
          style={{ padding: "20px 20px 40px" }}
          onFinish={(formValue) => {
            handleLogin(formValue);
          }}
          onFinishFailed={handleLoginFailed}
          autoComplete="off"

          name="login"
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
          {/* {isError && <span>{{errorMessage}}</span>} */}
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
