import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "./index.css";
import Billing from "./pages/Billing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Rtl from "./pages/Rtl";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Tables from "./pages/Tables";

import { ToastContainer } from "react-toastify";
import PrivateRouter from "./components/privateRouter/PrivateRouter";
import BrandsPage from "./pages/Brands";
import StylesPage from "./pages/Styles";
import MaterialsPage from "./pages/Materials";
import OriginsPage from "./pages/Origins";
import SizePage from "./pages/Sizes";
import PromotionsPage from "./pages/Promotions";
import ProductPage from "./pages/Products";
import VouchersPage from "./pages/Vouchers";

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
            <Route path={"sizes"} element={<SizePage />} />
            <Route path={"promotions"} element={<PromotionsPage />} />
            <Route path={"products"} element={<ProductPage />} />
            <Route path={"vouchers"} element={<VouchersPage />} />
            {/* <Route path={"product-details"} element={<ProductDetailsPage />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
