import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/useHttp";

const initialState = {
    films: [],
    loadedFilm:[],
    loadedSerial:[],
    serials: [],
    LoadingStatus: 'idle'
}

export const fetchFilms = createAsyncThunk(
    'films/fetchFilms',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/films')
    }
)

export const fetchSerials = createAsyncThunk(
    'films/fetchSerials',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/serials')
    }
)

export const fetchFilm = createAsyncThunk(
    'films/fetchFilm',
    async (id) => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/films/${id}`)
    }
)

export const fetchSerial = createAsyncThunk(
    'films/fetchSerial',
    async (id) => {
        const {request} = useHttp();
        return await request(`http://localhost:3001/serials/${id}`)
    }
)


const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers:{
        serialsFetched:(state, action) => {
            state.LoadingStatus = 'idle',
            state.serials = action.payload;
        }, 
        filmsUpdated:(state, action) => {
            state.LoadingStatus = 'idle',
            state.films = action.payload;
        }, 
        serialsUpdated:(state, action) => {
            state.LoadingStatus = 'idle',
            state.serials = action.payload;
        }, 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilms.pending, state => {state.LoadingStatus = 'loading'})
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.LoadingStatus = 'idle',
                state.films = action.payload;
            },)
            .addCase(fetchFilms.rejected, state => {state.LoadingStatus = 'error'})
            .addCase(fetchSerials.pending, state => {state.LoadingStatus = 'loading'})
            .addCase(fetchSerials.fulfilled, (state, action) => {
                state.LoadingStatus = 'idle',
                state.serials = action.payload;
            },)
            .addCase(fetchSerials.rejected, state => {state.LoadingStatus = 'error'})
            .addCase(fetchFilm.pending, state => {state.LoadingStatus = 'loading'})
            .addCase(fetchFilm.fulfilled, (state, action) => {
                state.LoadingStatus = 'idle',
                state.loadedFilm = action.payload;
            },)
            .addCase(fetchFilm.rejected, state => {state.LoadingStatus = 'error'})
            .addCase(fetchSerial.pending, state => {state.LoadingStatus = 'loading'})
            .addCase(fetchSerial.fulfilled, (state, action) => {
                state.LoadingStatus = 'idle',
                state.loadedSerial = action.payload;
            },)
            .addCase(fetchSerial.rejected, state => {state.LoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {reducer, actions} = filmsSlice;
export const {
    filmsUpdated,
    serialsUpdated
} = actions

export default reducer;

