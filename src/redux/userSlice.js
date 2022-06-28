import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        currentUserId: null,
    },
    reducers: {
        setUser(state, actions) {
            state.user = actions.payload
        },
        setCurrentUserId(state, actions) {
            state.currentUserId = actions.payload
        },
    },
})
const userActions = userSlice.actions
export { userActions }
export default userSlice
