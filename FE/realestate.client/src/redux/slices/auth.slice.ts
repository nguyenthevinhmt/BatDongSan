import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../interface/interface";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRedux: (state, { payload }) => {
      state.accessToken = localStorage.getItem("accessToken");
      state.refreshToken = localStorage.getItem("refreshToken");
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logoutRedux: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = true;
    },
  },
});

export default authSlice.reducer;
export const { loginRedux, logoutRedux } = authSlice.actions;
