"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { CookieService } from "../shared/services/cookies.service";
import React from "react";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = !!CookieService.getAccessToken();

    useEffect(() => {
      if (!auth) {
        redirect("/auth/login");
      }
    }, [auth]);

    if (auth) {
      return null;
    }
    return <Component {...props} />;
  };
}
