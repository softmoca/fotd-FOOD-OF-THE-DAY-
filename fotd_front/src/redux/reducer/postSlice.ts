import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { registerPost } from "../thunkFunctions/postThunk";

const initialState = {
  postData: {
    postIdx: "",
    //미정
    test: "",
    image: "",
  },
  isLoading: false,
  error: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerPost.fulfilled, (state) => {
        state.isLoading = false;
        toast.info("글작성에 성공하였습니다.");
      })
      .addCase(registerPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default postSlice.reducer;
