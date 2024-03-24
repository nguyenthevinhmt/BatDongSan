import { Button, Flex, Input } from "antd/lib";
import Form from "antd/lib/form";
import React from "react";

const LockAccountForm = () => {
  return (
    <div style={{ marginLeft: "24px" }}>
      <Form style={{ marginTop: "5px" }}>
        <Flex align="center" gap={10}>
          <div>
            <Form.Item>
              <div style={{ fontWeight: "500" }}>Nhập mật khẩu hiện tại</div>
              <Input.Password />
            </Form.Item>
          </div>
          <Form.Item style={{ marginTop: "20px" }}>
            <Button
              size="middle"
              htmlType="submit"
              style={{
                backgroundColor: "#FF4D4F",
                color: "white",
                border: "none",
              }}
            >
              Xóa tài khoản
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
