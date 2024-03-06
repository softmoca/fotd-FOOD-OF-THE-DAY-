import axiosInstance from "@/util/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "post/getComments",
  async (postId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`post/${postId}/comment`);

      // console.log(response.data.data.data);
      return response.data.data.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
