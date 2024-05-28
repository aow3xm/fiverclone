import React, { useEffect } from "react";
import InfoUser from "../../components/Profile/InfoUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLocal } from "../../services/userLocal";
import {
  getRentJobsAction,
  initUserFromStorage,
} from "../../redux/actions/userActions";
import RentJob from "../../components/Profile/RentJob";
import { pagePaths } from "../../paths";

const InfoUserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = userLocal.get();
    if (user) {
      dispatch(initUserFromStorage(user));
      dispatch(getRentJobsAction(user));
    } else {
      navigate(pagePaths.signIn);
    }
  }, [dispatch, navigate]);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-center gap-5">
      <div className="w-full lg:w-2/5">
        <InfoUser />
      </div>
      <div className="w-full lg:w-3/5">
        <RentJob />
      </div>
    </div>
  );
};

export default InfoUserPage;
