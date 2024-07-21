import React from "react";
import Header from "../home/Header/Header";
import HeaderBottom from "../home/Header/HeaderBottom";
import SpecialCase from "../SpecialCase/SpecialCase";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../home/Footer/Footer";
import FooterBottom from "../home/Footer/FooterBottom";

export default function Layout(props) {
  return (
    <>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      {props.children}
      <Outlet />
      <Footer />
      <FooterBottom />
    </>
  );
}
