"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover // hover시 멈춤
        autoClose={1500} //1.5초간 지속
      />
    </>
  );
}
