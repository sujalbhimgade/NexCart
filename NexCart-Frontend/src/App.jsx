import React from "react";
import "./App.css";
import CustomThemeProvider from "./themes/CustomThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import { ProvideAuth } from "./components/hooks/useProvideAuth";

import Home from "./components/home/Home";
import Login from "./components/home/Login";
import Register from "./components/home/Register";
import Dashboard from "./components/dashboard/Dashboard";
import MainLanding from "./components/dashboard/landingPage/MainLanding";
import Product from "./components/dashboard/product/Product";
import SearchResults from "./components/dashboard/search/SearchResults";
import Cart from "./components/cart/Cart";
import Order from "./components/dashboard/order/Order";
import OrderItem from "./components/dashboard/order/OrderItem";
import Account from "./components/dashboard/account/Account";
import Support from "./components/dashboard/support/Support";
import AdminPanel from "./components/dashboard/account/AdminPanel";

function App() {
  return (
    <CustomThemeProvider>
      <Provider store={store}>
        <ProvideAuth>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/app" element={<Dashboard />}>
                <Route index element={<MainLanding />} />
                <Route path="products/:productId" element={<Product />} />
                <Route path="account" element={<Account />} />
                <Route path="support" element={<Support />} />
                <Route path="orders" element={<Order />} />
                <Route path="orders/:id" element={<OrderItem />} />
                <Route path="search/:query" element={<SearchResults />} />
                <Route path="cart" element={<Cart />} />
                <Route path="admin" element={<AdminPanel />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProvideAuth>
      </Provider>
    </CustomThemeProvider>
  );
}

export default App;