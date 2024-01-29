import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasksSelected: [],
}

export const selectionSlice = createSlice({
    name: 'tasksSelected',
    initialState,
    reducers: {
        taskSelected: (state, action) => {
            return {
                ...state,
                tasksSelected: [...state.tasksSelected, action.payload]
            };
        },
        taskUnselected: (state, action) => {
            let Array = state.tasksSelected.filter((id) => id !== action.payload)
            return {
                tasksSelected: Array
            };
        },
        taskReset: (state, _) => {
            return {
                tasksSelected: []
            }
        }
    },
});

export const { taskSelected, taskUnselected, taskReset } = selectionSlice.actions;
export const tasksSelected = (state) => state.tasksSelected
export default selectionSlice.reducer;