import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        posts: [],
        currentPostPlayingId: null,
    },
    reducers: {
        setPost(state, actions) {
            state.posts = actions.payload
        },
        setCurrentPostPlayingId(state, actions) {
            state.currentPostPlayingId = actions.payload
        },
    },
})

export const homeActions = homeSlice.actions
export default homeSlice
