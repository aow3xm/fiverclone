import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initUserFromStorage } from "../../redux/actions/userActions";
import { userLocal } from "../../services/userLocal";
import PageFooter from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const AuthTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const user = userLocal.get();
    if (user) {
      dispatch(initUserFromStorage(user));
    }
    if (authState.user) {
      navigate('/');
    }
  }, [authState.user, dispatch, navigate]);

  return (
    <div>
      <Header />
      <Outlet />
      <PageFooter />
    </div>
  );
};

export default AuthTemplate;
