import { GetListPostNewest } from "@/services/post/post.service";
import { HTTP_STATUS_CODE } from "@/shared/consts/http";
import React, { useEffect, useState } from "react";
import ListPostResult from "./ListPostResult";

const AnotherResult = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await GetListPostNewest();
      if (response?.code === HTTP_STATUS_CODE.OK) {
        await setData(response?.data);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div style={{ width: "1300px" }}>
      <ListPostResult data={data} />
    </div>
  );
};

export default AnotherResult;
