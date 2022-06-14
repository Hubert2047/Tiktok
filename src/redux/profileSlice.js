import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profileUser: {},
    },
    reducers: {
        setProfileUser(state, actions) {
            state.profileUser = actions.payload
        },
    },
})
export const profileActions = profileSlice.actions
export default profileSlice
