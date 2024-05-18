import React from "react";
import { Outlet } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
const AuthTemplate = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <PageFooter />
    </div>
  );
};

export default AuthTemplate;
