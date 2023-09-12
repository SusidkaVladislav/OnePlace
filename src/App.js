import { Routes, Route, useNavigate } from 'react-router-dom';
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

import OnePlaceMain from "./modules/main/OnePlaceMain";

import UserInfo from "./modules/admin/features/adminUsers/UserInfo";

import "./App.css";
import OnePlaceIcon from './modules/admin/svg/loginIcons/OnePlaceIcon';

function App()
{
  return (
    <div className='body-div'>


      <Routes>
        <Route path="/" element={<OnePlaceMain />} />



        <Route path="admin">
          <Route index element={<AdminAuthForm />} />

          <Route path="main" element={<AdminManePanel />}>
            <Route index element={<ItemMane />} />
            <Route path="sales" element={<ItemSale />} />
            <Route path="orders" element={<ItemOrder />} />
            
            <Route path="users" element={<ItemUser />}>
              <Route path=":id" element={<UserInfo />} />
            </Route>
            
            <Route path="messages" element={<ItemMessage />} />
            <Route path="products" element={<ItemProduct />} />
            <Route path="categories" element={<ItemCategory />} />
            <Route path="reviews" element={<ItemReview />} />
            <Route path="filters" element={<FilerItem />} />
            <Route path="exit" element={<ItemExit />} />
          </Route>
        </Route>



      </Routes>




    </div>

  );
}

export default App;