"use client";

import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    // <Spin
    //   size="large"
    //   tip="Đợi một chút ...."
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   {/* <Alert description=" adasdasd" message="Đợi một chút"></Alert> */}
    // </Spin>
    <div>Home page</div>
  );
};

export default HomePage;
