import { createSlice } from '@reduxjs/toolkit'
const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        information: {
            title: 'Alert',
            isShow: false,
        },
    },
    reducers: {
        setInformation(state, actions) {
            state.information = actions.payload
        },
    },
})

export const alertActions = alertSlice.actions
export default alertSlice
