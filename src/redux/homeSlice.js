import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        posts: [],
        currentPostPlayingId: null,
        isPageActive: true,
    },
    reducers: {
        setPost(state, actions) {
            state.posts = actions.payload
        },
        setCurrentPostPlayingId(state, actions) {
            state.currentPostPlayingId = actions.payload
        },
        setIsPageActive(state, actions) {
            state.isPageActive = actions.payload
        },
    },
})

export const homeActions = homeSlice.actions
export default homeSlice
