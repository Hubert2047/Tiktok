import { createSlice } from '@reduxjs/toolkit'

const headerSlice = createSlice({
    name: 'header',
    initialState: { showLogin: false },
    reducers: {},
})
export const headerActions = headerSlice.actions
export default headerSlice
