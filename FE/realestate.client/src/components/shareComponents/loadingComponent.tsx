import { Alert, Flex, Spin } from "antd";
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
      <Spin size="large" tip="loading ..." />
      <span style={{ marginTop: "20px", color: "#ccc" }}>Loading... </span>
    </div>
  );
};

export default LoadingComponent;
