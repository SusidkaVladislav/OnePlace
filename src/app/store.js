import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../modules/admin/features/adminAuth/adminAuthSlice";
import adminUsersReducer from "../modules/admin/features/adminUsers/adminUsersSlice";

export const store = configureStore({
    reducer: {
        adminAuth: adminAuthReducer,
        adminUsers: adminUsersReducer,
    },
    devTools: true,
})