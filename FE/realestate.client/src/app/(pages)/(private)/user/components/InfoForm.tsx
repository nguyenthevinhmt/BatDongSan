import { apiUploadImage } from "@/services/post/post.service";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { GetProp } from "antd/lib";
import Button from "antd/lib/button";
import Flex from "antd/lib/flex";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Upload, { UploadProps } from "antd/lib/upload/Upload";
import React, { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const InfoForm = () => {
  const [avatar, setAvatar] = useState<any>();
  const [onFocus, setOnFocus] = useState(false);

  const handleUpload = async ({ file, onSuccess, onError }: any) => {
    const response = await apiUploadImage({ file, onSuccess, onError });
    setAvatar(response?.data);
  };

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
      {avatar ? (
        <img
          src={avatar}
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

  return (
    <Form>
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
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
          valuePropName="avatar"
        >
          <Upload
            name="avatar"
            listType="picture-circle"
            style={{ position: "relative" }}
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
              <div>{avatar ? "Edit" : "Upload"}</div>
            </div>
          </Upload>
        </Form.Item>
        <Flex style={{ width: "100%" }} justify="space-between">
          <Form.Item style={{ width: "45%" }}>
            <div>Họ và tên</div>
            <Input />
          </Form.Item>
          <Form.Item style={{ width: "45%" }}>
            <div>Mã số thuế cá nhân</div>
            <Input />
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
      <Form.Item>
        <span>Số điện thoại</span>
        <div>
          <Input style={{ width: "40%" }} />
        </div>
      </Form.Item>
      <Form.Item>
        <span>Email</span>
        <div>
          <Input style={{ width: "80%" }} />
        </div>
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
        >
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InfoForm;
