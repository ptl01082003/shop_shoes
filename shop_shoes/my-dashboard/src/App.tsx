import React from "react";

import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BrandsPage from "./pages/Brands";
import StylesPage from "./pages/Styles";
import MaterialsPage from "./pages/Materials";
import OriginsPage from "./pages/Origins";
import SizesPage from "./pages/Sizes";
import PromotionsPage from "./pages/Promotions";
import ProductPage from "./pages/Products";
import ProductDetailsPage from "./pages/ProductDetails";
import { ToastContainer } from "react-toastify";
import PrivateRouter from "./components/privateRouter/PrivateRouter";

function App() {
  return (
    <div className="App">
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
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path="/*" element={<PrivateRouter />}>
            <Route path={""} element={<Home />} />
            <Route path={"dashboard"} element={<Home />} />
            <Route path={"tables"} element={<Tables />} />
            <Route path={"rtl"} element={<Rtl />} />
            <Route path={"billing"} element={<Billing />} />
            <Route path={"profile"} element={<Profile />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path={"styles"} element={<StylesPage />} />
            <Route path={"materials"} element={<MaterialsPage />} />
            <Route path={"origins"} element={<OriginsPage />} />
            <Route path={"sizes"} element={<SizesPage />} />
            <Route path={"promotions"} element={<PromotionsPage />} />
            <Route path={"products"} element={<ProductPage />} />
            <Route path={"product-details"} element={<ProductDetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
