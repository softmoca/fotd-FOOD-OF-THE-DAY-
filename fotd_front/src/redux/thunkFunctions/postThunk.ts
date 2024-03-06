import axiosInstance from "@/util/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerPost: any = createAsyncThunk(
  "post/registerPost",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/post/",
        body //백엔드 api url
      );

      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
