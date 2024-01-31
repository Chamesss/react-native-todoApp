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
            const updatedTasks = state.tasks.filter(task => task.id !== action.payload);
            return {
                ...state,
                tasks: updatedTasks,
            };
        },
        taskEdited(state, action) {
            const task = action.payload
            const index = state.tasks.findIndex((t) => t.id === task.id)
            const newState = {
                ...state,
                tasks: [...state.tasks],
            };
            newState.tasks[index] = {
                ...newState.tasks[index],
                category: task.category,
                title: task.title,
                finishDate: task.finishDate,
            };
            return newState;
        }
    },
});

export const { setTasks, taskAdded, taskDeleted, taskEdited } = taskSlice.actions;
export const tasks = (state) => state.tasks
export default taskSlice.reducer;