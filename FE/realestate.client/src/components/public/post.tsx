import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import HeartFilled from "@ant-design/icons/HeartFilled";
import LineOutlined from "@ant-design/icons/LineOutlined";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Flex from "antd/es/flex";
import Tooltip from "antd/es/tooltip";
import React, { useEffect, useState } from "react";
import LabelCard from "./HOC/labelCard";
import { OptionConst } from "@/shared/consts/PostOption.const";
import { FaRegHeart } from "react-icons/fa";
import dayjs from "dayjs";
import { formatCurrency, formatDate } from "@/shared/utils/common-helpers";
import { addToFavorites, getFavorites, isFavorite, removeFromFavorites } from "@/shared/utils/SavePosts-localStorage";
import { IoMdHeart } from "react-icons/io";
import { PiHeart, PiHeartFill } from "react-icons/pi";
import Link from "next/link";

const handleSavePost = (postId: any) => {
  if (isFavorite(postId)) {
    removeFromFavorites(postId);
    console.log("localStorage: ", getFavorites());
    console.log('remove', postId);
  } else {
    addToFavorites(postId);
    console.log("localStorage: ", getFavorites());
    console.log('add', postId);
  }
};

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
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    //re-render component when change localStorage
  }, [isChange]);

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
        <Link
          href={`/home/post/detail/${data?.id}`}
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
        </Link>

        <Link
          href={`/home/post/detail/${data?.id}`}
        >
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
        </Link>

        <Link
          href={`/home/post/detail/${data?.id}`}
        >
          <p
            style={{
              marginTop: "4px",
              //marginBottom: "10px", 
              fontSize: "13px",
              maxHeight: "40px",
              height: "40px",
            }}
          >
            <EnvironmentOutlined style={{ marginRight: "5px" }} />
            {`${data.district}, ${data.province}`}
          </p>
        </Link>

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
            title={isFavorite(data.id) ? "Xóa khỏi tin lưu" : "Bấm để lưu tin"}
          >
            <Button
              shape="circle"
              style={{
                border: "0 solid",
              }}
              onClick={() => {
                handleSavePost(data?.id);
                setIsChange(!isChange);
              }}
              icon={
                isFavorite(data?.id) ? (
                  <PiHeartFill
                    style={{ color: "red", borderColor: "red" }}
                  />
                ) : (
                  <PiHeart />
                )
              }
            >
            </Button>
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
        <Link
          href={`/home/post/detail/${data?.id}`}
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
        </Link>

        <Link
          href={`/home/post/detail/${data?.id}`}
        >
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
        </Link>

        <Link
          href={`/home/post/detail/${data?.id}`}
        >
          <p
            style={{
              marginTop: "4px",
              //marginBottom: "10px", 
              fontSize: "13px",
              maxHeight: "40px",
              height: "40px",
            }}
          >
            <EnvironmentOutlined style={{ marginRight: "5px" }} />
            {`${data.district}, ${data.province}`}
          </p>
        </Link>

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
            title={isFavorite(data.id) ? "Xóa khỏi tin lưu" : "Bấm để lưu tin"}
          >
            <Button
              shape="circle"
              style={{
                border: "0 solid",
              }}
              onClick={() => {
                handleSavePost(data?.id);
                setIsChange(!isChange);
              }}
              icon={
                isFavorite(data?.id) ? (
                  <PiHeartFill
                    style={{ color: "red", borderColor: "red" }}
                  />
                ) : (
                  <PiHeart />
                )
              }
            >
            </Button>
          </Tooltip>

        </Flex>
      </Card>
    </LabelCard>
  );
};

export default PostCard;
