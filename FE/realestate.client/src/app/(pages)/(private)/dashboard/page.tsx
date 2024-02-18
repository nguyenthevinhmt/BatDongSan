"use client";
import isAuth from "@/app/isAuth";
import { RootState } from "@/redux/store";
import { CookieService } from "@/shared/services/cookies.service";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = CookieService.getAccessToken();
    // console.log(checkAuth);
    if (!checkAuth) {
      // router.replace("/auth/login");
    }
  }, [router]);

  return <div>Dashboard</div>;
};

export default isAuth(DashboardPage);
// export default DashboardPage;
