"use client";
import isAuth from "@/app/isAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { UserType } from "@/shared/consts/userType";

const DashboardPage = () => {
  const router = useRouter();
  useEffect(() => {}, [router]);

  return <div>Dashboard</div>;
};

export default isAuth(DashboardPage, [UserType.ADMIN, UserType.CUSTOMER]);
