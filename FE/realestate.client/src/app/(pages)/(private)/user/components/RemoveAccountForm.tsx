import { Button, Flex, Form, Input } from "antd/lib";
import React from "react";

const RemoveAccountForm = () => {
  return (
    <div style={{ marginLeft: "24px" }}>
      <div style={{ fontSize: "14px", marginBottom: "20px" }}>
        Gửi yêu cầu xoá toàn bộ thông tin của tài khoản. Sau khi được xử lý,
        toàn bộ thông tin sẽ được xoá và không thể hoàn tác.
      </div>
      <Button size="middle" danger>
        Yêu cầu xóa tài khoản
      </Button>
    </div>
  );
};

export default RemoveAccountForm;
