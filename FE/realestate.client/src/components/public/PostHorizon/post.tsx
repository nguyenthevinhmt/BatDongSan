import React, { useEffect, useState } from "react";
import Button from "antd/lib/button";
import Divider from "antd/lib/divider";
import Flex from "antd/es/flex";
import Tooltip from "antd/lib/tooltip";
import LabelCardHorizon from "../HOC/LabelCardHorizon";
import { OptionConst } from "@/shared/consts/PostOption.const";
import { IoMdHeart } from "react-icons/io";
import { PiHeartFill } from "react-icons/pi";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/shared/utils/common-helpers";
import dayjs from "dayjs";
import Link from "next/link";
import { addToFavorites, getFavorites, isFavorite, removeFromFavorites } from "@/shared/utils/SavePosts-localStorage";

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

const PostHorizon = ({
  data,
  option,
  loading,
}: {
  data?: any;
  option?: number;
  loading?: boolean;
}) => {
  const [isChange, setIsChange] = useState(false);
  
  useEffect(() => {
  }, [isChange]);
  
  let labelText = "";
  let color = "";
  if (option === OptionConst.NORMAL) {
    return (
      <div>
        <div style={{ width: "720px", height: "150px", marginBottom: "60px" }}>
          <Flex>
            <Link href={`/home/post/detail/${data?.id}`} style={{ flex: 3 }}>
              <img
                src={data?.firstImageUrl}
                alt="#"
                width={200}
                height={150}
                style={{ objectFit: "cover" }}
              />
            </Link>
            <div style={{ flex: 7 }}>
              <Link href={`/home/post/detail/${data?.id}`}>
                <h3 style={{ color: "#444", fontWeight: "500" }}>
                  {data?.title}
                </h3>
              </Link>
              <p
                style={{ margin: "10px 0px", color: "rgba(0, 0,0, 0.6)" }}
              >{`${data?.district}. ${data?.province}`}</p>
              <Flex
                align="center"
                style={{ width: "140px", color: "rgba(0, 0, 0, 0.6)" }}
              >
                <div>{data?.area} m²</div>
              </Flex>
              <Flex justify="space-between" style={{ marginTop: "40px" }}>
                <div style={{ color: "rgba(0, 0,0, 0.6)" }}>
                  {formatDate(dayjs(data?.createdDate))}
                </div>
                <Flex>
                  <Flex
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#444",
                      marginRight: "10px",
                    }}
                  >
                    <div style={{ marginRight: "10px" }}>
                      {formatCurrency(data?.price)}
                    </div>
                    <div>{data?.area} m²</div>
                  </Flex>
                  <Tooltip title={isFavorite(data.id) ? "Bỏ lưu" : "Lưu bài viết"}>
                    <Button
                      shape="circle"
                      style={{
                        color: "#ccc",
                        borderColor: `${isFavorite(data.id) ? "red" : "#ccc"}`,
                        backgroundColor: "#fafafa",
                      }}
                      icon={
                        isFavorite(data.id) ? (
                          <PiHeartFill
                            style={{ color: "red", borderColor: "red" }}
                          />
                        ) : (
                          <IoMdHeart />
                        )
                      }
                      onClick={() => {
                        handleSavePost(data.id);
                        setIsChange(!isChange);
                      }}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </div>
          </Flex>
          <Divider />
        </div>
      </div>
    );
  }
  if (option === OptionConst.SILVER) {
    labelText = "VIP Bạc";
    color = "#009BA1";
  } else if (option === OptionConst.GOLD) {
    labelText = "VIP Vàng";
    color = "#E3AA49";
  } else if (option === OptionConst.DIAMOND) {
    labelText = "VIP Kim Cương";
    color = "#E03C6D";
  }

  return (
    <>
      <LabelCardHorizon text={labelText} color={color}>
        <div
          style={{
            width: "720px",
            height: "150px",
            marginBottom: "60px",
            fontFamily: "__Lexend_126e48",
          }}
        >
          <Flex>
            <Link href={`/home/post/detail/${data?.id}`} style={{ flex: 3 }}>
              <img
                src={data?.firstImageUrl}
                alt="#"
                width={200}
                height={150}
                style={{ objectFit: "cover" }}
              />
            </Link>
            <div style={{ flex: 7 }}>
              <Link href={`/home/post/detail/${data?.id}`}>
                <h3 style={{ color: "#444", fontWeight: "500" }}>
                  {data?.title}
                </h3>
              </Link>
              <p
                style={{ margin: "10px 0px", color: "rgba(0, 0,0, 0.6)" }}
              >{`${data?.district}. ${data?.province}`}</p>
              <Flex
                align="center"
                style={{ width: "140px", color: "rgba(0, 0, 0, 0.6)" }}
              >
                <div>{data?.area} m²</div>
              </Flex>
              <Flex justify="space-between" style={{ marginTop: "40px" }}>
                <div style={{ color: "rgba(0, 0,0, 0.6)" }}>
                  {formatDate(dayjs(data?.createdDate))}
                </div>
                <Flex>
                  <Flex
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#444",
                        marginRight: "10px",
                      }}
                    >
                      {formatCurrency(data?.price)}
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontFamily: "__Lexend_126e48",
                        fontWeight: "600",
                        color: "#444",
                      }}
                    >
                      {data?.area} m²
                    </div>
                  </Flex>
                  <Tooltip title={isFavorite(data.id) ? "Bỏ lưu" : "Lưu bài viết"}>
                    <Button
                      shape="circle"
                      style={{
                        color: "#ccc",
                        borderColor: `${isFavorite(data.id) ? "red" : "#ccc"}`,
                        backgroundColor: "#fafafa",
                      }}
                      icon={
                        isFavorite(data.id) ? (
                          <PiHeartFill
                            style={{ color: "red", borderColor: "red" }}
                          />
                        ) : (
                          <IoMdHeart />
                        )
                      }
                      onClick={() => {
                        handleSavePost(data.id);
                        setIsChange(!isChange);
                      }}
                    />
                  </Tooltip>
                </Flex>
              </Flex>
            </div>
          </Flex>
          <Divider />
        </div>
      </LabelCardHorizon>
    </>
  );
};

export default PostHorizon;
