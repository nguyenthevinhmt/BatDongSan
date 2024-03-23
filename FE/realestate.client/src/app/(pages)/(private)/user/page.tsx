"use client";
import React, { useEffect, useState } from "react";
import "@/app/(pages)/(private)/styles/style.layout.css";
import Button from "antd/es/button";
import Collapse from "antd/es/collapse";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Modal from "antd/es/modal";
import Upload from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import {
  getUserInfo,
  updateUserInfo,
  changePassword,
  removeAccount
} from "../../../../services/user/user.service";
import { useLogoutMutation } from "@/app/(auth)/auth/_services/auth.service";

const UserPage = () => {
  //const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [isExpandedLeft, setIsExpandedLeft] = useState(true);
  const [id, setId] = useState<number>(0);
  const [status, setStatus] = useState<number>(0);
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const info = await getUserInfo();
      const response = info?.data.data;

      setId(response.id);
      setStatus(response.status);
      setAvatar(response.avatarUrl);
      setFullName(response.fullname);
      setPhone(response.phoneNumber);
      setEmail(response.email);
    };

    getData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleRequestAccountDeletion();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handler for saving personal information
  const handleSavePersonalInfo = async () => {
    const request = await updateUserInfo(email, phone, fullName, id, status);
  };

  // Handler for changing password
  const handleChangePassword = async () => {
    const value = await form.validateFields();
    const { oldPass, newPass, confirmNewPass } = value;
    if (newPass !== confirmNewPass) {
      console.log("mật khẩu mới khác nhau");
    } else {
      const request = await changePassword(oldPass, newPass);
      console.log(request);
    }
  };

  const [logout, { data }] = useLogoutMutation();

  // Handler for requesting account deletion
  const handleRequestAccountDeletion = async () => {
    const request = await removeAccount(id);

    const temp = await logout;
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <p
        style={{
          fontSize: 25,
          marginBottom: 5,
        }}
      >
        Quản lý tài khoản
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <p
          style={{
            marginLeft: 10,
            marginRight: 10,
            paddingBottom: 4,
            borderBottom: isExpandedLeft ? "2px solid #ff4d4f" : "none",
            opacity: isExpandedLeft ? 1 : 0.5,
          }}
          onClick={() => setIsExpandedLeft(true)}
        >
          Chỉnh sửa thông tin
        </p>
        <p
          style={{
            paddingBottom: 4,
            borderBottom: !isExpandedLeft ? "2px solid #ff4d4f" : "none",
            opacity: !isExpandedLeft ? 1 : 0.5,
          }}
          onClick={() => setIsExpandedLeft(false)}
        >
          Cài đặt tài khoản
        </p>
      </div>

      {isExpandedLeft ? (
        <div>
          <Form form={form} layout="vertical" autoComplete="off">
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Thông tin cá nhân",
                  children: (
                    <div>
                      <Form.Item
                        style={{ display: "flex", justifyContent: "center" }}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                      >
                        <Upload action="/upload.do" listType="picture-card">
                          <button
                            style={{ border: 0, background: "none" }}
                            type="button"
                          >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </button>
                        </Upload>
                      </Form.Item>

                      <Form.Item label="fullname">
                        <Input
                          value={fullName}
                          placeholder={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                  ),
                },
              ]}
              style={{ fontWeight: "bold", marginBottom: 2 }}
              defaultActiveKey={["1"]}
            />

            <Collapse
              items={[
                {
                  key: "2",
                  label: "Thông tin liên hệ",
                  children: (
                    <div>
                      <Form.Item name="phone" label="Số điện thoại">
                        <Input
                          value={phone}
                          placeholder={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item name="email" label="Email">
                        <Input
                          value={email}
                          placeholder={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                  ),
                },
              ]}
              style={{ fontWeight: "bold", marginBottom: 2 }}
              defaultActiveKey={["2"]}
            />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Form.Item>
                <Button
                  style={{
                    padding: "0 15px",
                    color: "white",
                    backgroundColor: "#ff4d4f",
                    border: "none",
                  }}
                  onClick={() => handleSavePersonalInfo()}
                >
                  Lưu thay đổi
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      ) : (
        <div>
          <Form form={form} layout="vertical" autoComplete="off">
            <Collapse
              items={[
                {
                  key: "3",
                  label: <strong>Đổi mật khẩu</strong>,
                  children: (
                    <div>
                      <div>
                        <Form.Item name="oldPass" label="Nhập mật khẩu cũ">
                          <Input type="password" />
                        </Form.Item>

                        <Form.Item name="newPass" label="Nhập mật khẩu mới">
                          <Input type="password" />
                        </Form.Item>

                        <Form.Item
                          name="confirmNewPass"
                          label="Nhập lại mật khẩu mới"
                          rules={[
                            // Rule để kiểm tra xem mật khẩu xác nhận mới có khớp với mật khẩu mới không
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                const newPassValue = getFieldValue("newPass");
                                if (
                                  !value ||
                                  !newPassValue ||
                                  value === newPassValue
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error("Mật khẩu mới không khớp!")
                                );
                              },
                            }),
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <Form.Item
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 8,
                          marginBottom: 0,
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "red",
                            color: "white",
                          }}
                          onClick={() => handleChangePassword()}
                        >
                          Đổi mật khẩu
                        </Button>
                      </Form.Item>
                    </div>
                  ),
                },
              ]}
              style={{ marginBottom: 2 }}
              defaultActiveKey={["3"]}
            />

            <Collapse
              items={[
                {
                  key: "4",
                  label: <strong>Xóa tài khoản</strong>,
                  children: (
                    <div>
                      <p>
                        Gửi yêu cầu xóa toàn bộ thông tin của tài khoản. Sau khi
                        đồng ý xóa, toàn bộ thông tin sẽ bị xóa và không thể
                        hoàn tác.
                      </p>
                      <Form.Item
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: 8,
                          marginBottom: 0,
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "red",
                            color: "white",
                          }}
                          onClick={() => showModal()}
                        >
                          Yêu cầu xóa tài khoản
                        </Button>
                      </Form.Item>
                      <Modal
                        title="Xác nhận xóa tài khoản"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <p>
                          Bạn sẽ vĩnh viễn không thể truy cập vào tài khoản sau
                          khi xác nhận xóa tài khoản.
                        </p>
                        <p>
                          Mọi dữ liệu của bạn tại trang web sẽ không còn nữa.
                        </p>
                        <p>Bạn chắc chắn muốn xóa tài khoản chứ?</p>
                      </Modal>
                    </div>
                  ),
                },
              ]}
              style={{ marginBottom: 2 }}
              defaultActiveKey={["4"]}
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default UserPage;
