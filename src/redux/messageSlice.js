import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        inputValue: '',
    },
    reducers: {
        setInputValue(state, actions) {
            state.inputValue = actions.payload
        },
    },
})
export const messageActions = messageSlice.actions
export default messageSlice
