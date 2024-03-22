import { 
  PayloadAction, 
  createSlice 
} from "@reduxjs/toolkit";

const initialState: any = {
  user: {
    // fullname: "",
    // avatarUrl: "",
  },
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
  },
  extraReducers(builder) {
    // builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
    //     HYDRATE,
    //     (state,action) => ({...state, ...action.payload})
    // );
  },
});

export const {
  saveLoginInfo,
  saveUserInfo,
  clearUserInfo,
  saveUserToken,
  clearUserToken,
} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
