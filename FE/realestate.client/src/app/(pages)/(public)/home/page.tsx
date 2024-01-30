"use client";

import { RootState, AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  return <div>Home page</div>;
};

export default HomePage;
