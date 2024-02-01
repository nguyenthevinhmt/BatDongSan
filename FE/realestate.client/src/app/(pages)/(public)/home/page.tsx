"use client";

import { RootState, AppDispatch } from "@/redux/store";
import { Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Spin
      size="large"
      tip="Đợi một chút ...."
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Alert description=" adasdasd" message="Đợi một chút"></Alert> */}
      <div>Home page</div>;
    </Spin>
  );
};

export default HomePage;
