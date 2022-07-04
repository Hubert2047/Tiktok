import { createSlice } from '@reduxjs/toolkit'
const containerPortalSlice = createSlice({
    name: 'containerPortal',
    initialState: {
        component: null,
    },
    reducers: {
        setComponent(state, actions) {
            state.component = actions.payload
        },
    },
})

export const containerPortalActions = containerPortalSlice.actions
export default containerPortalSlice
