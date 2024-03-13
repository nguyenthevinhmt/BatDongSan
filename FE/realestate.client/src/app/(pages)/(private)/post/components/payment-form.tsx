"use client";
import { updatePaymentStatus } from "@/services/post/post.service";
import { formatNumber } from "@/shared/utils/common-helpers";
import { LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Flex,
  Form,
  InputNumber,
  Radio,
} from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import React, { useState } from "react";

interface IForm {
  options: number;
  lifeTime: number;
  postStartDate?: Date;
  postEndDate?: Date;
}

const PaymentForm = () => {
  const [formData, setFormData] = useState<IForm>({
    options: 1,
    lifeTime: 5,
    postStartDate: new Date(),
    postEndDate: undefined,
  });
  const postInfo = [
    {
      option: 1,
      price: 2000,
      type: "Tin thường",
    },
    {
      option: 2,
      price: 50000,
      type: "VIP Bạc",
    },
    {
      option: 3,
      price: 100000,
      type: "VIP Vàng",
    },
    {
      option: 4,
      price: 200000,
      type: "VIP Kim cương",
    },
  ];

  const handleSubmit = async (formValue: any) => {
    console.log("object form", formValue);
    const payload = {
      options: formData.options,
      lifeTime: formData.lifeTime,
      id: 1,
    };
    const response = await updatePaymentStatus(payload);
  };
  return (
    <Flex justify="center" gap="small" vertical>
      <div
        style={{
          width: "60%",
          margin: "auto",
          padding: 20,
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Form
          layout="vertical"
          autoComplete="off"
          onFinish={(formValue) => handleSubmit(formValue)}
          onError={(formValue) => {
            console.log("object", formValue);
          }}
          //   style={{ width: "100%" }}
        >
          <h1
            style={{
              fontSize: 24,
              fontWeight: "500",
              margin: "15px 0px",
            }}
          >
            Cấu hình tin đăng
          </h1>

          <div style={{ marginTop: "20px" }}>
            <h4 style={{ fontWeight: "600", marginBottom: "20px" }}>
              Chọn loại tin đăng
            </h4>

            <Form.Item name="options">
              <Flex justify="center" gap="middle">
                {postInfo?.map((item) => (
                  <Card
                    key={item.option}
                    style={{
                      width: "25%",
                      height: "auto",
                      textAlign: "center",
                      border:
                        item.option === formData.options
                          ? "1px solid rgb(134 219 222)"
                          : "1px solid #ccc",
                      backgroundColor:
                        item.option === formData.options
                          ? "#E8FEFF"
                          : "#ffffff",
                    }}
                    onClick={() => {
                      setFormData((prev: any) => {
                        return {
                          ...prev,
                          options: item.option,
                        };
                      });
                    }}
                    hoverable
                    bordered={item.option === formData.options}
                  >
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>
                      {item.option === 1 && "Tin thường"}
                      {item.option === 2 && (
                        <span style={{ color: "#009BA1" }}>VIP bạc</span>
                      )}
                      {item.option === 3 && (
                        <span style={{ color: "#E3AA49" }}>VIP Vàng</span>
                      )}
                      {item.option === 4 && (
                        <span style={{ color: "#E03C31" }}>VIP bạc</span>
                      )}
                    </p>
                    <span style={{ fontSize: "12px" }}>
                      {item.option === 1 && "từ 2.000đ/ngày"}
                      {item.option === 2 && "từ 50.000đ/ngày"}
                      {item.option === 3 && "từ 100.000đ/ngày"}
                      {item.option === 4 && "từ 200.000đ/ngày"}
                    </span>
                    <Button
                      style={{
                        marginTop: "30px",
                        color:
                          item.option === formData.options
                            ? "#fff"
                            : "rgb(134 219 222)",
                        border: "1px solid rgb(134 219 222)",
                        backgroundColor:
                          item.option === formData.options
                            ? "#009BA1"
                            : "#ffffff",
                      }}
                    >
                      {item.option === formData.options ? "Đã chọn" : "Chọn"}
                    </Button>
                  </Card>
                ))}
              </Flex>
            </Form.Item>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h4 style={{ fontWeight: "600" }}>Chọn thời gian đăng tin</h4>
            <div style={{ width: "30%", marginLeft: "10px" }}>
              <p
                style={{
                  fontWeight: "400",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <span style={{ color: "red" }}>*</span> Số ngày đăng
              </p>
              <Form.Item name="lifeTime">
                <InputNumber
                  min={1}
                  value={formData.lifeTime}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setFormData((prev: any) => {
                      return {
                        ...prev,
                        lifeTime: value,
                      };
                    });
                  }}
                />
              </Form.Item>
            </div>
            <Flex style={{ width: "100%", marginTop: "10px" }} justify="center">
              <div style={{ width: "50%", marginLeft: "10px" }}>
                <p style={{ fontWeight: "400", marginBottom: "10px" }}>
                  <span style={{ color: "red" }}>*</span> Ngày bắt đầu
                </p>
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày bắt đầu"
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf("day");
                  }}
                  format="DD/MM/YYYY"
                  onChange={(value, dateString) => {
                    setFormData((prev: any) => {
                      return {
                        ...prev,
                        postStartDate: new Date(
                          dayjs(value, "YYYY/MM/DD").toDate()
                        ),
                        postEndDate: new Date(
                          dayjs(value, "YYYY/MM/DD")
                            .add(formData.lifeTime, "day")
                            .toDate()
                        ),
                      };
                    });
                  }}
                  value={dayjs(formData.postStartDate)}
                />
              </div>
              <div style={{ width: "50%", marginLeft: "10px" }}>
                <p style={{ fontWeight: "400", marginBottom: "10px" }}>
                  <span style={{ color: "red" }}>*</span> Ngày kết thúc
                </p>
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  disabled={true}
                  value={dayjs(formData.postStartDate).add(
                    formData.lifeTime,
                    "day"
                  )}
                />
              </div>
            </Flex>
          </div>
          <Divider />
          <div style={{ marginTop: "20px" }}>
            <h2
              style={{
                fontSize: 24,
                fontWeight: "500",
                margin: "15px 0px",
              }}
            >
              Thanh toán
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 32px",
              }}
            >
              <div>Loại tin</div>
              <h4 style={{ fontWeight: "500" }}>
                {
                  postInfo.filter((item) => formData.options === item.option)[0]
                    .type
                }
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 32px",
              }}
            >
              <div>Đơn giá / ngày</div>
              <h4 style={{ fontWeight: "500" }}>
                {formatNumber(
                  postInfo.filter((item) => formData.options === item.option)[0]
                    .price
                )}
                đ
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 32px",
              }}
            >
              <div>Thời gian đăng tin</div>
              <h4 style={{ fontWeight: "500" }}>{formData.lifeTime} ngày</h4>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 32px",
              }}
            >
              <div>Phí đăng tin</div>
              <h4 style={{ fontWeight: "500" }}>
                {formatNumber(
                  postInfo.filter((item) => formData.options === item.option)[0]
                    .price * formData.lifeTime
                )}
                đ
              </h4>
            </div>
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontSize: "24px", fontWeight: "500" }}>Tổng tiền</p>
              <h4 style={{ fontWeight: "500", fontSize: "24px" }}>
                {formatNumber(
                  postInfo.filter((item) => formData.options === item.option)[0]
                    .price * formData.lifeTime
                )}
                đ
              </h4>
            </div>
          </div>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{ height: "48px", fontSize: "16px", color: "#555" }}
              icon={<LeftOutlined />}
            >
              Quay lại
            </Button>
            <Flex>
              <Flex vertical style={{ marginRight: "20px" }}>
                <p style={{ fontSize: "14px" }}>Tổng tiền</p>
                <p style={{ fontSize: "20px", fontWeight: "500" }}>
                  {formatNumber(
                    postInfo.filter(
                      (item) => formData.options === item.option
                    )[0].price * formData.lifeTime
                  )}
                  đ
                </p>
              </Flex>
              <Button
                style={{
                  backgroundColor: "rgb(224, 60, 49)",
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#fff",
                }}
                htmlType="submit"
              >
                Thanh toán và đăng tin
              </Button>
            </Flex>
          </div>
        </Form>
      </div>
    </Flex>
  );
};

export default PaymentForm;
