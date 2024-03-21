'use client'
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchPost } from "@/services/post/post.service";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import HighlightPost from "@/components/public/LayoutComponent/HighlightPost";
import { Flex } from "antd";
import ResultSearch from "@/components/public/result";
import RecommendPost from "@/components/public/LayoutComponent/HighlightPost";

const Pages = () => {
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
      const res = await SearchPost(filteredParams);
      if (res.code === HTTP_STATUS_CODE.OK) {
        await setData(res?.data)
        console.log("data", res?.data)
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

export default Pages;
