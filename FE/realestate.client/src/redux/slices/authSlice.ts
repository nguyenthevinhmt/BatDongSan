import { ITokenResponse } from "@/shared/interfaces/ITokenResponse";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ITokenResponse = {
  access_token: "",
  expires_in: 0,
  refresh_token: "",
  token_type: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //builder.addCase()
  },
});

// export const { increment, decrement } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
