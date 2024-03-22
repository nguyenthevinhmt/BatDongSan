"use-client";
import React from "react";
import ListPostHorizon from "../PostHorizon/ListPostHorizon";

const RecommendPost = () => {
  return (
    <div style={{ margin: "50px 0px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "30px", fontWeight: "500" }}>
        Gợi ý khác cho bạn
      </h2>
      <ListPostHorizon />
    </div>
  );
};

export default RecommendPost;
