import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: {}
    // id: 0,
    // fullname: "",
    // email: "",
    // username: "",
    // password: "",
    // phone: "",
    // status: 0,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        searchPostStore: (state, action) => {
            return {
                ...action.payload,
            };
        },
    },
});
const postReducer = postSlice.reducer;
export default postReducer;
export const { searchPostStore } = postSlice.actions;
