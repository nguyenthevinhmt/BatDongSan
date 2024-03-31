import { createSlice } from "@reduxjs/toolkit";

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
  extraReducers(builder) {},
});
const registerReducer = registerSlice.reducer;
export default registerReducer;
export const { updateFormData } = registerSlice.actions;
