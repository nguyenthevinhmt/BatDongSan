"use client";
import React from "react";
import "@/app/(pages)/(private)/styles/style.layout.css";
import { UserType } from "@/shared/consts/userType";
import isAuth from "@/app/isAuth";
import CreateEditForm from "../components/create-edit-form";

const CreatePost = () => {
  return (
    <>
      <CreateEditForm />
    </>
  );
};

export default isAuth(CreatePost, [UserType.ADMIN, UserType.CUSTOMER]);
