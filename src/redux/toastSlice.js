import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        toasts: [],
    },
    reducers: {
        setToast(state, actions) {
            state.toasts = actions.payload
        },
        // message: 'Deleted', mode: 'success'
        addToast(state, actions) {
            state.toasts = [...state.toasts, { ...actions.payload, id: uuidv4() }]
        },
        removeToast(state, actions) {
            state.toasts = state.toasts.filter((toast) => toast.id !== actions.payload)
        },
    },
})
export const toastActions = toastSlice.actions
export default toastSlice
