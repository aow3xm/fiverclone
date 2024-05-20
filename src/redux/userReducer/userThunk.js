import { createAsyncThunk } from "@reduxjs/toolkit";
import { userSer } from "../../services/userService";

export const signInThunk = createAsyncThunk(
  "userReducer/signInThunk",
  async (payload) => {
    try {
      const data = await userSer.signIn(payload);
      const infoUser = data.data.content.user;
      return infoUser;
    } catch (error) {
      console.log("error", error);
    }
  }
);

