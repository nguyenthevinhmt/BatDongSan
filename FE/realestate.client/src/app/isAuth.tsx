"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { CookieService } from "../shared/services/cookies.service";
import React from "react";
import { GetServerSidePropsContext } from "next";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    // const auth = CookieService.getAccessToken();
    // console.log("cookie", auth);
    const { token, context, message } = props; // Access token from props passed by getServerSideProps

    if (!token) {
      console.log("không có token", message);
      return null; // If token is not present, render nothing (already redirected)
    }
    // useEffect(() => {
    //   if (!auth) {
    //     console.log("Hàm này chạy rồi");
    //     redirect("/auth/login");
    //   }
    // }, [auth]);

    // if (auth) {
    //   return null;
    // }
    return <Component {...props} />;
  };
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  console.log("This is a log from getServerSideProps");
  console.log("req", req);
  const token1 = CookieService.getAccessToken();
  // Lấy cookie từ request
  const token = req.cookies.access_token;
  console.log("token1", token1);

  // Trả về props với token để sử dụng trong component
  return {
    props: {
      token,
      context,
      message: `Next.js is awesome`,
    },
  };
}
