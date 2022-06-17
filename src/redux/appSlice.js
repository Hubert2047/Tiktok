import { createSlice } from '@reduxjs/toolkit'
const apptSlice = createSlice({
    name: 'app',
    initialState: { authState: false },
    reducers: {
        setAuthState(state, actions) {
            state.authState = actions.payload
        },
    },
})

export const appActions = apptSlice.actions
export default apptSlice
