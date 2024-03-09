"use client";
import React from "react";
import { useRouter } from "next/navigation";
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

// "use client";
// import { useEffect, useState } from "react";
// import { redirect } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";

// export const ProtectedRoutes = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [showLoading, setShowLoading] = useState(true);
//   const dispatch = useAppDispatch();
//   const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

//   useEffect(() => {
//     async function checkAuth() {
//       if (!isAuthenticated && localStorage.getItem("access") !== null) {
//         try {
//           await refreshToken();
//           await verify();

//           const user = await userLogged();
//           dispatch(loginRedux(user));
//         } catch (error: any) {
//           localStorage.removeItem("access");
//           localStorage.removeItem("refresh");

//           console.log(error.response.data);
//         }
//       } else {
//         setShowLoading(false);
//       }
//     }
//     checkAuth();
//   }, [isAuthenticated, isLoading]);

//   if (showLoading) return <Loading />;
//   if (!isAuthenticated && isLoading) return redirect("/login");

//   return <>{children}</>;
// };
