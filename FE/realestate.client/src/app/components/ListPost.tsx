import Flex from "antd/es/flex";
import Button from "antd/es/button";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Typography from "antd/es/typography";
import { 
  IoIosArrowDown, 
  IoIosArrowForward 
} from "react-icons/io";
import React, { 
  useState, 
  useEffect 
} from "react";
import PostCard from "@/components/public/post";
import Link from "next/link";
import { recommendPost } from "@/services/post/post.service";

const ListPost = () => {
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
  useEffect(() => {
    const fetchPublicPost = async () => {
      const params = {
        pageSize: 8,
        pageNumber: 1
      }
      const response = await recommendPost(params);
      return response
    }
    const response = fetchPublicPost()
    console.log("object", response)
  });

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
      <div style={{ margin: "50px 20px 0px 0px" }}>
        <h2 style={{ marginBottom: "30px", fontSize: '24px', fontWeight: '500' }} className="">Bất động sản dành cho bạn</h2>
        <Row gutter={[24, 24]}>
          {quantity.slice(0, visibleProducts).map((item, index) => {
            return (
              <Col span={6} key={Math.random()}>
                <Link href={`posts/detail/${index}`}>
                  <PostCard option={3} loading={loading} />
                </Link>
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
              <a href="/list-post">
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