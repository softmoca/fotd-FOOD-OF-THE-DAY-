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

export default function PostItem({ dpost }: any) {
  const [CommentsButton, setCommentsButton] = useState(false);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [commnets, setComments] = useState<Array<any>>([]);
  // setComments(dpost.comments);
  //console.log(dpost);
  const createdAt = dpost.createdAt;

  const month_day = createdAt.slice(5, 10).replace("-", "/");
  const hour_minute = createdAt.slice(11, 16);

  const getCommentsF = async () => {
    setCommentsButton((prevCommentsButton) => !prevCommentsButton);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axiosInstance.post(
        `/post/${dpost.id}/comment`, //백엔드 api url
        { commentContent: inputValue }
      );
      toast.info("댓글이 작성되었습니다.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("에러 발생:", error);
      toast.error("로그인 후 이용해 주세요 ~ ! ");
    }
  };

  return (
    <div className="   border rounded-lg overflow-hidden p-5 mt-5 ml-2  w-1/3  ">
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

      <button onClick={getCommentsF}>
        <p className=" text-xs ">
          {dpost.commentCount !== 0 && ( // commentCount가 0이 아닌 경우에만 렌더링
            <span className="mr-3 text-sky-400 font-bold">
              💬 {dpost.commentCount}{" "}
              <span className="text-gray-400"> 개 모두 보기</span>
            </span>
          )}
        </p>
      </button>

      {CommentsButton && ( // CommentsButton이 true일 때에만 아래의 내용을 렌더링
        <div>
          {dpost.comments.length === 0 ? (
            <p></p>
          ) : (
            dpost.comments.map((dcomment: any) => (
              <CommentItem dcomment={dcomment} key={dcomment.id} />
            ))
          )}
        </div>
      )}
      <div className="flex flex-grow">
        <input
          className=" p-1  flex-grow w -full text-sm  border bg-white rounded-md"
          placeholder="댓글 추가..."
          type="comment"
          id="comment"
          onChange={handleInputChange}
          value={inputValue}
        />

        <button
          onClick={handleButtonClick}
          className="ml-2  text-white duration-200 bg-black   hover:bg-gray-700 rounded"
        >
          댓글 입력
        </button>
      </div>
    </div>
  );
}
