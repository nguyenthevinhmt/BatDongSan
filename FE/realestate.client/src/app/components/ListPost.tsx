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

const ListPost = ({ post }: any) => {
  const [loading, setLoading] = useState(false);
  const [heart, setHeart] = useState(true);
  const [listPost, setListPost] = useState<any>([]);
  const [statusLoadmore, setStatusLoadmore] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    visibleProducts === 16 && setStatusLoadmore(false);
  }, [visibleProducts]);
  useEffect(() => {
    setLoading(true)
    const fetchPublicPost = async () => {
      const params = {
        pageSize: 8,
        pageNumber: pageNumber,
      };
      const response = await recommendPost(params);
      setListPost((prev: any) => {
        return [...listPost,
        ...response.data?.items]
      })
      setLoading(false)
      return response;
    };
    fetchPublicPost();
  }, [pageNumber]);

  const onLoadMore = () => {
    setPageNumber((value) => {
      return value + 1
    });
    setStatusLoadmore(false);
  };

  return (
    <>
      <div style={{ margin: "50px 20px 0px 0px", width: '1050px' }}>
        <h2
          style={{ marginBottom: "30px", fontSize: "24px", fontWeight: "500" }}
        >
          Bất động sản dành cho bạn
        </h2>
        <Row gutter={[24, 24]}>
          {listPost?.map((item: any) => {
            return (
              <Col span={6} key={Math.random()}>
                <Link href={`posts/detail/${item?.id}`}>
                  <PostCard option={item?.options} loading={loading} />
                </Link>
              </Col>
            );
          })}
        </Row>
        <div style={{ width: "100%", textAlign: "center", margin: "40px 0" }}>
          {listPost?.length >= 8 && <Button size="large" onClick={onLoadMore}>
            {statusLoadmore ? (
              <Flex align="center" justify="space-between">
                <span>Mở rộng</span> <IoIosArrowDown />
              </Flex>
            ) : (
              <Link href="/list-post">
                <Flex align="center" justify="space-between">
                  <span>Xem tiếp</span>
                  <IoIosArrowForward />
                </Flex>
              </Link>
            )}
          </Button>}

        </div>
      </div>
    </>
  );
};
export default ListPost;
