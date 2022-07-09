import { createSlice } from '@reduxjs/toolkit'
import { theme } from '~/staticData'
const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: { name: 'light', styles: theme.styleThemes.light },
    },
    reducers: {
        setTheme(state, actions) {
            state.theme = actions.payload
        },
    },
})
export const themeActions = themeSlice.actions
export default themeSlice
