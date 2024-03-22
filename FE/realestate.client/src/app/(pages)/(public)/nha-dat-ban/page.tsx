"use client"
import RecommendPost from "@/components/public/LayoutComponent/HighlightPost";
import ResultSearch from "@/components/public/result";
import { SearchPost } from "@/services/post/post.service";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { Flex } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const searchParam = useSearchParams();
  const [data, setData] = useState();
  useEffect(() => {
    const params = {
      "area": searchParam?.get("area"),
      "keyword": searchParam?.get("keyword"),
      "postType": searchParam?.get("postType"),
      "price": searchParam?.get("price"),
      "province": searchParam?.get("province"),
      "realEstateType": searchParam?.get("realEstateType"),
    }
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );
    const searchPost = async (param: any) => {
      const res = await SearchPost(param);
      if (res.code === HTTP_STATUS_CODE.OK) {
        await setData(res?.data)
      }
    }
    searchPost(params)
  }, [searchParam]);
  return <Flex justify="center">
    <div style={{ width: '1050px' }}>
      <ResultSearch post={data} />
      <RecommendPost />
    </div>
  </Flex>;
};

export default Page;
