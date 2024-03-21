import {
  EnvironmentOutlined,
  LineOutlined,
} from "@ant-design/icons";
import { Card, Flex, Tooltip } from "antd";
import React from "react";
import LabelCard from "./HOC/labelCard";
import { OptionConst } from "@/shared/consts/PostOption.const";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";

const PostCard = ({
  option,
  loading,
}: {
  option: number;
  loading: boolean;
}) => {
  let color = "";
  if (option === OptionConst.NORMAL) {
    return (
      <Card
        hoverable
        loading={loading}
        style={{ width: 236, height: 361 }}
        bodyStyle={{ padding: 14 }}
        cover={
          loading ? (
            <div className="custom-skeleton-image"></div>
          ) : (
            <Image
              height={200}
              width={300}
              style={{ objectFit: "cover", width: "100%" }}
              alt="#"
              src="https://res.cloudinary.com/deurdoich/image/upload/v1710727579/DATN/l73ifg1hsmsdf8mx44xg.jpg"
            />
          )
        }
      >
        <h2
          className="ellipsis-multiline"
          style={{
            fontFamily: "Roboto,Arial",
            height: "40px",
            fontSize: "15px",
            lineHeight: "20px",
            fontWeight: "500",
            color: "#2C2C2C",
            marginBottom: "4px",
            letterSpacing: "1px",
          }}
        >
          {/* {item.name} */}
          tên
        </h2>
        <span
          style={{
            color: "#E03C31",
            fontSize: "17px",
            fontWeight: 600,
          }}
        >
          Giá thỏa thuận <LineOutlined /> <span>56m²</span>
        </span>
        <p style={{ marginTop: "4px", fontSize: "16px" }}>
          <EnvironmentOutlined style={{ marginRight: "5px" }} />
          Liên Chiểu, Đà Nẵng
        </p>
        <Flex justify="space-between" align="flex-end">
          <Tooltip placement="bottom" title={"27/02/2024"} color={"#423e3e"}>
            <span
              style={{
                color: "#999",
                fontSize: "13px",
                marginBottom: "4px",
              }}
            >
              Đăng 3 ngày trước
            </span>
          </Tooltip>
          <Tooltip
            placement="bottom"
            color={"#423e3e"}
            title={"Bấm để lưu tin"}
          >
            <FaRegHeart onClick={() => {
              console.log("click")
            }} />
          </Tooltip>
        </Flex>
      </Card>
    );
  } else if (option === OptionConst.SILVER) {
    color = "#009BA1";
  } else if (option === OptionConst.GOLD) {
    color = "#E3AA49";
  } else if (option === OptionConst.DIAMOND) {
    color = "#E03C6D";
  }
  return (
    <LabelCard text="VIP" color={color}>
      <Card
        hoverable
        loading={loading}
        style={{ width: 236, height: 361 }}
        bodyStyle={{ padding: 14 }}
        cover={
          loading ? (
            <div className="custom-skeleton-image"></div>
          ) : (
            <Image
              height={200}
              width={300}
              style={{ objectFit: "cover", width: "100%" }}
              alt="#"
              src="https://res.cloudinary.com/deurdoich/image/upload/v1710727579/DATN/l73ifg1hsmsdf8mx44xg.jpg"
            />
          )
        }
      >
        <h2
          className="ellipsis-multiline"
          style={{
            height: "40px",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "500",
            color: "#2C2C2C",
            marginBottom: "4px",
          }}
        >
          {/* {item.name} */}
          Bán nhà lấy tiền trả lợi, giá từ 8 tỷ
        </h2>
        <span
          style={{
            color: "#E03C31",
            fontSize: "16px",
            fontWeight: '500',
          }}
        >
          Giá thỏa thuận <LineOutlined /> <span>56m²</span>
        </span>
        <p style={{ marginTop: "4px", fontSize: "14px" }}>
          <EnvironmentOutlined style={{ marginRight: "5px" }} />
          Liên Chiểu, Đà Nẵng
        </p>
        <Flex justify="space-between" align="flex-end">
          <Tooltip placement="bottom" title={"27/02/2024"} color={"#423e3e"}>
            <span
              style={{
                color: "#999",
                fontSize: "13px",
                marginBottom: "4px",
              }}
            >
              Đăng 3 ngày trước
            </span>
          </Tooltip>
          <Tooltip
            placement="bottom"
            color={"#423e3e"}
            title={"Bấm để lưu tin"}
          >
            <FaRegHeart onClick={() => {
              console.log("click")
            }} />
          </Tooltip>
        </Flex>
      </Card>
    </LabelCard>
  );
};

export default PostCard;
