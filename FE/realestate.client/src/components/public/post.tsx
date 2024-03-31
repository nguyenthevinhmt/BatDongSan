import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import HeartFilled from "@ant-design/icons/HeartFilled";
import LineOutlined from "@ant-design/icons/LineOutlined";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Flex from "antd/es/flex";
import Tooltip from "antd/es/tooltip";
import React from "react";
import LabelCard from "./HOC/labelCard";
import { OptionConst } from "@/shared/consts/PostOption.const";
import { FaRegHeart } from "react-icons/fa";
import dayjs from "dayjs";
import { formatCurrency, formatDate } from "@/shared/utils/common-helpers";

const PostCard = ({
  option,
  loading,
  data,
}: {
  option: number;
  loading: boolean;
  data: any;
}) => {
  let color = "";
  if (option === OptionConst.NORMAL) {
    return (
      <Card
        hoverable
        loading={loading}
        style={{ width: 260, height: 360 }}
        bodyStyle={{ padding: 14 }}
        cover={
          loading ? (
            <div className="custom-skeleton-image"></div>
          ) : (
            <img
              height={200}
              width={300}
              style={{ objectFit: "cover", width: "100%" }}
              alt="#"
              src={data?.firstImageUrl}
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
          {data?.title}
        </h2>
        <span
          style={{
            color: "#E03C31",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {data?.price ? formatCurrency(data?.price) : "Giá thỏa thuận"} -{" "}
          <span>{data?.area} m²</span>
        </span>
        <p style={{ marginTop: "4px", marginBottom: "16px", fontSize: "13px" }}>
          <EnvironmentOutlined style={{ marginRight: "5px" }} />
          {`${data.district}, ${data.province}`}
        </p>
        <Flex justify="space-between" align="center">
          <Tooltip
            placement="bottom"
            title={dayjs(data?.createdDate).format("DD/MM/YYYY")}
            color={"#423e3e"}
          >
            <span
              style={{
                color: "#999",
                fontSize: "13px",
                marginBottom: "4px",
              }}
            >
              {formatDate(dayjs(data?.createdDate))}
            </span>
          </Tooltip>
          <Tooltip
            placement="bottom"
            color={"#423e3e"}
            title={"Bấm để lưu tin"}
          >
            <FaRegHeart
              onClick={() => {
                console.log("click");
              }}
            />
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
        style={{ width: 260, height: 360 }}
        bodyStyle={{ padding: 14 }}
        cover={
          loading ? (
            <div className="custom-skeleton-image"></div>
          ) : (
            <img
              height={200}
              width={300}
              style={{ objectFit: "cover", width: "100%" }}
              alt="#"
              src={data?.firstImageUrl}
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
          {data?.title}
        </h2>
        <span
          style={{
            color: "#E03C31",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {data?.price ? formatCurrency(data?.price) : "Giá thỏa thuận"} -{" "}
          <span>{data?.area} m²</span>
        </span>
        <p
          style={{
            marginTop: "4px",
            marginBottom: "16px",
            fontSize: "13px",
            fontFamily: "__Lexend_126e48, __Lexend_Fallback_126e48",
          }}
        >
          <EnvironmentOutlined style={{ marginRight: "5px" }} />
          {`${data.district}, ${data.province}`}
        </p>
        <Flex justify="space-between" align="center">
          <Tooltip
            placement="bottom"
            title={dayjs(data?.createdDate).format("DD/MM/YYYY")}
            color={"#423e3e"}
          >
            <span
              style={{
                color: "#999",
                fontSize: "13px",
                marginBottom: "4px",
                fontFamily: "__Lexend_126e48, __Lexend_Fallback_126e48",
              }}
            >
              {formatDate(dayjs(data?.createdDate))}
            </span>
          </Tooltip>
          <Tooltip
            placement="bottom"
            color={"#423e3e"}
            title={"Bấm để lưu tin"}
          >
            <FaRegHeart
              onClick={() => {
                console.log("click");
              }}
            />
          </Tooltip>
        </Flex>
      </Card>
    </LabelCard>
  );
};

export default PostCard;
