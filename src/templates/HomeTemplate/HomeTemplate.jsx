import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import PageFooter from "../../components/Footer/Footer";
import { userLocal } from "../../services/userLocal";
import { useDispatch } from "react-redux";
import { initUserFromStorage } from "../../redux/actions/userActions";


const HomeTemplate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = userLocal.get();
    console.log(user)
    if (user) {
      dispatch(initUserFromStorage(user));
    }
  }, [dispatch]);
  return (
    <div>
      <Header  />
      <Outlet />
      <PageFooter />
    </div>
  );
};

export default HomeTemplate;
