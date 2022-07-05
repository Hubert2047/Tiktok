import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        posts: [],
        currentPostPlayingId: null,
        isPageActive: true,
        hasMorePost: true,
        lastApiPost: null,
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
        setHasMorePost(state, actions) {
            state.hasMorePost = actions.payload
        },
        setLastApiPost(state, actions) {
            state.lastApiPost = actions.payload
        },
        setUpdateLikes(state, actions) {
            state.posts = state.posts.map((post) => {
                if (post.id === actions.payload.postId) {
                    return { ...post, likes: post.likes + actions.payload.value }
                }
                return post
            })
        },
    },
})

export const homeActions = homeSlice.actions
export default homeSlice
