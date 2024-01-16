import { configureStore } from '@reduxjs/toolkit'
import themeReducer, { initializeThemeAsync } from './src/slices/themeSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
})

store.dispatch(initializeThemeAsync());