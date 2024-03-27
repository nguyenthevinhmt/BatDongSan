"use client";
import React, { useEffect, useState } from "react";
import "@/app/(pages)/(private)/styles/style.layout.css";
import { Flex, TabsProps } from "antd/lib";
import { Badge, Tabs } from "antd";
import InfoForm from "./components/InfoForm";
import AccountSetting from "./components/AccountSetting";
import VerificationForm from "./components/VerificationForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserPage = () => {

  const userSelector = useSelector((state: RootState) => {
    return state.auth.user.data;
  });
  console.log("userSelector", userSelector)

  const items: TabsProps["items"] = [
    {
      label: (
        <span style={{ fontSize: "14px", fontWeight: "normal" }}>
          Chỉnh sửa thông tin
        </span>
      ),
      key: "1",
      children: <InfoForm />,
    },
    {
      label: (
        <span style={{ fontSize: "14px", fontWeight: "normal" }}>
          Cài đặt tài khoản
        </span>
      ),
      key: "2",
      children: <AccountSetting />,
    },
    {
      label: (
        <Badge dot={!userSelector?.isConfirm} style={{ fontSize: "14px", fontWeight: "normal" }}>
          Xác thực
        </Badge>
      ),
      key: "3",
      children: <VerificationForm />,
    },
  ];

  return (
    <Flex
      justify="center"
      style={{
        width: "100%",
        height: "auto",
      }}
    >
      <Flex
        style={{
          width: "696px",
          backgroundColor: "white",
          padding: "0px 20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px #ccc",
        }}
        vertical
      >
        <h1 style={{ fontWeight: "500", margin: "20px 0px" }}>
          Quản lý tài khoản
        </h1>
        <Tabs items={items} />
      </Flex>
    </Flex>
  );
};

export default UserPage;
