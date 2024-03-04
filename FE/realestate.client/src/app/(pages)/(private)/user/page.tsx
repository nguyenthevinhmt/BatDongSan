"use client";

import { RootState, AppDispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/app/(pages)/(private)/styles/style.layout.css";
import { Button, Collapse, CollapseProps, Flex, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getUserInfo } from "../../../../services/user/user.service";

const UserPage = () => {
  //const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm<{ email: string; phone: string }>();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [isExpandedLeft, setIsExpandedLeft] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getData = async () => {
      const info = await getUserInfo();
      const response = info?.data.data;

      setAvatar(response.avatarUrl);
      setFullName(response.fullname);
      setPhone(response.phoneNumber);
      setEmail(response.email);
    }

    getData();
  }, [])

  return (
    <div
      style={{
        width: '50%',
        margin: 'auto',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
      }}>
      <p
        style={{
          fontSize: 30,
          marginBottom: 5
        }}>Quản lý tài khoản</p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          paddingTop: 10,
          paddingBottom: 10
        }}>
        <p
          style={{
            marginLeft: 10,
            marginRight: 10,
            paddingBottom: 4,
            borderBottom: isExpandedLeft ? '2px solid #ff4d4f' : 'none',
            opacity: isExpandedLeft ? 1 : 0.5
          }}
          onClick={() => setIsExpandedLeft(true)}>Chỉnh sửa thông tin</p>
        <p
          style={{
            paddingBottom: 4,
            borderBottom: !isExpandedLeft ? '2px solid #ff4d4f' : 'none',
            opacity: !isExpandedLeft ? 1 : 0.5
          }}
          onClick={() => setIsExpandedLeft(false)}>Cài đặt tài khoản</p>
      </div>

      {isExpandedLeft ?
        <div>
          <Form form={form} layout="vertical" autoComplete="off">
            <Collapse items={[{
              key: '1',
              label: 'Thông tin cá nhân',
              children:
                <div>
                  <Form.Item style={{ display: 'flex', justifyContent: 'center' }} valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                      <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                    </Upload>
                  </Form.Item>


                  <Form.Item label="Họ và tên">
                    <Input value={fullName} placeholder={fullName} onChange={e => setFullName(e.target.value)}/>
                  </Form.Item>
                </div>
            }]}
              style={{ fontWeight: 'bold', marginBottom: 2 }}
              defaultActiveKey={['1']}
            />

            <Collapse items={[{
              key: '2',
              label: 'Thông tin liên hệ',
              children:
                <div>
                  <Form.Item name="phone" label="Số điện thoại">
                    <Input value={phone} placeholder={phone} onChange={e => setPhone(e.target.value)} />
                  </Form.Item>
                  <Form.Item name="name" label="Email">
                    <Input value={email} placeholder={email} onChange={e => setEmail(e.target.value)} />
                  </Form.Item>
                </div>
            }]}
              style={{ fontWeight: 'bold', marginBottom: 2 }}
              defaultActiveKey={['2']}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Form.Item>
                <Button
                  style={{
                    padding: '0 15px',
                    color: 'white',
                    backgroundColor: '#ff4d4f',
                    border: 'none'
                  }}>Lưu thay đổi</Button>
              </Form.Item>
            </div>
          </Form>
        </div>

        :
        <div>
          <Form form={form} layout="vertical" autoComplete="off">
            <Collapse items={[{
              key: '3',
              label: <strong>Đổi mật khẩu</strong>,
              children:
                <div>
                  <div>
                    <Form.Item label="Nhập mật khẩu cũ">
                      <Input />
                    </Form.Item>

                    <Form.Item label="Nhập mật khẩu mới">
                      <Input />
                    </Form.Item>

                    <Form.Item label="Nhập lại mật khẩu mới">
                      <Input />
                    </Form.Item>
                  </div>
                  <Form.Item
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: 8,
                      marginBottom: 0
                    }}>
                    <Button
                      style={{
                        backgroundColor: 'red',
                        color: 'white'
                      }}>Đổi mật khẩu</Button>
                  </Form.Item>
                </div>
            }]}
              style={{ marginBottom: 2 }}
            />

            <Collapse items={[{
              key: '4',
              label: <strong>Xóa tài khoản</strong>,
              children:
                <div>
                  <p>Gửi yêu cầu xóa toàn bộ thông tin của tài khoản. Sau khi đồng ý xóa, toàn bộ thông tin sẽ bị xóa và không thể hoàn tác.</p>
                  <Form.Item
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: 8,
                      marginBottom: 0
                    }}>
                    <Button
                      style={{
                        backgroundColor: 'red',
                        color: 'white'
                      }}>Yêu cầu xóa tài khoản</Button>
                  </Form.Item>
                </div>
            }]}
              style={{ marginBottom: 2 }}
            />
          </Form>
        </div>
      }
    </div>
  );
};

export default UserPage;
