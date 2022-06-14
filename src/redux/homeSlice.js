import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        posts: [],
    },
    reducers: {
        setPost(state, actions) {
            state.posts = actions.payload
        },
    },
})

export const homeActions = homeSlice.actions
export default homeSlice
