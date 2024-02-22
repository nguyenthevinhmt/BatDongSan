'use client'
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Spin, theme } from "antd";
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
      <Spin spinning size="large" fullscreen indicator={<LoadingOutlined style={{ fontSize: '35px', color: '#FF4D4F' }}/>}/>
    </div>
  );
};

export default LoadingComponent;
