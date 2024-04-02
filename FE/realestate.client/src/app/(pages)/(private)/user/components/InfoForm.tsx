import { updateAvatarUrl } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { updateUserInfo, uploadAvatar } from "@/services/user/user.service";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import { GetProp, message } from "antd/lib";
import Button from "antd/lib/button";
import Flex from "antd/lib/flex";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InfoForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userSelector = useSelector((state: RootState) => {
    return state.auth.user.data;
  });
  const [userInfo, setUserInfo] = useState({
    avatarUrl: userSelector?.avatarUrl,
    taxCode: "",
    fullname: "",
    phoneNumber: "",
    email: "",
  });

  const [file, setFile] = useState<any>();

  useEffect(() => {
    form.setFieldsValue({
      avatarUrl: userSelector?.avatarUrl,
      taxCode: userSelector?.taxCode,
      fullname: userSelector?.fullname,
      phoneNumber: userSelector?.phoneNumber,
      email: userSelector?.email,
    });
  }, [form]);

  const handleUpdate = (formValue: any) => {
    const updateUser = async () => {
      let body = {
        ...formValue
      }
      if (file) {
        const uploadReponse: any = await uploadAvatar(file);
        body.avatarUrl = uploadReponse?.secure_url;
        form.setFieldValue("avatarUrl", uploadReponse?.secure_url)
      }
      const res = await updateUserInfo(form.getFieldsValue());
      if (res?.code === HTTP_STATUS_CODE.OK) {
        message.success("Cập nhật thành công");
      }
      else {
        message.success("Có lỗi xảy ra");
      }
    }
    updateUser();
  };

  return (
    <Form
      form={form}
      onFinish={(formValue) => {
        handleUpdate(formValue);
      }}
      onFinishFailed={() => {
        message.error("Vui lòng kiểm tra lại các trường thông tin!");
      }}
      autoComplete="false"
      layout="vertical"
    >
      <p style={{ fontSize: "16px", fontWeight: "500" }}>Thông tin cá nhân</p>
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "30px",
        }}
      >
        <Form.Item
          name="avatarUrl"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Flex style={{ width: "80px", height: "80px", borderRadius: '50%', border: '1px solid #ccc', overflow: 'hidden', position: 'relative' }} justify="center" align="center">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  setUserInfo((prev) => {
                    return {
                      ...prev,
                      avatarUrl: URL.createObjectURL(e.target.files[0])
                    }
                  });
                  setFile(e.target.files[0]);
                }}
                style={{ display: 'none' }}
                id="upload-avatar-input"
              />
              <label htmlFor="upload-avatar-input" style={{ cursor: 'pointer', overflow: 'hidden' }}>
                {!userInfo?.avatarUrl && <>Tải ảnh lên</>}
                {userInfo?.avatarUrl && (
                  <div style={{ overflow: 'hidden', maxWidth: '100%', maxHeight: '100%' }}>
                    <img src={userInfo?.avatarUrl} alt="Avatar" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </label>
            </div>
          </Flex>
          {userInfo?.avatarUrl &&
            <Button size="small"
              style={{ position: 'absolute', right: '-8px', top: '0px', zIndex: 99, }}
              shape="circle"
              icon={<CloseOutlined />}
              onClick={() => {
                setFile(null);
                form.setFieldValue("avatarUrl", null)
                setUserInfo((prev) => {
                  return {
                    ...prev,
                    avatarUrl: ''
                  }
                });
                dispatch(updateAvatarUrl())
              }}
            />
          }
        </Form.Item>
        <Flex style={{ width: "100%" }} justify="space-between">
          <Form.Item
            style={{ width: "45%" }}
            name="fullname"
            label={<div style={{ fontWeight: '500' }}>Họ tên</div>}
            rules={[{ required: true, message: "Trường không được bỏ trống" }]}
          >
            <Input
            />
          </Form.Item>
          <Form.Item style={{ width: "45%" }} name="taxCode" label={<div style={{ fontWeight: '500' }}>Mã số thuế</div>}>
            <Input
            />
          </Form.Item>
        </Flex>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#f1f1f1",
          }}
        ></div>
      </div>
      <p style={{ fontSize: "16px", margin: "30px 0px", fontWeight: "500" }}>
        Thông tin liên hệ
      </p>
      <Form.Item
        name="phoneNumber"
        label={<div style={{ fontWeight: '500' }}>Số điện thoại</div>}
        rules={[{ required: true, message: "Trường không được bỏ trống" }]}
      >
        <Input
          style={{ width: "40%" }}
        />
      </Form.Item>
      <Form.Item name="email" label={<div style={{ fontWeight: '500' }}>Email</div>}>
        <Input
          style={{ width: "80%" }}
        />
      </Form.Item>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <Button
          size="large"
          style={{
            backgroundColor: "#e03c31",
            color: "#f1f1f1",
          }}
          htmlType="submit"
        >
          Lưu thay đổi
        </Button>
      </div>
    </Form>
  );
};

export default InfoForm;
