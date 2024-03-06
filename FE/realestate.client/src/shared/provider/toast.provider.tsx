"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        toastStyle={{
          top: "100px",
        }}
        autoClose={3000}
        hideProgressBar={true}
        draggable={false}
        closeOnClick
      />
    </>
  );
}
