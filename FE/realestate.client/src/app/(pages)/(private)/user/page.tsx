"use client";
import React, { useEffect, useState } from "react";
import "@/app/(pages)/(private)/styles/style.layout.css";
import Image from "next/image";
import Button from "antd/es/button";
import Collapse from "antd/es/collapse";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Modal from "antd/es/modal";
import Upload from "antd/es/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getUserInfo,
  updateUserInfo,
  changePassword,
  removeAccount,
} from "../../../../services/user/user.service";
import { useLogoutMutation } from "@/app/(auth)/auth/_services/auth.service";
import { Flex, GetProp, TabsProps, UploadProps } from "antd/lib";
import { apiUploadImage } from "@/services/post/post.service";
import { Divider, Tabs } from "antd";
import InfoForm from "./components/InfoForm";
import AccountSetting from "./components/AccountSetting";

const UserPage = () => {
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
