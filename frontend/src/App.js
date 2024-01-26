import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import LandingPage from "./Components/LandingPage";
import About from "./Components/About";
import OurStore from './Components/OurStore';
import WomenFashion from './Components/WomenFashion';
import MenFashion from './Components/MenFashion';
import HomeAppliances from './Components/HomeApp';
import Toys from './Components/MainToys';
import Books from './Components/MainBooks';
import Devices from './Components/MainDevices';
import Blogs from './Components/MainBlog';
import Contact from "./Components/Contact";
import Deals from './Components/Deals'
import Collection from './Components/Collection';
import ProductPage from './Components/ProductPage';
import AddProduct from "./Components/AddProduct";
import GetProduct from "./Components/GetProduct";
import UpdateProduct from "./Components/UpdateProduct";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from './Components/ResetPassword';
import Wishlist from './Components/Wishist';
import Cart from './Components/Cart';
import UserCart from "./Components/UserCart";
import PrivacyPolicy from './Components/PrivacyPolicy';
import RefundPolicy from "./Components/RefundPolicy";
import ShippingPolicy from "./Components/ShippingPolicy";
import TermsConditions from "./Components/TermsConditions";
import Checkout from "./Components/Checkout";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/store" element={<OurStore />}></Route>
            <Route path="/womenfashion" element={<WomenFashion />}></Route>
            <Route path="/menfashion" element={<MenFashion />}></Route>
            <Route path="/home-appliances" element={<HomeAppliances />}></Route>
            <Route path="/toys" element={<Toys />}></Route>
            <Route path="/books" element={<Books />}></Route>
            <Route path="mobiles&devices" element={<Devices />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/collection" element={<Collection />}></Route>
            <Route path="/bestdeals" element={<Deals />}></Route>
            <Route path="/wishist" element={<Wishlist />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            <Route path="/reset-password" element={<ResetPassword/>}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
            <Route path="/refund-policy" element={<RefundPolicy/>}></Route>
            <Route path="/shipping-policy" element={<ShippingPolicy/>}></Route>
            <Route path="/terms&conditions" element={<TermsConditions/>}></Route>
            <Route path="/product" element={<ProductPage />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </Route>
        
         
          <Route
            path="/add/products"
            element={<AddProduct></AddProduct>}
          ></Route>
          <Route
            path="/get/products"
            element={<GetProduct></GetProduct>}
          ></Route>
          <Route
            path="/get/product/:id"
            element={<UpdateProduct></UpdateProduct>}
          ></Route>
          <Route path="/user/cart" element={<UserCart></UserCart>}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
