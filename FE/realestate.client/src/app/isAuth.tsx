"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

export default function isAuth(Component: any, allowedRoles: number[] = []) {
  return function IsAuth(props: any) {
    const authStore = useSelector((state: RootState) => state.auth);
    const userToken = authStore.data.access_token;
    const role = authStore?.user?.data?.userType;
    const [toastShown, setToastShown] = useState(false);
    useEffect(() => {
      console.log("userToken", userToken);
      if (!userToken) {
        redirect("/auth/login");
      }

      if (
        allowedRoles.length > 0 &&
        allowedRoles.every((c: any) => c === role)
      ) {
        if (!toastShown) {
          toast.error("Tài khoản không có quyền truy cập");
          setToastShown(true);
          redirect("/");
        }
      }
    }, [userToken, role, toastShown]);

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
