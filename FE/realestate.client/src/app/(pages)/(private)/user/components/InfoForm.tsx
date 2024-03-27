import { RootState } from "@/redux/store";
import { apiUploadImage } from "@/services/post/post.service";
import { getUserInfo, updateUserInfo } from "@/services/user/user.service";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { GetProp, message } from "antd/lib";
import Button from "antd/lib/button";
import Flex from "antd/lib/flex";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Upload, { UploadProps } from "antd/lib/upload/Upload";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const InfoForm = () => {

  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({
    avatar: form.getFieldValue("avatarUrl"),
    taxCode: "",
    fullname: "",
    phoneNumber: "",
    email: "",
  });
  const [onFocus, setOnFocus] = useState(false);

  const [fileList, setFileList] = useState<any>([]);
  const userSelector = useSelector((state: RootState) => {
    return state.auth.user.data;
  });

  const handleUpload = async ({ file, onSuccess, onError }: any) => {
    const response = await apiUploadImage({ file, onSuccess, onError });
    await form.setFieldValue("avatarUrl", response?.secure_url);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      await form.setFieldsValue({
        avatarUrl: userSelector.avatarUrl,
        taxCode: userSelector.taxCode,
        fullname: userSelector.fullname,
        phoneNumber: userSelector.phoneNumber,
        email: userSelector.email,
      });
    }
    fetchUserInfo();
  }, [form]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
        width: "100px",
        height: "100px",
      }}
      type="button"
    >
      {userSelector?.avatar ? (
        <img
          src={userInfo?.avatar}
          alt="avatar"
          style={{
            objectFit: "cover",
            borderRadius: "50%",
          }}
          width={100}
          height={100}
        />
      ) : (
        <>
          <PlusOutlined />
          <>Upload</>
        </>
      )}
    </button>
  );

  const handleUpdate = (formValue: any) => {
    const updateUser = async () => {
      const res = await updateUserInfo(formValue);
      if (res?.code === HTTP_STATUS_CODE.OK) {
        message.success("Cập nhật thành công");
        // userInfo?.avatar = res?.data?.avatarUrl
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
          name={"avatarUrl"}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        // valuePropName="avatar"
        >
          <Upload
            name="avatar"
            listType="picture-circle"
            fileList={fileList}
            style={{ position: "relative" }}
            customRequest={handleUpload}
          >
            {uploadButton}
            <div
              style={{
                position: "absolute",
                color: "#ccc",
                display: `${onFocus ? "block" : "none"}`,
              }}
            >
              <PlusOutlined />
              <div>{userInfo?.avatar ? "Edit" : "Upload"}</div>
            </div>
          </Upload>
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
        name={"phoneNumber"}
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
      <Form.Item
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
      </Form.Item>
    </Form>
  );
};

export default InfoForm;
