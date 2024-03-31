import React from "react";
import ListPostResult from "./ListPostResult";
import AnotherResult from "./AnotherResult";

const ResultSearch = ({ post }: any) => {
  return (
    <>
      {post?.items.length !== 0 ? (
        <div style={{ width: "1300px" }}>
          <ListPostResult data={post} />
        </div>
      ) : (
        <AnotherResult />
      )}
    </>
  );
};

export default ResultSearch;
