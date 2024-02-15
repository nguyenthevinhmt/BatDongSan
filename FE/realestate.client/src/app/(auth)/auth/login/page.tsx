"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Flex, Form, Input, message } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  useLoginMutation,
  useRefreshOtpMutation,
} from "../_services/auth.service";
import SpinComponent from "@/components/shareComponents/spinComponent";
import { LoginConfig } from "@/shared/configs/authConfig";
import { CookieService } from "@/shared/services/cookies.service";
import { ITokenResponse } from "@/shared/interfaces/ITokenResponse";
import { authConst } from "../const/authConst";
import { useDispatch } from "react-redux";
import { saveLoginInfo } from "@/redux/slices/authSlice";

type LoginType = {
  username: string;
  password: string;
};
const Page = () => {
  const router = useRouter();
  const url = usePathname();
  const [login, { data, error, isError, isLoading, isSuccess }] =
    useLoginMutation();
  const [loginFormValue, setLoginFormValue] = useState({
    username: "",
    password: "",
    grant_type: LoginConfig.grant_type,
    scope: LoginConfig.scope,
    client_id: LoginConfig.client_id,
    client_secret: LoginConfig.client_secret,
  });
  const [refreshOtp, refreshOtpParam] = useRefreshOtpMutation();
  const [errorMessage, setErrorMessage] = useState();
  const [checkValidateOTP, setCheckValidateOTP] = useState<boolean>(false);
  const formRef = useRef({});
  const dispatch = useDispatch();
  useEffect(() => {
    formRef.current = loginFormValue;
    let getErrorMessage = error as any;
    if (isError && error) {
      setErrorMessage(getErrorMessage?.data?.error_description);
      // setCheckValidateOTP(true);
    } else if (
      isError &&
      error &&
      getErrorMessage?.data?.error_description ===
        authConst.AuthErrorMessage.UsernameOrPasswordIncorrect
    ) {
      setErrorMessage(getErrorMessage?.data?.error_description);
    } else if (isSuccess) {
      CookieService.saveToken(data as ITokenResponse);
      router.replace("/");
    }
    if (
      getErrorMessage?.data?.error_description ===
      authConst.AuthErrorMessage.AccountHasNotBeenValidateOtp
    ) {
      setCheckValidateOTP(true);
    }
  }, [isSuccess, data, error, router, isError, loginFormValue, errorMessage]);

  const handleLogin = async (formValue: any) => {
    const loginBody = {
      ...loginFormValue,
      username: formValue.username,
      password: formValue.password,
    };
    setLoginFormValue(loginBody);
    try {
      await login(loginBody);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleLoginFailed = ({ values }: any) => {
    console.log("Form values when login fails:", values);
    return values;
  };
  const refreshOtpBody = loginFormValue.username;
  const handleRefreshOtp = async (body: string) => {
    try {
      const res = await refreshOtp(body);
      let response = res as any;
      if (response?.data?.code === 200) {
        dispatch(saveLoginInfo(response.data));
        router.push(authConst.RouteConst.otpRouter);
      } else {
        message.error("Có lỗi khi refresh OTP", 3);
      }
      console.log(res);
    } catch {
      console.log(refreshOtpParam.error);
    }
  };
  return (
    <>
      {isLoading || refreshOtpParam.isLoading ? (
        <SpinComponent />
      ) : (
        <Form
          style={{ padding: "20px 20px 40px" }}
          onFinish={(formValue) => {
            handleLogin(formValue);
          }}
          initialValues={loginFormValue}
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
            <div style={{ height: "30px ", marginBottom: "20px" }}>
              {isError && (
                <Alert message={errorMessage} type="error" showIcon closable />
              )}
            </div>
            <div style={{ height: "22px", marginBottom: "20px" }}>
              {checkValidateOTP && (
                <>
                  Xác thực lại OTP{" "}
                  <span
                    onClick={() => {
                      console.log(refreshOtpBody);
                      handleRefreshOtp(refreshOtpBody);
                    }}
                    style={{
                      color: "#ff4d4f",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    tại đây
                  </span>
                </>
              )}
            </div>
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
