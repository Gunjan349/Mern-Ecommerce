import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import LandingPage from "./Components/LandingPage";
import OurStore from "./Components/OurStore";
import ScrolltoTop from "./Components/ScrollToTop";
import Contact from "./Components/Contact";
import ProductPage from "./Components/ProductPage";
import AddProduct from "./Components/AddProduct";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Wishlist from "./Components/Wishist";
import Cart from "./Components/Cart";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import RefundPolicy from "./Components/RefundPolicy";
import ShippingPolicy from "./Components/ShippingPolicy";
import Products from "./Components/Products";
import CategorySidebar from "./Components/CategorySidebar";

const App = () => {
  return (
    <>
      <Router>
        <ScrolltoTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/store" element={<OurStore />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/wishist" element={<Wishlist />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route path="/refund-policy" element={<RefundPolicy />}></Route>
            <Route path="/shipping-policy" element={<ShippingPolicy />}></Route>
            <Route path="/product/:id" element={<ProductPage />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route
              path="/add/products"
              element={<AddProduct></AddProduct>}
            ></Route>
            <Route
              path="/category/:catName"
              element={<CategorySidebar />}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
