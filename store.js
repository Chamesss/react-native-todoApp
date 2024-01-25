import { configureStore } from '@reduxjs/toolkit'
import themeReducer, { initializeThemeAsync } from './src/slices/themeSlice';
import tasksReducer from './src/slices/tasksSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        tasks: tasksReducer
    },
})

store.dispatch(initializeThemeAsync());