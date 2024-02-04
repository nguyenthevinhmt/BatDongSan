import { Spin } from "antd";
import React from "react";

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Spin size="large" />
      <span
        style={{ marginTop: "20px", color: "#aaa", fontFamily: "sans-serif" }}
      >
        Đợi một chút ...
      </span>
    </div>
  );
};

export default LoadingComponent;
