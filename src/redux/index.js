import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import appSlice from './appSlice'
import commentSlice from './commentSlice'
import containerPortalSlice from './containerPortalSlice'
import headerSlice from './headerSlice'
import homeSlice from './homeSlice'
import messageSlice from './messageSlice'
import mobileHomeSlice from './mobile/mobileHomeSlice'
import postSlice from './postSlice'
import profileSlice from './profileSlice'
import toastSlice from './toastSlice'
import userSlice from './userSlice'

const persistConfig = {
    key: 'root',
    storage,
}
const appPersistedReducer = persistReducer(persistConfig, appSlice.reducer)
const userPersistedReducer = persistReducer(persistConfig, userSlice.reducer)
const store = configureStore({
    reducer: {
        app: appPersistedReducer, //save to store
        user: userPersistedReducer, //save to store
        header: headerSlice.reducer,
        home: homeSlice.reducer,
        profile: profileSlice.reducer,
        post: postSlice.reducer,
        comment: commentSlice.reducer,
        toast: toastSlice.reducer,
        message: messageSlice.reducer,
        alert: containerPortalSlice.reducer,
        mobileHome: mobileHomeSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store)

export default store
