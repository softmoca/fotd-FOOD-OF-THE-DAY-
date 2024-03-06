// axios 모듈을 직접 불러올 때, default export를 사용합니다.
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`, // 서버 포트
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");

    return config;
  }, // 요청.헤더.Authorizaion에 스토리지에 저장한 토큰을 넣음
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
