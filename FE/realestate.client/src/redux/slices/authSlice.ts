import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from '../store';

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
  extraReducers(builder) {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
        HYDRATE,
        (state,action) => ({...state, ...action.payload})
    );
},
});

export const { saveLoginInfo } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
