import { ITokenResponse } from "@/shared/interfaces/ITokenResponse";
import { RegisterType } from "@/shared/types/RegisterType";
import { createSlice } from "@reduxjs/toolkit";

const initialState: RegisterType = {
  id: 0,
  fullname: "",
  email: "",
  username: "",
  password: "",
  phone: "",
  status: 0,
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
  extraReducers: (builder) => {
    //builder.addCase()
  },
});
const registerReducer = registerSlice.reducer;
export default registerReducer;
export const { updateFormData } = registerSlice.actions;
