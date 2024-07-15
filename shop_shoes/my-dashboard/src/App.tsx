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
import UserForm from "../src/components/Form/UserForm";
import UserList from "../src/components/List/UserList";
import BrandList from "./components/List/BrandsList";
import BrandForm from "./components/Form/BrandsForm";
import ProductLineList from "./components/List/ProductLineList";
import ProductLineForm from "./components/Form/ProductLineForm";

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
            <Route path={"users"} element={<UserList />} />
            <Route path={"users/create"} element={<UserForm />} />

            {/* Thêm route cho BrandsList và BrandsForm */}
            <Route path="brands" element={<BrandList />} />
            <Route path="brands/create" element={<BrandForm />} />

            {/* Thêm route cho BrandsList và BrandsForm */}
            <Route path="brands" element={<BrandList />} />
            <Route path="brands/create" element={<BrandForm />} />
            {/* Thêm route cho ProductLineList và ProductLineForm */}

            <Route path="product-lines" element={<ProductLineList />} />

            <Route path="product-lines/create" element={<ProductLineForm />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
