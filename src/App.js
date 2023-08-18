import "./App.scss";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import ClientLogin from "./component/ClientLogin";
import Overview from "./component/Overview";
import Inventory from "./component/Inventory";
import EditProduct from "./component/EditProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PortalLayout from "./component/dashboard_layout/PortalLayout";
import ProductList from "./component/product/ProductList";
import ProductDetails from "./component/product/ProductDetails";
import CreateProduct from "./component/product/CreateProduct";
import InventoryListing from "./component/inventory/InventoryListing";
import User from "./component/users/User";
import OrderHistory from "./component/stock_history/OrderHistory";
import Order from "./component/order/Order";
import ManualOrderInput from "./component/order/ManualOrderInput";
import CreateOrder from "./component/order/CreateOrder";
import Orderdetails from "./component/order/Orderdetails";
import AddOns from "./component/add-on/AddOns";
import AddOnsHistory from "./component/add-on/AddOnsHistory";
import LossProfit from "./component/loss_profit/LossProfit";
import ChangePassword from "./component/change_password/ChangePassword";
import Profile from "./component/profile/Profile";
import Messages from "./component/messages/Messages";
import BusinessSettings from "./component/business_settings/BusinessSettings";
import Setting from "./component/business_settings/Setting";
import MessagesDetails from "./component/messages/MessagesDetails";
export const GlobalContext = createContext(null);

function App() {
  // --- global states
  const [spinner, setSpinner] = useState();

  return (
    <>
      <GlobalContext.Provider value={{ spinner, setSpinner }}>
        <HashRouter>
          <ToastContainer autoClose={3000} />
          {localStorage.getItem("Token") ? (
            <Routes>
              <Route path='/' element={<Navigate to='/overview' replace />} />
              <Route path='/' element={<PortalLayout />}>
                <Route exect path='/overview' element={<Overview />} />
                <Route path='/inventory' element={<Inventory />} />
                <Route
                  path='/inventory/inventory-list'
                  element={<InventoryListing />}
                />
                <Route
                  path='/inventory/product-list'
                  element={<ProductList />}
                />
                <Route
                  path='/inventory/product-details/:id'
                  element={<ProductDetails />}
                />
                <Route
                  path='/inventory/create-product'
                  element={<CreateProduct />}
                />
                <Route
                  path='/inventory/edit-product/:id'
                  element={<CreateProduct />}
                />
                <Route path='/user' element={<User />} />
                <Route
                  path='inventory/stock-order-history'
                  element={<OrderHistory />}
                />
                <Route path='/order' element={<Order />} />
                <Route
                  path='/order/manual-order-input'
                  element={<ManualOrderInput />}
                />
                <Route
                  path='/order/manual-order-input/create-order'
                  element={<CreateOrder />}
                />
                <Route
                  path='/order/manual-order-input/order-details/:id'
                  element={<Orderdetails />}
                />
                <Route path='/add-ons' element={<AddOns />} />
                <Route
                  path='/add-ons/add-ons-history'
                  element={<AddOnsHistory />}
                />
                <Route path='/messages' element={<Messages />} />
                <Route
                  path='/messages/message-details'
                  element={<MessagesDetails />}
                />
                <Route
                  path='/business_settings'
                  element={<BusinessSettings />}
                />
                <Route path='/settings' element={<Setting />} />
                <Route path='/loss-profit' element={<LossProfit />} />
                <Route path='/change_password' element={<ChangePassword />} />
                <Route path='/profile' element={<Profile />} />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route path='*' element={<Navigate to='/' replace />} />
              <Route path='/' element={<ClientLogin />} />
            </Routes>
          )}
        </HashRouter>
        {/* context  */}
      </GlobalContext.Provider>
    </>
  );
}

export default App;
