import { createSlice } from '@reduxjs/toolkit'

const headerSlice = createSlice({
    name: 'header',
    initialState: { showLogin: false },
    reducers: {
        setShowLogin(state) {
            state.showLogin = !state.showLogin
        },
    },
})
export const headerActions = headerSlice.actions
export default headerSlice
