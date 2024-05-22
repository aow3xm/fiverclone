import React, { useEffect } from "react";
import UserUpdateForm from "../../components/Profile/UpdateProfile";
import UploadAvatar from "../../components/Profile/UpdateAvatar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLocal } from "../../services/userLocal";
import { initUserFromStorage } from "../../redux/actions/userActions";

const ProfilePage = () => {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const user = userLocal.get();
    if (user) {
      dispatch(initUserFromStorage(user));
    }
    if (!authState.user) {
      navigate('/auth/signin');
    }
  }, [authState.user, dispatch, navigate]);
  return (
    <div className="container mx-auto flex justify-center gap-5">
      <UploadAvatar />
      <UserUpdateForm />
    </div>
  );
};

export default ProfilePage;
