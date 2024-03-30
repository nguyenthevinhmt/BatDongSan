import {
  PayloadAction,
  createSlice
} from "@reduxjs/toolkit";

const initialState: any = {
  user: {},
  data: {
    access_token: "",
    refresh_token: "",
  },
};
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
    saveUserInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    },
    clearUserInfo: (state) => {
      state.user = {};
    },
    clearUserToken: (state) => {
      state.data = {};
    },
    saveUserToken: (state, action) => {
      return {
        ...state,
        data: {
          ...action.payload,
        },
      };
    },
    updateConfirmStatus: (state) => {
      state.user.data.isConfirm = true
    },
    updateAvatarUrl: (state) => {
      state.user.data.avatarUrl = null
    }
  },
  extraReducers(builder) {
  },
});

export const {
  saveLoginInfo,
  saveUserInfo,
  clearUserInfo,
  saveUserToken,
  clearUserToken,
  updateConfirmStatus,
  updateAvatarUrl
} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
