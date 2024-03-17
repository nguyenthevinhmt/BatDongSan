"use client";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

export default function isAuth(Component: any, allowedRoles: number[] = []) {
  return function IsAuth(props: any) {
    const router = useRouter();
    const authStore = useSelector((state: RootState) => state.auth);
    const userToken = authStore.data.access_token;
    const role = authStore?.user?.data?.userType;
    const [toastShown, setToastShown] = useState(false);
    useEffect(() => {
      if (!userToken) {
        redirect("/auth/login");
      }

      if (
        allowedRoles.length > 0 &&
        allowedRoles.every((c: any) => c !== role)
      ) {
        if (!toastShown) {
          setToastShown(true);
          toast.error("Tài khoản không có quyền truy cập");
          setTimeout(() => {
            router.replace("/");
          }, 500);
        }
      }
    }, [userToken, role, toastShown, router]);

    return <Component {...props} />;
  };
}
