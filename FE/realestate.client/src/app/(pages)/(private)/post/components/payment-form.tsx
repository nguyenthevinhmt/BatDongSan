"use client";
import { EyeOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Flex, Form, Radio, Row, Select } from "antd";
import React, { useState } from "react";

interface IPost {
  title: string;
  description: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  detailAddress?: string;
  area: number;
  price: number;
  rentalObject?: number;
  youtubeLink?: string;
  postTypeId: number;
  realEstateTypeId: number;
  options: number;
  lifeTime: number;
  calculateType: number;
  listMedia?: MediaType[];
}

interface MediaType {
  name: string;
  description: string;
  mediaUrl: string;
}

const PaymentForm = () => {
  const [postType, setPostType] = useState(1);
  const handleSubmit = async (formValue: any) => {};
  return (
    <Flex justify="center" gap="small" vertical>
      <div
        style={{
          width: "50%",
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
            <Flex justify="center" gap="middle">
              <Button style={{ height: "158px", width: "162px" }}>
                <Flex vertical>
                  <h4 style = {{fontSize: "16px"}}>Tin thường</h4>
                  <span style={{marginBottom: "10px"}}>Từ 2.000đ/ngày</span>
                  <div style={{height: '50px'}}></div>
                  <Button>Chọn</Button>
                </Flex>
              </Button>
              <Button style={{ height: "158px", width: "162px" }}>
                <Flex vertical>
                  <h4 style={{color: "rgb(0, 155, 161)", fontSize: "16px"}}>VIP bạc</h4>
                  <span style={{marginBottom: "10px"}}>Từ 50.000đ/ngày</span>
                  <div  style={{fontSize: "18px"}}><EyeOutlined /><span style={{fontWeight: "500"}}> x 11</span></div>
                  <>lượt xem tin</>
                  <Button>Chọn</Button>
                </Flex>
              </Button>
              <Button style={{ height: "158px", width: "162px" }}>
                <Flex vertical>
                  <h4 style={{color: "rgb(227, 170, 73)" , fontSize: "16px"}}>VIP vàng</h4>
                  <span style={{marginBottom: "10px"}}>Từ 100.000đ/ngày</span>
                  <div  style={{fontSize: "18px"}}><EyeOutlined /><span style={{fontWeight: "500"}}> x 18</span></div>
                  <>lượt xem tin</>
                  <Button>Chọn</Button>
                </Flex>
              </Button>
              <Button style={{ height: "158px", width: "162px" }}>
                <Flex vertical>
                  <h4 style={{color: "rgb(224, 60, 49)" , fontSize: "16px"}}>Vip kim cương</h4>
                  <span style={{marginBottom: "10px"}}>Từ 200.000đ/ngày</span>
                  <div  style={{fontSize: "18px"}}><EyeOutlined /><span style={{fontWeight: "500"}}> x 90</span></div>
                  <>lượt xem tin</>
                  <Button>Chọn</Button>
                </Flex>
              </Button>
            </Flex>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h4 style={{ fontWeight: "600"}}>
              Chọn thời gian đăng tin
            </h4>
            <p style={{ fontWeight: "400", marginBottom: "10px" }}>
              <span style={{color:"red"}}>*</span> Số ngày đăng
            </p>
            <Form.Item style={{marginLeft: "32px"}}>
              <Radio.Group>
                <Radio value="10"> 10 ngày </Radio>
                <Radio value="15"> 15 ngày </Radio>
                <Radio value="30"> 30 ngày </Radio>
              </Radio.Group>
            </Form.Item>
            <h4 style={{ fontWeight: "400", marginTop: "20px", marginBottom: '10px' }}> <span style={{color:"red"}}>*</span> Ngày bắt đầu</h4>
            <DatePicker style={{width: '400px', marginLeft: "32px"}} placeholder="Chọn ngày bắt đầu" format='DD/MM/YYYY'/>
            <h5 style={{width: '400px', marginLeft: "32px", marginTop: '5px', fontWeight: "400"}}>Kết thúc ngày 21/03/2024</h5>
          </div>
          <Divider />
          <div style={{ marginTop: "20px" }}>
            <h2 style={{
              fontSize: 24,
              fontWeight: "500",
              margin: "15px 0px",
            }}>Thanh toán</h2>
            <div style={{display: "flex", justifyContent: 'space-between', margin: "0px 32px"}}>
              <div>Loại tin</div>
              <h4 style={{fontWeight: '500'}}>Tin thường</h4>
            </div>
            <div style={{display: "flex", justifyContent: 'space-between', margin: "0px 32px"}}>
              <div>Đơn giá / ngày</div>
              <h4 style={{fontWeight: '500'}}>2.800 đ</h4>
            </div>
            <div style={{display: "flex", justifyContent: 'space-between', margin: "0px 32px"}}>
              <div>Thời gian đăng tin</div>
              <h4 style={{fontWeight: '500'}}>10 ngày</h4>
            </div>
            <div style={{display: "flex", justifyContent: 'space-between', margin: "0px 32px"}}>
              <div>Phí đăng tin</div>
              <h4 style={{fontWeight: '500'}}>28.000đ</h4>
            </div>
            <Divider/>
            <div style={{display: "flex", justifyContent: 'space-between'}}>
              <p style={{fontSize: '24px', fontWeight: '500'}}>Tổng tiền</p>
              <h4 style={{fontWeight: '500', fontSize: '24px'}}>28.000đ</h4>
            </div>
          </div>
          <div style={{marginTop: "30px", display: 'flex', justifyContent: 'space-between'}}>
            <Button style={{height: '48px', fontSize: "16px", color: "#555"}} icon={<LeftOutlined />}>Quay lại</Button>
            <Flex>
              <Flex vertical style={{marginRight: "20px"}}>
                <p style={{fontSize: "14px"}}>Tổng tiền</p>
                <p style={{fontSize: "20px", fontWeight: "500"}}>28.000đ</p>
              </Flex>
              <Button style={{backgroundColor: "rgb(224, 60, 49)", height: '48px', fontSize: "16px", fontWeight: "400", color: "#fff"}}>Thanh toán và đăng tin</Button>
            </Flex>
          </div>
        </Form>
      </div>
    </Flex>
  );
};

export default PaymentForm;
