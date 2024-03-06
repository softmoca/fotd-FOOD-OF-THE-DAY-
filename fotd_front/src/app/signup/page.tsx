/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { registerUser } from "@/redux/thunkFunctions/userThunk";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function RegisterPage() {
  let router = useRouter();
  const dispatch = useDispatch();
  const [emailPass, setEmailPass] = useState(false);
  const [nickNamePass, setNickNamePass] = useState(false);

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
      email: "",
      nickName: "",
      password: "",
      passwordCheck: "",
      university: "광운대학교",
      term: false,
    },
  });

  useEffect(() => {
    if (
      watch("password") !== watch("passwordCheck") &&
      watch("passwordCheck")
    ) {
      setError("passwordCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다",
      });
    } else {
      // 비밀번호 일치시 오류 제거
      clearErrors("passwordCheck");
    }
  }, [watch("password"), watch("passwordCheck")]);

  const onSubmit = ({
    email,
    password,
    nickName,
    university,
  }: {
    email: string;
    password: string;
    nickName: string;
    university: string;
  }) => {
    // 페이지에서 입력 한 값
    const body = {
      email: email,
      password: password,
      nickName: nickName,
      university: university,
    };

    if (emailPass && nickNamePass) {
      dispatch(registerUser(body));
      // reset(); //react-hook-form으로 입력후 입력값 초기화

      setTimeout(() => {
        router.push("/signin");
      }, 500);
    } else {
      toast.error(" 중복 체크들를 먼저 해주세요 !");
    }

    // reset(); //react-hook-form으로 입력후 입력값 초기화
  };

  const emailCheck = async () => {
    const emailValue = watch("email");
    console.log(emailValue);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/checkEmail`, //백엔드 api url
        { email: emailValue }
      );

      if (response.data.success) {
        setEmailPass(true);
        toast.info("이메일 사용 가능합니다 ! !");
      }
    } catch (error: any) {
      setEmailPass(false);
      toast.error(error.response.data.message[0]);
    }
  };

  const nickNameCheck = async () => {
    const nickNameValue = watch("nickName");
    console.log(nickNameValue);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/checkNickName`, //백엔드 api url
        { nickName: nickNameValue }
      );

      if (response.data.success) {
        setNickNamePass(true);
        toast.info("닉네임 사용 가능합니다 ! !");
      }
    } catch (error: any) {
      setNickNamePass(false);
      toast.error(error.response.data.message[0]);
    }
  };

  const userEmail = {
    required: "필수 필드입니다.",
  };
  const usernickName = {
    required: "필수 필드입니다.",
  };

  const userPassword = {
    required: "필수 필드입니다.",
    pattern: {
      value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,}$/,
      message: "영어와 숫자 조합으로 4글자 이상으로 입력해주세요",
    },
  };

  const userPasswordCheck = {
    required: "필수 필드입니다.",
    validate: {
      matchPassword: (value: any) => {
        const { password } = getValues();
        return password === value || "비밀번호가 일치하지 않습니다";
      },
    },
  };

  const useruniversity = {
    required: "필수 필드입니다.",
  };

  return (
    <section className="flex flex-col justify-center m-3  max-w-[400px] border rounded-lg">
      <div className=" bg-white rounded-md board">
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-1 font-semibold ">대학교</h1>
          <select
            id="university"
            className="  border mb-3 border-gray-300 rounded "
            {...register("university", useruniversity)}
          >
            <option value="광운대학교">광운대학교</option>
            <option value="영철대학교">영철대학교</option>
            <option value="호그와트">호그와트</option>
            <option value="서울대학교">서울대학교</option>
            <option value="연세대학교">연세대학교</option>
            <option value="고려대학교">고려대학교</option>
            <option value="하버드대학교">하버드대학교</option>
            <option value="스텐퍼드대학교">스텐퍼드대학교</option>
          </select>

          <div className="mb-3">
            <label htmlFor="name" className="font-semibold  text-gray-800">
              닉네임
            </label>
            <div className="flex item-center">
              {" "}
              <div>
                {" "}
                <input
                  placeholder="닉네임을 입력해주세요."
                  type="nickName"
                  id="nickName"
                  className=" px-4 py-2 mt-1 text-sm border bg-white rounded-md mr-2 flex-grow"
                  {...register("nickName", usernickName)}
                ></input>
              </div>
              <button
                type="button"
                onClick={nickNameCheck}
                className=" px-4 py-2 mt-1 text-white duration-200 text-sm bg-black rounded-md  hover:bg-gray-700 "
              >
                중복 체크
              </button>{" "}
            </div>
            {errors?.nickName && (
              <div>
                <span className="text-red-500 px-2 py-2 mt-1 text-sm  ">
                  {errors.nickName.message}
                </span>
              </div>
            )}{" "}
          </div>

          <div className="mb-3">
            <label //입력 요소와 텍스트를 연결하는 데 사용 되는 label 태그
              htmlFor="email" //htmlFor 속성은 레이블이 연결된 입력 요소의 ID를 지정
              className=" font-semibold text-gray-800"
            >
              이메일
            </label>

            <div className="flex items-center">
              {" "}
              <div>
                {" "}
                <input
                  placeholder="이메일을 입력해주세요."
                  type="email"
                  id="email"
                  className=" px-4 py-2   text-sm mt-1 border bg-white mr-2 rounded-md flex-grow" //px 외부 여백 py 내부 여백 상하좌우
                  {...register("email", userEmail)} //register() 함수의 반환값은 객체이기 때문에 ... 사용 첫번째 인자는 type
                ></input>
              </div>
              <button
                type="button"
                onClick={emailCheck}
                className=" px-4 py-2 mt-1 text-sm text-white duration-200 bg-black rounded-md  hover:bg-gray-700 "
              >
                중복 체크
              </button>
            </div>

            {errors?.email && (
              <div>
                <span className="text-red-500 px-2 py-2 mt-1 text-sm">
                  {errors.email.message}
                </span>
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="font-semibold text-gray-800">
              PW1(비밀번호)
            </label>
            <input
              placeholder="영어와 숫자 조합으로 4글자 이상으로 입력해주세요."
              type="password"
              id="pasword"
              className="w-full px-4 py-2 mt-1 border text-sm bg-white rounded-md"
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

          <div>
            <label
              htmlFor="passwordcheck"
              className="text-sm font-semibold text-gray-800"
            >
              PW2(비밀번호 확인)
            </label>
            <input
              placeholder="비밀번호 확인"
              type="passwordcheck"
              id="passwordcheck"
              className="w-full px-4 py-2  text-sm mt-2 border bg-white rounded-md"
              {...register("passwordCheck", userPasswordCheck)}
            ></input>
            {errors?.passwordCheck && ( //? 는 옵셔널 체크 연산자, password 라는 속성이 없으면 undefined
              <div>
                <span className="text-red-500 px-2 py-2 mt-1 text-sm">
                  {errors.passwordCheck.message}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3">
            <button
              type="submit" //duration hover시 색상 애니이션 지속시간
              className="w-full px-4 py-2 text-white duration-200 bg-black  hover:bg-gray-700 rounded"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
