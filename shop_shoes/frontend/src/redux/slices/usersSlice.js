import { createSlice } from "@reduxjs/toolkit";
import { fetchGetUserInfo } from "../thunks/userThunk";

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    userInfo: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    })
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;


export const selectUserInfo = (state) => state.users.userInfo;