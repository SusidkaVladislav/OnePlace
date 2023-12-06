import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

//#region Main routes
import CategoryPage from './modules/main/pages/display-category-page/CategoriesPage';
import ProductsByCategoryPage from './modules/main/pages/products-by-category/ProductsByCategoryPage';
import Basket from './modules/main/pages/basket/Basket';
import CheckoutPage from './modules/main/pages/checkout/CheckoutPage';

import MainCabinetLayer from './modules/client-area/cabinet/MainCabinetLayer';
import MyChats from './modules/client-area/cabinet/my-chats/MyChats';
import MyDesires from './modules/client-area/cabinet/my-desires/MyDesires';
import MyOrders from './modules/client-area/cabinet/my-orders/MyOrders';
import MyPersonalData from './modules/client-area/cabinet/my-personal-data/MyPersonalData';
import MyPurse from './modules/client-area/cabinet/my-purse/MyPurse';
import MyReviews from './modules/client-area/cabinet/my-reviews/MyReviews';

import ProductPage from './modules/productPage/productPage';
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
import ItemAddProduct from './modules/admin/components/MenuItems/ItemAddProduct/ItemAddProduct';
import ItemEditProduct from './modules/admin/components/MenuItems/ItemEditProduct/ItemEditProduct';
import ViewEditOrder from './modules/admin/components/MenuItems/ItemOrder/order-components/ViewEditOrder';
//#endregion

//#region 
import NoServerConnection from './error-pages/NoServerConnection';
//#endregion

import OnePlaceMain from "./modules/main/OnePlaceMain";

import UserInfo from "./modules/admin/components/MenuItems/ItemUser/userPages/UserInfo";
import ReviewInfo from "./modules/admin/components/MenuItems/ItemReview/reviewPages/ReviewInfo";

import AdminPrivateRoute from './privateRouting/adminPrivateRoute';
import UserPrivateRoute from './privateRouting/userPrivateRoute';

import "./App.css";



function App()
{
  return (
    <div className='body-div'>
      <Helmet>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Helmet>

      <Routes>

        <Route path="/" element={<OnePlaceMain />} />

        <Route path="/product-page" element={<ProductPage/>}/>

        <Route path='/server-connection-error' element={<NoServerConnection />} />

        <Route path='category/:id' element={<CategoryPage />} />
        <Route path='products/:id' element={<ProductsByCategoryPage />} />
        <Route path='basket' element={<Basket />} />
        <Route path='checkout' element={<CheckoutPage />} />

        <Route path="user" element={<UserPrivateRoute />}>
          <Route path="" element={<MainCabinetLayer />}>
            <Route index element={<MyOrders />} />
            <Route path='desires' element={<MyDesires />} />
            <Route path='purse' element={<MyPurse />} />
            <Route path='reviews' element={<MyReviews />} />
            <Route path='chats' element={<MyChats />} />
            <Route path='personal-data' element={<MyPersonalData />} />
          </Route>
        </Route>

        <Route path="admin">
          <Route index element={<AdminAuthForm />} />
          <Route path="main" element={<AdminPrivateRoute />}>
            <Route path="" element={<AdminManePanel />}>
              <Route index element={<ItemMane />} />
              <Route path="sales" element={<ItemSale />} />

              <Route path="orders" >
                <Route index element={<ItemOrder />} />
                <Route path='order/:id' element={<ViewEditOrder />} />
              </Route>

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
            </Route>

          </Route>
        </Route>

      </Routes>

    </div>
  );
}

export default App;