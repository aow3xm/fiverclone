import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import { Avatar } from "antd";
import { pagePaths } from "../../paths";

const UserNavLogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.info);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          navigate(pagePaths.profile);
        }}
        className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-white text-lg mx-2"
      >
        {auth?.avatar ? (
          <Avatar src={auth?.avatar} size={40} />
        ) : (
          <span>{getInitial(auth?.name)}</span>
        )}
      </button>

      <button
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        className="px-4 py-1 rounded-sm border border-white shadow-md hover:bg-white hover:text-black duration-300 mx-4"
      >
        Log Out
      </button>
      <NavLink to={pagePaths.admin}>Admin area</NavLink>
    </div>
  );
};

export default UserNavLogIn;
