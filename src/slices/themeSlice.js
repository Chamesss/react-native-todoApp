import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isDarkMode: false,
    initialized: false,
    loading: true,
};

// Async thunk to switch theme
export const switchThemeAsync = createAsyncThunk('theme/switchThemeAsync', async (_, { getState }) => {
    const currentState = selectTheme(getState());
    try {
        await AsyncStorage.setItem('theme', JSON.stringify(!currentState.isDarkMode));
    } catch (error) {
        return false
    }
});

export const initializeThemeAsync = createAsyncThunk('theme/initializeThemeAsync', async () => {
    try {
        const theme = await AsyncStorage.getItem('theme');
        return theme === "true" || theme === true;
    } catch (error) {
        await AsyncStorage.setItem('theme', JSON.stringify(false));
        return false
    }
});

// Create the slice
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(switchThemeAsync.fulfilled, (state) => {
                state.isDarkMode = !state.isDarkMode
                return state
            })
            .addCase(initializeThemeAsync.fulfilled, (state, action) => {
                state.isDarkMode = action.payload
                state.initialized = true
                state.loading = false
                return state
            });
    },
});

export const { switchTheme } = themeSlice.actions
export const selectTheme = (state) => state.theme.isDarkMode;
export const selectThemeInitialized = (state) => state.theme.initialized;
export const selectThemeLoading = (state) => state.theme.loading;

export default themeSlice.reducer;