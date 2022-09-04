import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    favorites:{},
    loadingStatus:'loading'
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
        },
        favoritesFetched:(state, action) => {
            state.favorites = action.payload
            state.loadingStatus = 'idle'
        }
    }
});

const {reducer, actions} = userSlice;
export const {
    userFetched,
    userLogOut,
    favoritesFetched
} = actions

export default reducer;
