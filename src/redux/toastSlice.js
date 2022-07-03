import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
// message: 'Deleted', mode: 'success'
const toastSlice = createSlice({
    name: 'toast',
    initialState: {
        toasts: [],
    },
    reducers: {
        setToast(state, actions) {
            state.toasts = actions.payload
        },
        addToast(state, actions) {
            state.toasts = [...state.toasts, { ...actions.payload, id: uuidv4() }]
        },
        removeToast(state) {
            state.toasts = state.toasts.filter((toast) => toast.id !== state.toasts[state.toasts.length - 1].id)
        },
    },
})
export const toastActions = toastSlice.actions
export default toastSlice
