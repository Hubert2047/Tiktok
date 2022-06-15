import { createSlice } from '@reduxjs/toolkit'
const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        inputRef: null,
        currentParentId: 'null',
        lastUserWasTouchedReply: {},
    },
    reducers: {
        setInputRef(state, actions) {
            state.inputRef = actions.payload
        },
        setLastUserWasTouchedReply(state, actions) {
            state.lastUserWasTouchedReply = actions.payload
        },
        setCurrentParentId(state, actions) {
            state.currentParentId = actions.payload
        },
    },
})

export const commentActions = commentSlice.actions
export default commentSlice
