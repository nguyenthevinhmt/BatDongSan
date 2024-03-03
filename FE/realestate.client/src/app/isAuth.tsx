"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const store = useSelector((state: RootState) => state.auth);
    const userToken = store.data.access_token;
    if (!userToken) {
      redirect("/auth/login");
    }
    return <Component {...props} />;
  };
}
