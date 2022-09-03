import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        userFetched:(state, action) => {
            state.user = action.payload;
        },
        userLogOut:(state) => {
            state.user = {};
        }
    }
});

const {reducer, actions} = userSlice;
export const {
    userFetched,
    userLogOut
} = actions

export default reducer;
