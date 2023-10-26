import { Routes, Route } from 'react-router-dom';
import { Helmet} from 'react-helmet';

//#region Client routes
import Header from './modules/client/components/Header';
//#endregion

//#region Main routes
import ChangePassword from "./modules/main/features/changePassword/ChangePassword";
import UserLoginForm from './modules/main/features/login/UserLoginForm';
import UserRegisterForm from './modules/main/features/register/UserRegisterForm';
//#endregion

//#region Admin routes
import AdminAuthForm from "./modules/admin/features/adminAuth/AdminAuthForm";
import AdminManePanel from "./modules/admin/components/AdminMainPanel";
import ItemMane from "./modules/admin/components/MenuItems/ItemMain/ItemMain";
import ItemSale from "./modules/admin/components/MenuItems/ItemSale/ItemSale";
import ItemOrder from "./modules/admin/components/MenuItems/ItemOrder/ItemOrder";
import ItemUser from "./modules/admin/components/MenuItems/ItemUser/ItemUser";
import ItemMessage from "./modules/admin/components/MenuItems/ItemMessage/ItemMessage";
import ItemProduct from "./modules/admin/components/MenuItems/ItemProduct/ItemProduct";
import ItemCategory from "./modules/admin/components/MenuItems/ItemCategory/ItemCategory";
import ItemReview from "./modules/admin/components/MenuItems/ItemReview/ItemReview";
import FilerItem from "./modules/admin/components/MenuItems/ItemFilter/ItemFilter";
import ItemExit from "./modules/admin/components/MenuItems/ItemExit/ItemExit";
import ItemAddProduct from './modules/admin/components/MenuItems/ItemAddProduct/ItemAddProduct';
import ItemEditProduct from './modules/admin/components/MenuItems/ItemEditProduct/ItemEditProduct';
//#endregion

import OnePlaceMain from "./modules/main/OnePlaceMain";

import UserInfo from "./modules/admin/components/MenuItems/ItemUser/userPages/UserInfo";
import ReviewInfo from "./modules/admin/components/MenuItems/ItemReview/reviewPages/ReviewInfo";

import AdminPrivateRoute from './privateRouting/adminPrivateRoute';

import "./App.css";


function App()
{
  return (
    <div className='body-div'>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>

      <Routes>
        <Route path="home" element={<Header />} />

        <Route path="/" element={<OnePlaceMain />} />

        <Route path="user-login" element={<UserLoginForm />} />
        <Route path="register" element={<UserRegisterForm />} />
        <Route path="change-password" element={<ChangePassword />} />

        <Route path="admin">

          <Route index element={<AdminAuthForm />} />


          {/* <Route path="/main" element={<AdminManePane />}> */}
          <Route path="main" element={<AdminPrivateRoute />}>
            <Route path="" element={<AdminManePanel />}>
              <Route index element={<ItemMane />} />
              <Route path="sales" element={<ItemSale />} />
              <Route path="orders" element={<ItemOrder />} />

              <Route path="users" >
                <Route index element={<ItemUser />} />
                <Route path="user/:id" element={<UserInfo />} />
              </Route>

              <Route path="messages" element={<ItemMessage />} />

              <Route path="products" >
                <Route index element={<ItemProduct />} />
                <Route path={"product/:id"} element={<ItemEditProduct />} />
              </Route>

              <Route path="add-product" element={<ItemAddProduct />} />
              <Route path="categories" element={<ItemCategory />} />

              <Route path="reviews" >
                <Route index element={<ItemReview />} />
                <Route path="review/:id" element={<ReviewInfo />} />
              </Route>

              <Route path="filters" element={<FilerItem />} />
              <Route path="exit" element={<ItemExit />} />
            </Route>

          </Route>
        </Route>

      </Routes>

    </div>
  );
}

export default App;


{/* <Route path="user/:id" element={<UserInfo />} /> */ }