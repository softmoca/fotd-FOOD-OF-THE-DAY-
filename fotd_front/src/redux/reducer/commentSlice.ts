import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "../thunkFunctions/commentThunk";

const initialState = {
  commentData: [{}],
  postDetailData: {},
  isLoading: false,
  error: "",
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.commentData = action.payload; // 백엔드로 api 요청 한 후 return으로 받은 json

        // console.log(action.payload);
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.commentData = initialState.commentData; // 유저 데이터 초기화
      });
  },
});

export default commentSlice.reducer;
