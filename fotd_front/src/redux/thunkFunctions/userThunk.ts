import axiosInstance from "@/util/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser: any = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      console.log(body);

      const response = await axiosInstance.post(
        "/user/signup", //백엔드 api url
        body
      );
      // console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    } //rejectWithValue에 string 을 넣어주면    action의 Payload(state에 전달하는 값)가 된다.
  }
);

export const loginUser: any = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/user/localSignIn", //백엔드 api url
        body
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    } //rejectWithValue에 string 을 넣어주면    action의 Payload(state에 전달하는 값)가 된다.
  }
);

export const authUser: any = createAsyncThunk(
  "user/authUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "/user" //백엔드 api url
      );

      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserData: any = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "/user/userData" //백엔드 api url
      );

      return response.data.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
