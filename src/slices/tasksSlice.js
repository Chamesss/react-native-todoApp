import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action) {
            return {
                ...state,
                tasks: action.payload,
            }
        },
        taskAdded(state, action) {
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        },
        taskDeleted(state, action) {
            const updatedTasks = state.tasks.filter((task) => task.id !== action.payload)
            return {
                ...state,
                tasks: updatedTasks,
            }
        }
    },
});

export const { setTasks, taskAdded, taskDeleted } = taskSlice.actions;
export const tasks = (state) => state.tasks
export default taskSlice.reducer;