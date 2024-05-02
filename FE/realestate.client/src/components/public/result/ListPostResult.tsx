import Flex from "antd/es/flex";
import Button from "antd/es/button";
import Row from "antd/es/row";
import Col from "antd/es/col";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import React, { useState } from "react";
import PostCard from "@/components/public/post";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import PostHorizon from "../PostHorizon/post";
const ListPostResult = ({ data }: { data?: any }) => {
  const [loading, setLoading] = useState(false);
  const [statusLoadmore, setStatusLoadmore] = useState(true);
  const pathname = usePathname();

  return (
    <>
      <div style={{ margin: "50px 20px 0px 0px", width: "1050px" }}>
        <h2
          style={{
            marginBottom: "30px",
            fontSize: "24px",
            fontWeight: "500",
            marginLeft: "-15px",
          }}
        >
          {pathname.includes("nha-dat-ban")
            ? `Nhà đất bán giá rẻ tại Việt Nam ${dayjs(Date.now()).format(
                "MM/YYYY"
              )}`
            : `Nhà đất cho thuê giá rẻ tại Việt Nam ${dayjs(Date.now()).format(
                "MM/YYYY"
              )}`}
        </h2>
        <Row gutter={[24, 24]}>
          {data?.items?.map((item: any) => {
            return (
              <>
                <Link href={`/home/post/detail/${item?.id}`}>
                  <PostHorizon
                    key={item?.id}
                    data={item}
                    option={item?.options}
                    loading={loading}
                  />
                </Link>
              </>
            );
          })}
        </Row>
        {/* <div style={{ width: "100%", textAlign: "center", margin: "40px 0" }}>
          {data?.length >= 8 && (
            <Button size="large">
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
            </Button>
          )}
        </div> */}
      </div>
    </>
  );
};
export default ListPostResult;
