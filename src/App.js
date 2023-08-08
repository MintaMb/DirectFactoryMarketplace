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
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/" element={<PortalLayout />}>
                <Route exect path="/overview" element={<Overview />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route
                  path="/inventory/inventory-list"
                  element={<InventoryListing />}
                />
                <Route
                  path="/inventory/product-list"
                  element={<ProductList />}
                />
                <Route
                  path="/inventory/product-details/:id"
                  element={<ProductDetails />}
                />
                <Route
                  path="/inventory/create-product"
                  element={<CreateProduct />}
                />
                <Route
                  path="/inventory/edit-product/:id"
                  element={<CreateProduct />}
                />
                <Route path="/user" element={<User />} />
                <Route
                  path="inventory/stock-order-history"
                  element={<OrderHistory />}
                />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/" element={<ClientLogin />} />
            </Routes>
          )}
        </HashRouter>
        {/* context  */}
      </GlobalContext.Provider>
    </>
  );
}

export default App;