/* eslint-disable @next/next/no-img-element */
"use client";

import { loginUser } from "@/redux/thunkFunctions/userThunk";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Signin() {
  let router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      term: false,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      // 페이지에서 입력한 값
      const body = {
        email: email,
        password: password,
      };

      // dispatch 함수 호출
      await dispatch(loginUser(body));
      const storedLocalStorageJWT = localStorage.getItem("accessToken");

      if (storedLocalStorageJWT) {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }

      reset(); // react-hook-form으로 입력 후 입력값 초기화
    } catch (error) {
      console.error("에러 발생: ", error);
    }
  };

  const userEmail = {
    required: "필수 필드입니다.",
  };

  const userPassword = {
    required: "필수 필드입니다.",
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,}$/,
      message: "영어와 숫자 조합으로 4글자 이상으로 입력해주세요",
    },
  };

  return (
    <section className="flex flex-col justify-center m-3 max-w-[400px]  border rounded-lg">
      <div>
        <img
          src="/FOTDLogo.png"
          alt="FOTD Logo"
          className="mx-auto my-2 w-40 h-15 mb-10"
        />

        <div className="ml-10 mb-10">
          <h1 className="text-lg">
            <span className="font-bold">학교별로 소통해보세요.</span>
          </h1>

          <h1 className="text-lg ">
            <span className="font-bold">
              친구들이 오늘은 무슨 메뉴를 선택 했을까요 ?
            </span>
          </h1>
        </div>

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center mb-3">
            <label //입력 요소와 텍스트를 연결하는 데 사용 되는 label 태그
              htmlFor="email" //htmlFor 속성은 레이블이 연결된 입력 요소의 ID를 지정
              className="text-sm font-semibold text-gray-800"
            >
              이메일
            </label>
            <input
              placeholder="이메일을 입력해주세요."
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border bg-white rounded-md" //px 외부 여백 py 내부 여백 상하좌우
              {...register("email", userEmail)} //register() 함수의 반환값은 객체이기 때문에 ... 사용 첫번째 인자는 type
            ></input>
            {errors?.email && (
              <div>
                <span className="text-red-500 px-2 py-2 mt-1 text-sm">
                  {errors.email.message}
                </span>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-800"
            >
              비밀번호
            </label>
            <input
              placeholder="영어와 숫자 조합으로 4글자 이상으로 입력해주세요."
              type="password"
              id="pasword"
              className="w-full px-4 py-2 mt-1 border bg-white rounded-md"
              {...register("password", userPassword)}
            ></input>
            {errors?.password && ( //? 는 옵셔널 체크 연산자, password 라는 속성이 없으면 undefined
              <div>
                <span className="text-red-500 px-2 py-2 mt-1 text-sm">
                  {errors.password.message}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3">
            <button
              type="submit" //duration hover시 색상 애니이션 지속시간
              className="w-full px-4 py-2 text-white duration-200 bg-black border  hover:bg-gray-700 rounded"
            >
              로그인
            </button>
          </div>
        </form>

        <small className=" flex justify-center text-sm">
          <Link href="/findemail" className="text-gray-300 mr-1 ">
            아이디 찾기
          </Link>

          <Link href="/findpassword" className="text-gray-300 ">
            | 비밀번호 찾기
          </Link>
        </small>

        <button className="mt-3 w-full  px-4 py-2  font-bold text-white bg-gray-300 border border-gray-300 rounded">
          <Link
            href="/signup"
            className=" t font-bold text-white  bg-gray-300 border border-gray-300 "
          >
            회원가입
          </Link>
        </button>
      </div>
    </section>
  );
}
