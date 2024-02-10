import { ITokenResponse } from "@/shared/interfaces/ITokenResponse";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveLoginInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    //builder.addCase()
  },
});

export const { saveLoginInfo } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
