"use client";
import isAuth from "@/app/isAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {
    //const checkAuth = Cookies.get("access_token");
    // console.log(checkAuth);
    // if (!checkAuth) {
    //   // router.replace("/auth/login");
    // }
  }, [router]);

  return <div>Dashboard</div>;
};

// export default isAuth(DashboardPage);
export default DashboardPage;
