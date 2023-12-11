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

//#region  Admin Reducers
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
//endregion

//#region User Reducers
import userCategoryReducer from "../modules/main/features/categories/userCategorySlice";
import userProductReducer from "../modules/main/features/products/userProductSlice";
import userAnaliticReducer from "../modules/main/features/analitics/userAnaliticSlice";
import userAuthReducer from "../modules/main/features/userAuth/userAuthSlice";
import userLoginReducer from "../modules/main/features/login/userLoginSlice";
import userOrderReducer from "../modules/main/features/order/userOrderSlice";
import userBasketReducer from "../modules/main/features/basket/cartSlice";
import userMessageReducer from "../modules/main/features/messages/userMessageSlice";
//#endregion


const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: [
        //admin        
        'verificationCode', 'passwordInputState', 'adminFilter',
        'adminOrders', 'adminMessages', 'adminSales', 'adminReviews', 'adminUsers',
        // user
        'userAnalitic', 'userProducts', 'userRegister', 'userAuth', 'userLogin', 'userMessages',
    ],
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
    userCategories: userCategoryReducer,
    userProducts: userProductReducer,
    userAnalitic: userAnaliticReducer,
    userAuth: userAuthReducer,
    userLogin: userLoginReducer,
    userOrder: userOrderReducer,
    userBasket: userBasketReducer,
    userMessages: userMessageReducer,
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