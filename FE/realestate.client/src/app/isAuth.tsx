"use client";
import React from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const token = Cookies.get("access_token");
    if (!token) {
      redirect("/auth/login");
    }
    return <Component {...props} />;
  };
}
