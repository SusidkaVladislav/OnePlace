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
import adminReviewsReducer from "../modules/admin/features/adminReviews/adminReviewsSlice";
import adminMessagesReducer from "../modules/admin/features/adminMessages/adminMessagesSlice";
import verificationCodeReducer from "../modules/admin/features/servicesState/verificationCodeState";
import passwordInputReducer from "../modules/admin/features/servicesState/passwordState";
import userRegisterReducer from "../modules/main/features/register/userRegisterSlice";
import adminCategoryReducer from "../modules/admin/features/adminCategory/adminCategorySlice";
import adminProductsReducer from "../modules/admin/features/adminProduct/adminProductSlice";
import adminFilterReducer from "../modules/admin/features/adminFilter/adminFilterSlice";
import adminSalesReducer from "../modules/admin/features/adminSale/adminSaleSlice";

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['verificationCode', 'passwordInputState', 'userRegister', 'adminFilter',
'adminOrders', 'adminMessages', 'adminSales', 'adminReviews', ],
    stateReconciler: autoMergeLevel2,
}

const adminProductPersistConfig = {
    key: 'adminProduct',
    storage,
    blacklist: ['allProducts']
}

const rootReducer = combineReducers({
    adminAuth: adminAuthReducer,
    adminUsers: adminUsersReducer,
    adminOrders: adminOrdersReducer,
    adminCategories: adminCategoryReducer,
    adminProducts: persistReducer(adminProductPersistConfig, adminProductsReducer),
    adminReviews: adminReviewsReducer,
    adminMessages: adminMessagesReducer,
    adminFilter: adminFilterReducer,
    adminSales: adminSalesReducer,
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
            //serializableCheck: false,
        }),
})

export const persistor = persistStore(store);

export default store;