import { createSlice } from '@reduxjs/toolkit'
const mobileHomeSlice = createSlice({
    name: 'mobileHome',
    initialState: {
        currentPost: {
            showCommentBox: false, //show comment box
            commentCount: null,
            post: {},
        },
    },
    reducers: {
        setPost(state, actions) {
            state.currentPost = actions.payload
        },
    },
})

export const mobileHomeActions = mobileHomeSlice.actions
export default mobileHomeSlice
