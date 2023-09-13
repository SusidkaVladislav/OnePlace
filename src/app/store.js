import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import
{
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from "redux-persist/lib/storage";

import adminAuthReducer from "../modules/admin/features/adminAuth/adminAuthSlice";
import adminUsersReducer from "../modules/admin/features/adminUsers/adminUsersSlice";

const rootReducer = combineReducers({
    adminAuth: adminAuthReducer,
    adminUsers: adminUsersReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
})

export const persistor = persistStore(store);

export default store;