"use-client";
import React from "react";
import PostHorizon from "../PostHorizon/post";

const RecommendPost = () => {
  return (
    <div style={{ margin: "50px 0px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "30px", fontWeight: "500" }}>
        Gợi ý khác cho bạn
      </h2>
      <PostHorizon option={1} />
      <PostHorizon option={2} />
      <PostHorizon option={3} />
      <PostHorizon option={4} />
      <PostHorizon option={1} />
      <PostHorizon option={2} />
      <PostHorizon option={3} />
      <PostHorizon option={4} />
      <PostHorizon option={1} />
      <PostHorizon option={2} />
      <PostHorizon option={3} />
      <PostHorizon option={4} />
      <PostHorizon option={1} />
      <PostHorizon option={2} />
      <PostHorizon option={3} />
      <PostHorizon option={4} />
    </div>
  );
};

export default RecommendPost;
