import
{
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://localhost:7052/api/Account/login";

const initialState = {
    admin: {},
    isAuth: false,
    isAuthInProgress: false,
    error: null
}


export const adminLogin = createAsyncThunk('admin/adminLogin', async (initialAdmin) =>
{
    try
    {
        const response = await axios.post(POSTS_URL, initialAdmin)

        console.log("Responce" + response);

        if (response?.Succeeded)
        {

            console.log("Status: " + "true")
            return response;
        }

        //Записати в localStorage токен
        return response.data
    }
    catch (err)
    {
        return err.message;
    }
})



const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {},
    extraReducers(builder)
    {
        builder
            .addCase(adminLogin.pending, (state, action) =>
            {
                console.log("loading! Server is managementing data")
            })
            .addCase(adminLogin.fulfilled, (state, action) =>
            {
                console.log(action.payload)
                //state.isAuth = true;
                if (action.payload.succeeded)
                {
                    //state.isAuth = true;

                }
                else
                {

                }
                //state.isAuth = false;

                //                console.log(action.payload)
            })

        // .addCase(adminLogin.rejected, (state, action) =>
        // {
        //     //state.error = action.error.message
        //     state.admin = { email: "failAdminEmail", password: "failAdminPassword" };
        //     state.error = "server error";
        // })
        // .addCase(HttpStatusCode.BadRequest, (state, action) =>
        // {
        //     //state.error = action.error.message
        //     state.admin = { email: "failAdminEmail", password: "failAdminPassword" };
        //     state.error = "server error";
        // })
    }
})


export const getAdminCredentials = (state) => state.admin;

export default adminAuthSlice.reducer