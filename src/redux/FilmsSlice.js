import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    films: [],
    filmsLoadingStatus: 'idle'
}

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers:{
        filmsFetching: state => {state.filmsLoadingStatus = 'loading'},
        filmsFetched: (state, action) => {
            state.filmsLoadingStatus = 'idle',
            state.films = action.payload;
        },
        filmsFetchingError: state => {
            state.filmsLoadingStatus = 'error'
        }
    }
});

const {actions, reducer} = filmsSlice;

export default reducer;
export const {
    filmsFetching,
    filmsFetched,
    filmsFetchingError
} = actions