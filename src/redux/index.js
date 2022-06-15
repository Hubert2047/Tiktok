import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import commentSlice from './commentSlice'
import headerSlice from './headerSlice'
import homeSlice from './homeSlice'
import postSlice from './postSlice'
import profileSlice from './profileSlice'
import userSlice from './userSlice'

const persistConfig = {
    key: 'root',
    storage,
}
const userPersistedReducer = persistReducer(persistConfig, userSlice.reducer)
const store = configureStore({
    reducer: {
        user: userPersistedReducer, //save to store
        header: headerSlice.reducer,
        home: homeSlice.reducer,
        profile: profileSlice.reducer,
        post: postSlice.reducer,
        comment: commentSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store)

export default store
