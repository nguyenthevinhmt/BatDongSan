"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from 'react-toastify';

export default function isAuth(Component: any, allowedRoles: number[] = []) {
  return function IsAuth(props: any) {
    const authStore = useSelector((state: RootState) => state.auth);
    const userToken = authStore.data.access_token;
    const role = authStore?.user?.data?.userType ?? 'guest';
    console.log("role", typeof(role))
    const [toastShown, setToastShown] = useState(false);
    // if (!userToken) {
    //   redirect("/auth/login");
    // }
    // if (allowedRoles.length > 0 && !allowedRoles.every((c: any) => c === role)) {
    //   toast.error('Tài khoản không có quyền truy cập');
    //   redirect("/");
    // }
    useEffect(() => {
      if (!userToken) {
        redirect("/auth/login");
      }

      if (allowedRoles.length > 0&& !allowedRoles.every((c: number) => c === role)) {
        if (!toastShown) {
          toast.error('Tài khoản không có quyền truy cập');
          setToastShown(true);
          redirect("/")
        }

        // Có thể chuyển hướng đến trang không có quyền truy cập ở đây nếu cần
        // redirect('/unauthorized');
      }
    }, [userToken, role, allowedRoles, toastShown]);

    return <Component {...props} />;
  };
}
