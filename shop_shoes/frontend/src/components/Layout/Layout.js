import React from "react";
import Footer from "../home/Footer/Footer";
import FooterBottom from "../home/Footer/FooterBottom";
import Header from "../home/Header/Header";
import SpecialCase from "../SpecialCase/SpecialCase";

export default function Layout(props) {
  return (
    <>
      <Header />
      <SpecialCase />
      {props.children}
      <Footer />
      <FooterBottom />
    </>
  );
}
