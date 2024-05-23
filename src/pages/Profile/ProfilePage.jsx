import React, { useEffect } from "react";
import UserUpdateForm from "../../components/Profile/UpdateProfile";
import UploadAvatar from "../../components/Profile/UpdateAvatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initUserFromStorage } from "../../redux/actions/userActions";
import { userLocal } from "../../services/userLocal";
import { pagePaths } from "../../paths";
import { message } from "antd";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = userLocal.get();
    if (user) {
      dispatch(initUserFromStorage(user));
    } else {
      navigate(pagePaths.signIn);
      message.error("You must be signed in to update your profile");
    }
  }, [dispatch, navigate]);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5">
      <UploadAvatar />
      <UserUpdateForm />
    </div>
  );
};

export default ProfilePage;