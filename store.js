import { configureStore } from '@reduxjs/toolkit'
import themeReducer, { initializeThemeAsync } from './src/slices/themeSlice';
import tasksReducer from './src/slices/tasksSlice'
import selectionReducer from './src/slices/selectionSlice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        tasks: tasksReducer,
        tasksSelected: selectionReducer
    },
})

store.dispatch(initializeThemeAsync());