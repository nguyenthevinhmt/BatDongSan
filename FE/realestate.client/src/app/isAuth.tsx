"use client";
import React from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { CookieService } from "@/shared/services/cookies.service";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const token = CookieService.getAccessToken();
    console.log("token", token);
    if (!token) {
      router.replace("/auth/login");
    }
    return <Component {...props} />;
  };
}
