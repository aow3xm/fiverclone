import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
const AuthTemplate = () => {
  const { inforUser } = useSelector((state)=>state.userReducer);
  console.log("inforUser: ", inforUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (inforUser) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <PageFooter />
    </div>
  );
};

export default AuthTemplate;
