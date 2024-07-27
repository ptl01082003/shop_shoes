import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { KEY_STORAGE, PATH_ROUTER } from "./constants";
import { useEffect } from "react";
import { fetchGetUserInfo } from "./redux/thunks/userThunk";
import { selectUserInfo } from "./redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchGetLstCarts } from "./redux/thunks/cartThunk";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="font-bodyFont">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router basename="/">
        <Routes>
          <Route path={PATH_ROUTER.SIGN_UP} element={<SignUp />} />
          <Route path={PATH_ROUTER.SIGN_IN} element={<SignIn />} />
          <Route path="/*" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="journal" element={<Journal />} />
            <Route path="category/:category" element={<Offer />} />
            <Route path="product/:code" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="paymentgateway" element={<Payment />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
