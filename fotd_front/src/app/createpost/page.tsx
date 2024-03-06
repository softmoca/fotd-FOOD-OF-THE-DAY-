/* eslint-disable @next/next/no-img-element */
"use client";

import { authUser } from "@/redux/thunkFunctions/userThunk";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { usePathname, useRouter } from "next/navigation";
import axiosInstance from "@/util/axios";
import { registerPost } from "@/redux/thunkFunctions/postThunk";

//  TODO <과 완료 부르면 바로 뒤 페이지로 이동하게
export default function Newpost() {
  let router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      postContent: "",
      password: "",
      passwordCheck: "",
      term: false,
    },
  });

  const dispatch = useDispatch();
  const isAuth = true;
  const [postImage, setPostImage] = useState<any>([]);

  const newPostContent = {
    required: "게시글 내용은 필수 요소입니다.",
  };

  const handleDrop = async (files: any) => {
    let formData = new FormData();

    const config = {
      headers: { "content-type": "multipart/form-data" }, // 헤더에 타입 명시
    };

    formData.append("image", files[0]); //file이라는 키와 files(파일들의 정보 객체) 값을 추가

    try {
      // 백엔드에서 위에서 생성한 config와 formdata 보내기
      const response = await axiosInstance.post(
        "/common/image",
        formData,
        config
      );

      console.log(response);
      setPostImage([response.data.path]);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = ({ postContent }: { postContent: string }) => {
    const body: { postContent: string; images?: any } = {
      postContent: postContent,
    };

    if (postImage.length > 0) {
      body.images = postImage;
    }

    //console.log(body);
    // console.log(body);
    dispatch(registerPost(body));
    setPostImage([]);
    reset(); //react-hook-form으로 입력후 입력값 초기화
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div>
      {isAuth ? (
        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" text-xl font-bold flex  justify-between items-center">
              <div>{""}</div>
              <h1 className="text-xl font-bold">글쓰기 </h1>

              <button
                type="submit"
                className="w-1/6 px-2 py-2 border bg-red-300 rounded-md"
              >
                완료
              </button>
            </div>

            <div className="text-xl font-bold flex  justify-between items-centemb p-5 ">
              <div className="flex">
                {" "}
                <Dropzone onDrop={handleDrop}>
                  {(
                    { getRootProps, getInputProps } //Dropzone 에서 가져온 인자들
                  ) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="text-7xl">📷</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            </div>
            <div>
              {postImage.length > 0 && (
                <img
                  className="min-w-[100px] h-[100px]"
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/public/temp/${postImage}`}
                  alt="image"
                />
              )}
            </div>
            <input
              placeholder="내용을 입력하세요.."
              type="postContent"
              id="postContent"
              className="w-full h-32 border rounded-md px-4 py-2 mt-2  bg-white "
              {...register("postContent", newPostContent)}
            ></input>
            {errors?.postContent && (
              <div>
                <span className="text-red-500">
                  {errors.postContent.message}
                </span>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div> 로그인을 해야 글을 작성할 수 있습니다.</div>
      )}
    </div>
  );
}
