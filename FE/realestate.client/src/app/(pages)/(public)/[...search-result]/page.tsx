"use client";
import SlideSecond from "@/app/components/detailComponent/SlideSecond";
import AreaFilter from "@/components/public/FilterComponent/AreaFilter";
import { AreaConst } from "@/components/public/FilterComponent/DataConst/AreaConst";
import {
  PriceRentConst,
  PriceSaleConst,
} from "@/components/public/FilterComponent/DataConst/PriceConst";
import PriceFilter from "@/components/public/FilterComponent/PriceFilter";
import RecommendPost from "@/components/public/LayoutComponent/HighlightPost";
import ResultSearch from "@/components/public/result";
import AnotherResult from "@/components/public/result/AnotherResult";
import { SearchPost } from "@/services/post/post.service";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import { FilterOutlined } from "@ant-design/icons";
import Flex from "antd/lib/flex";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import QC3 from "@/assets/image/QC3.png";

const SearchResult = () => {
  const searchParam = useSearchParams();
  const [data, setData] = useState<any>();
  
  useEffect(() => {
    const params = {
      keyword: searchParam?.get("keyword"),
      postType: searchParam?.get("postType"),
      startPrice: searchParam?.get("startPrice"),
      endPrice: searchParam?.get("endPrice"),
      startArea: searchParam?.get("startArea"),
      endArea: searchParam?.get("endArea"),
      province: searchParam?.get("province"),
      realEstateType: searchParam?.get("realEstateType"),
    };

    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    );

    const searchPost = async (param: any) => {
      const res = await SearchPost(param);
      if (res.code === HTTP_STATUS_CODE.OK) {
        await setData(res?.data);
      }
    };
    searchPost(filteredParams);
  }, [searchParam]);

  return (
    <Flex justify="center">
      <div style={{ width: "1050px" }}>
        <Flex>
          <ResultSearch post={data} />
          <Flex vertical gap={10} style={{ margin: "60px 0px 0px -120px" }}>
            <div>
              Bộ lọc <FilterOutlined />
            </div>
            <PriceFilter
              data={
                searchParam?.get("postType") == "1"
                  ? PriceSaleConst
                  : PriceRentConst
              }
            />
            <AreaFilter data={AreaConst} />
          </Flex>
        </Flex>
        
        <div>
          <Image src={QC3} alt='' width={1120} height={200} style={{ objectFit: "cover", margin: '20px 0' }} />
        </div>

        <div style={{width: '100%'}}>
          <SlideSecond />
        </div>
        {/* <RecommendPost /> */}
      </div>
    </Flex>
  );
};

export default SearchResult;
