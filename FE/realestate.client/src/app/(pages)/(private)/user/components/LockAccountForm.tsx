import { useLogoutMutation } from "@/app/(auth)/auth/_services/auth.service";
import { deactiveAccount, logout } from "@/services/user/user.service";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { Modal, message } from "antd";
import { Button, Flex, Input } from "antd/lib";
import Form from "antd/lib/form";
import { useRouter } from "next/navigation";
import React from "react";

const LockAccountForm = () => {
  const [form] = Form.useForm();
  const router = useRouter()
  const handleSubmit = async () => {
    const response = await deactiveAccount(form.getFieldValue('password'));
    if (response?.code === 1003) {
      message.error("Mật khẩu không đúng");
    }
    else if (response?.code === HTTP_STATUS_CODE.OK) {
      logout();
      router.replace("/");
    }
    else {
      message.error("Có lỗi xảy ra");
    }
  }
  return (
    <div style={{ marginLeft: "24px" }}>
      <Form
        form={form}
        autoComplete="off"
        style={{ marginTop: "5px" }}
        layout="vertical"
        onFinish={(formValue) => {
          Modal.confirm({
            title: 'Xác nhận khóa tài khoản',
            content: <div>
              <div>Quý khách sẽ không thể đăng nhập lại vào tài khoản này sau khi khóa.</div>
              <div>Vui lòng liên hệ hotline 19001881 hoặc email hotro@batdongsan.com.vn nếu bạn cần hỗ trợ</div>
            </div>,
            onOk() {
              handleSubmit()
            },
            onCancel() {
              console.log("cancel")
            }
          })
        }}
      >
        <Flex align="center" gap={10}>
          <div>
            <Form.Item
              name={["currentPassword"]}
              label={
                <div style={{ fontWeight: "500" }}>Nhập mật khẩu hiện tại</div>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu hiện tại!",
                },
              ]}
            >
              <Input.Password allowClear />
            </Form.Item>
          </div>
          <Form.Item style={{ marginTop: "30px" }}>
            <Button
              size="middle"
              htmlType="submit"
              style={{
                backgroundColor: "#FF4D4F",
                color: "white",
                border: "none",
              }}
            >
              Khoá tài khoản
            </Button>
          </Form.Item>
        </Flex>
      </Form>
      <div>
        <div style={{ fontWeight: "500" }}>Lưu ý</div>
        <ul style={{ marginLeft: "20px" }}>
          <li style={{ fontSize: "14px" }}>
            Quý khách sẽ không thể đăng nhập lại vào tài khoản này sau khi khóa.
          </li>
          <li style={{ fontSize: "14px" }}>
            Các tin đăng đang hiển thị của quý khách sẽ tiếp tục được hiển thị
            tới hết thời gian đăng tin đã chọn.
          </li>
          <li style={{ fontSize: "14px" }}>
            Số dư tiền (nếu có) trong các tài khoản của quý khách sẽ không được
            hoàn lại.
          </li>
          <li style={{ fontSize: "14px" }}>
            Tài khoản dịch vụ của quý khách chỉ có thể được khóa khi không còn
            số dư nợ.
          </li>
          <li style={{ fontSize: "14px" }}>
            Số điện thoại chính đăng ký tài khoản này và các số điện thoại đăng
            tin của quý khách sẽ không thể được sử dụng lại để đăng ký tài khoản
            mới.
          </li>
          <li style={{ fontSize: "14px" }}>
            Trong trường hợp bạn muốn sử dụng lại số điện thoại chính này, vui
            lòng liên hệ CSKH 1900.1881 để được hỗ trợ.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LockAccountForm;
