import { configureStore } from '@reduxjs/toolkit'
import headerSlice from './headerSlice'
import homeSlice from './homeSlice'
import userSlice from './userSlice'
import profileSlice from './profileSlice'
import postSlice from './postSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        header: headerSlice.reducer,
        home: homeSlice.reducer,
        profile: profileSlice.reducer,
        post: postSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store
