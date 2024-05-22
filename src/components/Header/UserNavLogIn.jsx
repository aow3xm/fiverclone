import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";

const UserNavLogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state?.auth);
  console.log('info: ', info);
  const initial = info?.name ? info.name.charAt(0).toUpperCase() : "";
  const navigateUserPage = (id) => {
    navigate(`infoUser/${id}`);
  };
  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          navigateUserPage(info?.id);
        }}
        className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-white text-lg mx-2"
      >
        {initial}
      </button>
      <button
        onClick={() => {
          navigateUserPage(info?.id);
        }}
      >
        {info?.name}
      </button>
      <button
        onClick={() => {
          dispatch(logout());
        }}
        className="px-4 py-1 rounded-sm border border-white shadow-md hover:bg-white hover:text-black duration-300 mx-4"
      >
        Log Out
      </button>
    </div>
  );
};

export default UserNavLogIn;
