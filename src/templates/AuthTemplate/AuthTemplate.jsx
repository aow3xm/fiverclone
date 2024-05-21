import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import {  useSelector } from "react-redux";


const AuthTemplate = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.user) {
      navigate('/'); 
    }
  }, [authState, navigate]);
  return (
    <div>
      <Header />
      <Outlet />
      <PageFooter />
    </div>
  );
};

export default AuthTemplate;
