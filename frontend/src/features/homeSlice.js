import { createSlice } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";


export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        categories: [],
        tasks: [],
        localTasksList: [],
        user: null
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload.categories;
        },
        setTasks: (state, action) => {
            state.tasks = action.payload.tasks;
        },
        setLogin: (state, action) => {
            state.user = action.payload.user
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload.task);
        },
        updateTasks: (state, action) => {
            const updatedTasks = state.tasks.map((task) => {
                if(task._id === action.payload.task._id) return action.payload.task
                return task
            })
            state.tasks = updatedTasks
            state.localTasksList = updatedTasks
        },
        update: (state, action = { payload: { text: 'a' } }) => {
            state.localTasksList.push(action.payload.text)
        },
        setLogout: (state, action) => {
            state.user = null
        }
    }
})

export const { setCategories, setTasks, setLogin, setLogout, update, addTask, updateTasks } = homeSlice.actions
export default homeSlice.reducer