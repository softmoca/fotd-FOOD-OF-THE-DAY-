"use client";
import { io } from "socket.io-client";

let socket: any;

function getAuthorizationHeader() {
  let accessToken;

  // 클라이언트 사이드에서만 sessionStorage 및 localStorage에 접근하도록 조건 추가
  if (typeof window !== "undefined") {
    accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      accessToken = localStorage.getItem("accessToken");
    }
  }

  return accessToken ? "Bearer " + accessToken : "";
}

export default socket;
