// "use client";
import React from "react";

import { NextPage } from "next";
import LoginForm from "./component/LoginForm";

const Page: NextPage = async() => {
  return (
    <LoginForm/>
  );
};

export default Page;
