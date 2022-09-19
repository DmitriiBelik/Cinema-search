import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    favorites:{},
    loadingStatus:'loading',
    favoriteStatus: false
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
        },
        favoriteStatusFalse: (state) => {
            state.favoriteStatus = false
        },
        favoriteStatusTrue: (state) => {
            state.favoriteStatus = true
        }
    }
});

const {reducer, actions} = userSlice;
export const {
    userFetched,
    userLogOut,
    favoritesFetched,
    favoriteStatusFalse,
    favoriteStatusTrue

} = actions

export default reducer;
