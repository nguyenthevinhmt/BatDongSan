import LogoGray from "@/assets/image/LogoGray";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Input from "antd/es/input";
import React from "react";
import { IoSend } from "react-icons/io5";
import { MdOutlineHeadphones, MdOutlinePhoneInTalk } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";

const Footer = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          height: "auto",
          padding: "68px 196px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "1200px" }}>
          <Flex justify="space-around">
            <LogoGray />
            <Flex align="center">
              <MdOutlinePhoneInTalk
                style={{
                  fontSize: "32px",
                  color: "#505050",
                  marginRight: "10px",
                }}
              />
              <div style={{ color: "#828282" }}>
                <span>Hotline</span>
                <div style={{ fontSize: "16px", color: "#505050" }}>
                  19001000
                </div>
              </div>
            </Flex>
            <Flex align="center">
              <TbUserQuestion
                style={{
                  fontSize: "32px",
                  color: "#505050",
                  marginRight: "10px",
                }}
              />
              <div style={{ color: "#828282" }}>
                <span>Hỗ trợ khách hàng</span>
                <div style={{ fontSize: "16px", color: "#505050" }}>
                  trogiup.batdongsan.com.vn
                </div>
              </div>
            </Flex>

            <Flex align="center">
              <MdOutlineHeadphones
                style={{
                  fontSize: "32px",
                  color: "#505050",
                  marginRight: "10px",
                }}
              />
              <div style={{ color: "#828282" }}>
                <span>Chăm sóc khách hàng</span>
                <div style={{ fontSize: "16px", color: "#505050" }}>
                  hotro@batdongsan.com.vn
                </div>
              </div>
            </Flex>
          </Flex>
          <Flex
            align="center"
            justify="space-between"
            style={{ width: "100%" }}
          >
            <Flex
              vertical
              style={{
                marginTop: "30px",
                alignItems: "start",
                marginLeft: "40px",
              }}
            >
              <div style={{ maxWidth: "500px" }}>
                <div style={{ fontSize: "30px", fontWeight: "600" }}>
                  Về chúng tôi
                </div>
                <p style={{ fontSize: "14px", textAlign: "start" }}>
                  Công ty cổ phần BatDongSan.com
                </p>
                <p style={{ fontSize: "14px", textAlign: "start" }}>
                  Địa chỉ: 55 Giải Phóng, Phường Đồng Tâm, Quận Hai Bà Trưng, Hà
                  Nội
                </p>
                <p style={{ fontSize: "14px", textAlign: "start" }}>
                  Mã số thuế : 0106713191. ( Đăng ký lần đầu : ngày 15 tháng 12
                  năm 2014. Đăng kí thay đổi ngày 24/11/2022)
                </p>
              </div>
            </Flex>
            <div style={{ width: "30%", marginRight: "35px" }}>
              <h3 style={{ marginBottom: "10px", fontWeight: "500" }}>
                Liên hệ với chúng tôi
              </h3>
              <Input
                placeholder="Nhập email của bạn"
                suffix={
                  <Button
                    style={{ backgroundColor: "#FF4D4F" }}
                    icon={<IoSend color="#fff" />}
                  ></Button>
                }
              />
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Footer;
