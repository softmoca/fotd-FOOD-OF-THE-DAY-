/* eslint-disable @next/next/no-img-element */
import axiosInstance from "@/util/axios";
import React from "react";
import { toast } from "react-toastify";

export default function MyCommentItem({ dcomment }: any) {
  const commnetNickName = dcomment?.author?.nickName;

  const commentContent = dcomment?.commentContent;

  const deleteCommentClick = async () => {
    try {
      const response = await axiosInstance.delete(
        `/post/${dcomment.post.id}/comment/${dcomment.id}` //백엔드 api url
      );
      toast.info("댓글이 삭제되었습니다.");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("에러 발생:", error);
      toast.error("댓글 삭제에 실패하였습니다. ");
    }
  };

  return (
    <div className=" border-b rounded mb-2">
      <button
        onClick={deleteCommentClick}
        className="  p-1 text-sm text-white duration-200 bg-black rounded-md  hover:bg-gray-700 "
      >
        {" "}
        삭제하기
      </button>
      <div className=" flex mt-2">
        <div>
          <div className="ml-3 text-sm font-extrabold">{`${commnetNickName}`}</div>
        </div>
      </div>
      <div className="mt-2 ml-2 font-normal "> {`${commentContent}`}</div>
    </div>
  );
}
