import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";

const HomeTemplate = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <PageFooter />
    </div>
  );
};

export default HomeTemplate;
