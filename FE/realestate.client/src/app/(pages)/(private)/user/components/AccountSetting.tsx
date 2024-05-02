import React, { useEffect, useRef, useState } from "react";
import LockAccountForm from "./LockAccountForm";
import RemoveAccountForm from "./RemoveAccountForm";
import Button from "antd/lib/button";
import Collapse from "antd/lib/collapse";
import Flex from "antd/lib/flex";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import message from "antd/lib/message";
import { changePassword } from "@/services/user/user.service";
import { CommonStatus } from "@/shared/consts/CommonStatus";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UserType from "@/shared/consts/userType";

type FormType = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const AccountSetting = ({ tab }: { tab?: number }) => {
  const [form] = Form.useForm();
  const userSelector = useSelector((state: RootState) => {
    return state.auth.user.data;
  });
  const role = (userSelector as any)?.userType;

  const [formData, setFormData] = useState<FormType>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const collapseItem = [
    {
      key: "1",
      label: (
        <span style={{ fontSize: "18px", fontWeight: "500" }}>
          Yêu cầu khóa tài khoản
        </span>
      ),
      children: <LockAccountForm />,
    },
    {
      key: "2",
      label: (
        <span style={{ fontSize: "18px", fontWeight: "500" }}>
          Yêu cầu xóa tài khoản
        </span>
      ),
      children: <RemoveAccountForm />,
    },
  ];

  const handleSubmit = (formValue: any) => {
    const updatePassword = async () => {
      const response = await changePassword(formValue);
      if (response?.code === HTTP_STATUS_CODE.OK) {
        message.success("Đổi mật khẩu thành công");
        form.setFieldsValue({
          oldPassword: '',
          newPassword: "",
          confirmNewPassword: "",
        })
      }
      else if (response?.code === 1003) {
        message.error("Mật khẩu cũ không đúng");
      }
      else {
        message.error("Có lỗi xảy ra");
      }
    }
    updatePassword();
  }

  return (
    <div style={{ paddingBottom: "40px" }}>
      <h1
        style={{
          fontSize: "18px",
          fontWeight: "500",
          marginBottom: "20px",
          marginLeft: "30px",
        }}
      >
        Đổi mật khẩu
      </h1>
      <div style={{ width: "60%", marginLeft: "30px" }}>
        <Form
          form={form}
          autoComplete="off"
          layout="vertical"
          onFinish={(formValue) => {
            handleSubmit(formValue)
          }}
          onFinishFailed={(formValue) => {
            console.log("formvalue", formValue);
            message.error("Vui lòng nhập đúng thông tin!");
          }}
        >
          <Form.Item
            name="oldPassword"
            label={<p style={{ fontWeight: "500" }}>Mật khẩu hiện tại</p>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu hiện tại!",
              },
            ]}
          >
            <Input.Password allowClear />
          </Form.Item>
          <Form.Item
            name="newPassword"
            dependencies={["oldPassword"]}
            label={<p style={{ fontWeight: "500" }}>Mật khẩu mới</p>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
              {
                validator: (_, value) =>
                  value && /\d/.test(value)
                    ? Promise.resolve()
                    : Promise.reject(
                      new Error("Mật khẩu phải chứa ít nhất một số!")
                    ),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("oldPassword") === value) {
                    return Promise.reject(
                      new Error("Mật khẩu mới phải khác mật khẩu hiện tại!")
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password allowClear />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label={<p style={{ fontWeight: "500" }}>Nhập lại mật khẩu mới</p>}
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu mới!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password allowClear />
          </Form.Item>
          <Flex justify="flex-end">
            <Form.Item>
              <Button
                size="middle"
                htmlType="submit"
                style={{
                  backgroundColor: "#FF4D4F",
                  color: "white",
                  border: "none",
                }}
              >
                Lưu thay đổi
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </div>
      <>
      {
        role === UserType.CUSTOMER 
        && <Collapse
            bordered={false}
            size="large"
            items={collapseItem}
            style={{
              backgroundColor: "#fff",
              border: "none",
              boxShadow: "none",
              marginLeft: "-20px",
              paddingLeft: "-10px",
              width: "100%",
            }}
          />
      }
      </>
    </div>
  );
};

export default AccountSetting;
