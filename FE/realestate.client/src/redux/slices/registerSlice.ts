import { ITokenResponse } from "@/shared/interfaces/ITokenResponse";
import { RegisterType } from "@/shared/types/RegisterType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../store";

const initialState = {
  // id: 0,
  // fullname: "",
  // email: "",
  // username: "",
  // password: "",
  // phone: "",
  // status: 0,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
        HYDRATE,
        (state,action) => ({...state, ...action.payload})
    );
  },
});
const registerReducer = registerSlice.reducer;
export default registerReducer;
export const { updateFormData } = registerSlice.actions;
