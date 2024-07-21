import React from "react";
import Layout from "../Layout/Layout";
import { Outlet } from "react-router-dom";

export default function PrivateRouter() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
