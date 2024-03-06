/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function CommentItem({ dcomment }: any) {
  const commnetNickName = dcomment?.author?.nickName;

  const commentContent = dcomment?.commentContent;

  return (
    <div className=" border-b rounded mb-2">
      <div className=" flex mt-2">
        <div>
          <div className="ml-3 text-sm font-extrabold">{`${commnetNickName}`}</div>
        </div>
      </div>
      <div className="mt-2 ml-2 font-normal "> {`${commentContent}`}</div>
    </div>
  );
}
