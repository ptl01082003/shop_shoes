import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Layout from "./components/Layout/Layout";
import { PATH_ROUTER } from "./constants";
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
import Oders from "./pages/Order/Order";
import SuccessPayment from "./pages/SuccessPayment";
import UserFeature from "./pages/UserFeature/UserFeature";
import UserInfo from "./pages/UserFeature/Components/UserInfo";
import PaymentInfo from "./pages/UserFeature/Components/PaymentInfo";
import OderDetails from "./pages/UserFeature/Components/OderDetails";

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
            <Route path="users/*" element={<UserFeature />}>
              <Route path="" element={<UserInfo />} />
              <Route path="payment" element={<PaymentInfo />} />
              <Route path="orders" element={<OderDetails />} />
            </Route>
            <Route path="shop" element={<Shop />} />
            <Route path="success-payment" element={<SuccessPayment />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="journal" element={<Journal />} />
            <Route path="category/:category" element={<Offer />} />
            <Route path="product/:code" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="create-orders" element={<Oders />} />
            <Route path="paymentgateway" element={<Payment />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
