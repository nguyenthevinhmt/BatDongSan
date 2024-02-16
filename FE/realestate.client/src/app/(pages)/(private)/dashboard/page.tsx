'use client'
// import isAuth from "@/app/isAuth";
import isAuth from "@/app/isAuth";
import { RootState } from "@/redux/store";
import { CookieService } from "@/shared/services/cookies.service";
import withTheme from "@/theme";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = CookieService.getAccessToken();
    console.log(checkAuth)
    if (checkAuth === undefined) {
      router.replace("/auth/login");
    }
  }, [router]); 

  return <div>Dashboard</div>;
};


export default DashboardPage;
// export default withTheme(DashboardPage);
// export async function getServerSideProps() {
//   // const { req } = context;
//   const token = CookieService.getAccessToken();
//   // const providers = await getProviders()
//   if (token) {
//       return {
//           redirect: { destination: "/auth/login" },
//       };
//   }
  
//   // return {
//   //     props: {
//   //         providers,
//   //     },
//   // }
//   return 0;
// }
