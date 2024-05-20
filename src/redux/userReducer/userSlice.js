import { createSlice } from "@reduxjs/toolkit";
import { signInThunk } from "./userThunk";
import { userLocal } from "../../services/userLocal";

const initialState = {
  inforUser: userLocal.get(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.inforUser = action.payload;
        userLocal.set(action.payload);
      })
      .addCase(signInThunk.pending, (state, action) => {})
      .addCase(signInThunk.rejected, (state, action) => {});
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
