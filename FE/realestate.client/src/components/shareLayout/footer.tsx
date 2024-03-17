import LogoGray from "@/assets/image/LogoGray";
import { Flex } from "antd";
import React from "react";
import { BiSupport } from "react-icons/bi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { TbUserQuestion } from "react-icons/tb";

const Footer = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#f2f2f2",
          height: "746px",
          padding: "68px 196px",
        }}
      >
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
              <div style={{ fontSize: "16px", color: "#505050" }}>19001000</div>
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
            <BiSupport
              style={{
                fontSize: "32px",
                color: "#505050",
                marginRight: "10px",
              }}
            />
            <div style={{ color: "#828282" }}>
              <span>Hotline</span>
              <div style={{ fontSize: "16px", color: "#505050" }}>19001000</div>
            </div>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default Footer;
