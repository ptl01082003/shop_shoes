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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BrandsPage from "./pages/Brands";

import StylesPage from "./pages/Styles";
import MaterialsPage from "./pages/Materials";
import OriginsPage from "./pages/Origins";
import SizesPage from "./pages/Sizes";
import PromotionsPage from "./pages/Promotions";
import ProductPage from "./pages/Products";

function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path="/*" element={<Main />}>
            <Route path={""} element={<Home />} />
            <Route path={"dashboard"} element={<Home />} />
            <Route path={"tables"} element={<Tables />} />
            <Route path={"rtl"} element={<Rtl />} />
            <Route path={"billing"} element={<Billing />} />
            <Route path={"profile"} element={<Profile />} />

            {/* Thêm route cho UserList và UserForm */}
            {/* <Route path={"users"} element={<UserList />} /> */}

            {/* Thêm route cho BrandsList và BrandsForm */}
            <Route path="brands" element={<BrandsPage />} />

            <Route path={"styles"} element={<StylesPage />} />
            <Route path={"materials"} element={<MaterialsPage />} />
            <Route path={"origins"} element={<OriginsPage />} />
            <Route path={"sizes"} element={<SizesPage />} />
            <Route path={"promotions"} element={<PromotionsPage />} />
            <Route path={"products"} element={<ProductPage />} />
            {/* Thêm route cho ProductLineList và ProductLineForm */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
