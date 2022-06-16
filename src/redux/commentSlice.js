import { createSlice } from '@reduxjs/toolkit'
const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        inputRef: null,
        lastUserWasTouchedReplyInfor: {
            commentParentId: 'null',
            userWasTouched: {},
        },
        commentCount: 0,
    },
    reducers: {
        setInputRef(state, actions) {
            state.inputRef = actions.payload
        },
        setLastUserWasTouchedReplyInfor(state, actions) {
            state.lastUserWasTouchedReplyInfor = actions.payload
        },
    },
})

export const commentActions = commentSlice.actions
export default commentSlice
