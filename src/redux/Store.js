/* eslint-disable no-undef */
import { configureStore } from '@reduxjs/toolkit';
import films from '../redux/FilmsSlice'
import user from '../redux/UserSlice'


const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {films, user},
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;