/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import MyCommentItem from "@/components/mycommentItem";
import MyPostItem from "@/components/mypostItem";
import Navbar from "@/components/navbar";
import PostItem from "@/components/postItem";
import { authUser, getUserData } from "@/redux/thunkFunctions/userThunk";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();

  const [CommentsButton, setCommentsButton] = useState(false);
  const [PostsButton, setPostsButton] = useState(false);

  useEffect(() => {
    dispatch(getUserData()); //thucnk 함수 이름은 authUser
  }, []); // 권한이 바뀌거나 or url경로가 바뀌거나

  const userProfileData = useSelector(
    (state: any) => state.persistedReducer.user.userProfileData
  );
  // console.log(userProfileData);
  // console.log(userProfileData.postComments);
  // console.log(userProfileData);

  const logOutClick = async () => {
    localStorage.removeItem("accessToken");
  };
  const postClick = async () => {
    setPostsButton((prevPostsButton) => !prevPostsButton);
  };
  const commentClick = async () => {
    setCommentsButton((prevCommentsButton) => !prevCommentsButton);
  };

  return (
    <div>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <div className=" flex mt-4 mb-5 ">
        <div className=" border-2 rounded-xl">
          <img
            className=" w-[60px] h-[50px] rounded-full "
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/public/userProfileDefault.png`}
            alt="익명 사용자"
          />
        </div>
        <div>
          <div className="ml-3 text-xl font-extrabold">{`${userProfileData.email}`}</div>
          <div className="ml-3  font-bold text-gray-800  ">{`${userProfileData.nickName}`}</div>
        </div>
      </div>

      <div className=" mb-10  font-bold bg-gray-100 rounded-md shadow-md w-1/3">
        <h1 className="text-2xl font-extrabold mt-1"> </h1>
        <button onClick={postClick}>
          <h1 className="mb-1 text-2xl font-extrabold "> 나의 게시물</h1>
        </button>{" "}
        {PostsButton && ( // CommentsButton이 true일 때에만 아래의 내용을 렌더링
          <div>
            {userProfileData.posts.length === 0 ? (
              <p></p>
            ) : (
              userProfileData.posts.map((dpost: any) => (
                <MyPostItem dpost={dpost} key={dpost.id} />
              ))
            )}
          </div>
        )}
        <br></br>
        <button onClick={commentClick}>
          <h1 className="mb-1 text-2xl font-extrabold "> 나의 댓글</h1>
        </button>{" "}
        {CommentsButton && ( // CommentsButton이 true일 때에만 아래의 내용을 렌더링
          <div>
            {userProfileData.postComments.length === 0 ? (
              <p></p>
            ) : (
              userProfileData.postComments.map((dcomment: any) => (
                <MyCommentItem dcomment={dcomment} key={dcomment.id} />
              ))
            )}
          </div>
        )}
        <br></br>
        <button onClick={logOutClick}>
          <Link href="/">
            <h1 className="mb-1 text-2xl font-extrabold "> 로그아웃</h1>
          </Link>{" "}
        </button>
      </div>
    </div>
  );
}
