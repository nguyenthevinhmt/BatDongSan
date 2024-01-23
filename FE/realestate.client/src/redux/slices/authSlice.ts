import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value:0,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        increment: (state) => {
          state.value += 1;
        },
        decrement: (state) => {
          state.value -= 1;
        },
      },
    extraReducers: (builder) => {
        //builder.addCase()
    }
});

export const { increment, decrement } = authSlice.actions;
export default authSlice.reducer;