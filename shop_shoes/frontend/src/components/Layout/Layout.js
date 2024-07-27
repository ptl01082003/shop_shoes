import React, { useEffect } from "react";
import Footer from "../home/Footer/Footer";
import FooterBottom from "../home/Footer/FooterBottom";
import Header from "../home/Header/Header";
import SpecialCase from "../SpecialCase/SpecialCase";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KEY_STORAGE } from "../../constants";
import { fetchGetUserInfo } from "../../redux/thunks/userThunk";
import { fetchGetLstCarts } from "../../redux/thunks/cartThunk";

export default function Layout(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(KEY_STORAGE.TOKEN);
    if (token) {
      dispatch(fetchGetUserInfo());
      dispatch(fetchGetLstCarts());
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet/>
      <Footer />
      <FooterBottom />
    </>
  );
}
