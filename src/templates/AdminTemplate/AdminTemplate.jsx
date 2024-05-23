import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  initUserFromStorage,
} from "../../redux/actions/userActions";
import { userLocal } from "../../services/userLocal";
import PageFooter from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { pagePaths } from "../../paths";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";

const AdminTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const { user, info } = auth;
  useEffect(() => {
    const user = userLocal.get();
    if (user) {
      dispatch(initUserFromStorage(user));
    } else {
      navigate(pagePaths.signIn);
      message.error("You must be signed in to enter admin dashboard");
    }
  }, [dispatch, navigate]);
  useEffect(() => {
    if (user) {
      const jwt = jwtDecode(user);
      console.log(jwt);
      dispatch(getUserInfo(jwt.id));
    }
  }, [user, dispatch]);
  useEffect(() => {
    if (info) {
      console.log(info?.role);
      if (!info?.role || info?.role != "ADMIN") {
        navigate(pagePaths.signIn);
        message.error("Unauthorized");
      }
    }
  }, [info, user, navigate]);
  return (
    <div>
      <Header />
      <Outlet />
      <PageFooter />
    </div>
  );
};

export default AdminTemplate;
