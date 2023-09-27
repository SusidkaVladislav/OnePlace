import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
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
import adminOrdersReducer from "../modules/admin/features/adminOrders/adminOrdersSlice";
import verificationCodeReducer from "../modules/admin/features/servicesState/verificationCodeState";
import passwordInputReducer from "../modules/admin/features/servicesState/passwordState";
import userRegisterReducer from "../modules/main/features/register/userRegisterSlice";
import adminCategoryReducer from "../modules/admin/features/adminCategory/adminCategorySlice";
import adminProductsSlice from "../modules/admin/features/adminProduct/adminProductSlice";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['verificationCode', 'passwordInputState', 'userRegister'],
    stateReconciler: autoMergeLevel2,
}


const rootReducer = combineReducers({
    adminAuth: adminAuthReducer,
    adminUsers: adminUsersReducer,
    adminOrders: adminOrdersReducer,
    adminCategories: adminCategoryReducer,
    adminProducts: adminProductsSlice,
    verificationCode: verificationCodeReducer,
    passwordInputState: passwordInputReducer,
    userRegister: userRegisterReducer,
})


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