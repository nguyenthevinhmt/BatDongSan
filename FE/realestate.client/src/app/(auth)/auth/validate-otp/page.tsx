"use client";
import { Button, Flex, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  useRefreshOtpMutation,
  useValidateOtpMutation,
} from "../_services/auth.service";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { authConst } from "../const/authConst";
import hideEmail from "@/shared/utils/hideEmail";

const ValidateOtp = () => {
  let registerSelector = useSelector((state: RootState) => state.register);
  let loginSelector = useSelector((state: RootState) => state.auth);
  let getEmailFromStore =
    (registerSelector as any).data?.email ?? (loginSelector as any).email;
  let email = hideEmail(getEmailFromStore);
  let userId =
    localStorage.getItem("userId") ?? (registerSelector as any).data.id;
  let username =
    (loginSelector as any).username ?? (registerSelector as any).data.username;
  const time = 2;
  const router = useRouter();
  const [ValidateOtp, { data, error, isError, isLoading, isSuccess }] =
    useValidateOtpMutation();

  const [refreshOtp, refreshOtpParam] = useRefreshOtpMutation();
  async function handleValidateOtp(formValue: any) {
    console.log(userId);
    const body = {
      otp: formValue.otp,
      userId: userId,
    };
    try {
      const res = await ValidateOtp(body);
    } catch {
      console.error("Lỗi khi xác thực otp");
    }
  }
  async function handleRefreshOtp(username: string) {
    try {
      const res = await refreshOtp(username);
      let response = res as any;
      if (response.data.status === authConst.ResponseStatus.SUCCESS) {
        message.success("Mã OTP đã được tạo lại!");
      } else if (response.data.status === authConst.ResponseStatus.ERROR) {
        message.success("Đã có lỗi xảy ra");
      }
    } catch {
      console.error("Lỗi khi refresh otp");
    }
  }

  function onFinishFailed() {
    console.error("Có lỗi xảy ra khi xác thực otp");
  }
  useEffect(() => {
    if (
      isSuccess &&
      (data as any).status !== authConst.ResponseStatus.SUCCESS
    ) {
      console.log(data);
      message.error((data as any).message);
    } else if (
      isSuccess &&
      (data as any).status === authConst.ResponseStatus.SUCCESS
    ) {
      message.success("Hoàn tất xác thực");
      router.replace("/auth/login");
    }
  }, [
    isError,
    error,
    isSuccess,
    data,
    router,
    registerSelector,
    loginSelector,
  ]);
  return (
    <Flex justify="center" align="center" style={{ flexDirection: "column" }}>
      <div
        style={{
          width: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <span style={{ width: "90%" }}>
          Vui lòng điền thông tin về mã OTP mà chúng tôi đã gửi qua email{" "}
          <span style={{ fontWeight: "bold", color: "#ff4d4f" }}>{email}</span>.
        </span>
        <br />
        <span style={{ width: "90%" }}>
          Mã xác thực có giá trị trong{" "}
          <span style={{ fontWeight: "bold", color: "#ff4d4f" }}>{time}</span>{" "}
          phút
        </span>
      </div>
      <Form
        name="otp_verification"
        onFinish={(formValue) => {
          handleValidateOtp(formValue);
        }}
        onFinishFailed={onFinishFailed}
        style={{ width: "90%" }}
      >
        <Form.Item
          name="otp"
          rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
        >
          <Input placeholder="Nhập mã OTP" size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ width: "100%" }}
            size="large"
          >
            Xác thực
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            loading={refreshOtpParam.isLoading}
            style={{ width: "100%" }}
            size="large"
            onClick={() => {
              handleRefreshOtp(username);
            }}
          >
            Gửi lại mã
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default ValidateOtp;
