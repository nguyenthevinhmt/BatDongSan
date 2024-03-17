import {
  Skeleton,
  Card,
  Flex,
  Button,
  Row,
  Col,
  Tooltip,
  Typography,
} from "antd";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import React, { useState, useEffect } from "react";
import {
  LineOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import PostCard from "@/components/public/post";

const ListPost = () => {
  const { Meta } = Card;
  const [loading, setLoading] = useState(true);
  const [heart, setHeart] = useState(true);
  const [quantity, setQuantity] = useState([
    {
      id: 1,
      name: "hsgcd gdbc dwigihfgbvf giv fi vhie giv fig bvie eckie eikvc ki vcus vcv fskv cuev fu",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "cdy",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
    {
      name: "ok",
    },
  ]);
  const [statusLoadmore, setStatusLoadmore] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(8);
  useEffect(() => {
    visibleProducts === 16 && setStatusLoadmore(false);
  }, [visibleProducts]);

  const onLoadMore = () => {
    visibleProducts < 16 &&
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  const onChange = () => {
    setHeart(!heart);
  };
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  const { Text } = Typography;

  return (
    <>
      <div style={{ margin: "50px 0" }}>
        <h2 style={{ marginBottom: "20px" }}>Bất động sản dành cho bạn</h2>
        <Row gutter={[24, 24]}>
          {quantity.slice(0, visibleProducts).map((item, index) => {
            return (
              <Col span={6} key={Math.random()}>
                <a href={`posts/detail/${index}`}>
                  <PostCard option={3} loading={loading} />
                </a>
              </Col>
            );
          })}
        </Row>
        <div style={{ width: "100%", textAlign: "center", margin: "40px 0" }}>
          <Button size="large" onClick={onLoadMore}>
            {statusLoadmore ? (
              <Flex align="center" justify="space-between">
                <span>Mở rộng</span> <IoIosArrowDown />
              </Flex>
            ) : (
              <a href="/auth/register">
                <Flex align="center" justify="space-between">
                  <span>Xem tiếp</span>
                  <IoIosArrowForward />
                </Flex>
              </a>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};
export default ListPost;
