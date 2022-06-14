import { createSlice } from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
    },
})
const userActions = userSlice.actions
export { userActions }
export default userSlice
