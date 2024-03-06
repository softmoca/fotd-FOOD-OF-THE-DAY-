"use client";

import Navbar from "@/components/navbar";
import PostItem from "@/components/postItem";
import { getUserData } from "@/redux/thunkFunctions/userThunk";
import axiosInstance from "@/util/axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const [hasJWT, setHasJWT] = useState(false);

  let router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData()); //thucnk 함수 이름은 authUser
  }, []); // 권한이 바뀌거나 or url경로가 바뀌거나

  useEffect(() => {
    // 페이지가 마운트될 때 로컬 스토리지에서 JWT 토큰을 가져와서 확인
    const storedLocalStorageJWT = localStorage.getItem("accessToken");

    if (storedLocalStorageJWT) {
      setHasJWT(true);
    } else {
      setHasJWT(false);
      toast.info("로그인 후  서비스를 이용해 주세요 !");
      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance("/post/");

        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <div>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((dpost: any) => <PostItem dpost={dpost} key={dpost.id} />)
        )}
      </div>
    </div>
  );
};

export default Home;
