"use client";
import isAuth from "@/app/isAuth";
import { UserType } from "@/shared/consts/userType";
import React from "react";

const Post = () => {
  return <div>Danh sách bài viết</div>;
};

export default isAuth(Post, [UserType.ADMIN, UserType.CUSTOMER]);
