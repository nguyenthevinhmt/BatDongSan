"use client";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function isAuth(Component: any) {
  
  return function IsAuth(props: any) {
    // const authSelector = useSelector((state:RootState) => {
    //   state.auth
    // });
    // // const router = useRouter();
    // console.log("authSelector", authSelector)
    // if(authSelector){
    // }
    // const repo = await getServerSideProps()
    // console.log(repo)
    // repo.then((data) => {
    //   return data
    // });
    // const {props} = repo
    // if (!data) {
      // console.log("không có token", token);
    //   return null;
    // }
    // useEffect(() => {
    //   if (!auth) {
    //     console.log("Hàm này chạy rồi");
    //     redirect("/auth/login");
    //   }
    // }, [auth]);

    // if (auth) {
    //   return null;
    // }
    return <Component {...props} />;
  };
}
async function getServerSideProps()
{
  const res = await axios.get('api/get-cookie');
  console.log(res)
  return res.data
}