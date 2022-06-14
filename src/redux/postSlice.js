import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        activePost: {},
    },
    reducers: {
        setActivePost(state, actions) {
            state.activePost = actions.payload
        },
    },
})
export const postActions = postSlice.actions
export default postSlice
