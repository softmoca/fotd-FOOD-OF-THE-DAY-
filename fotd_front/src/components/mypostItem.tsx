"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommentItem from "./commentItem";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "@/redux/thunkFunctions/commentThunk";
import axiosInstance from "@/util/axios";
import { toast } from "react-toastify";

export default function MyPostItem({ dpost }: any) {
  // setComments(dpost.comments);
  //console.log(dpost);

  const deletePostClick = async () => {
    try {
      const response = await axiosInstance.delete(
        `/post/${dpost.id}` //백엔드 api url
      );
      toast.info("게시글이 삭제되었습니다.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("에러 발생:", error);
      toast.error("게시글 삭제에 실패하였습니다. ");
    }
  };
  return (
    <div className="   border rounded-lg overflow-hidden p-5 mt-5 ml-2   ">
      <button
        onClick={deletePostClick}
        className="  p-1 text-sm text-white duration-200 bg-black rounded-md  hover:bg-gray-700 "
      >
        {" "}
        삭제하기
      </button>
      {dpost?.images?.length > 0 && (
        <img
          className="w-full rounded-xl  mb-1"
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${dpost?.images[0]?.path}`}
          alt="image"
        />
      )}

      <p>
        {" "}
        <span className="text-xl font-bold mr-3"> {dpost.author.nickName}</span>
        <span className="text-xl "> {dpost.postContent} </span>
      </p>
    </div>
  );
}
