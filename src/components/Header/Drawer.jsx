import React, { useState } from "react";
import { Drawer as AntdDrawer, Avatar, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import { pagePaths } from "../../paths";

const Drawer = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    onClose();
  };

  return (
    <>
      <button className="" onClick={showDrawer}>
        <MenuOutlined />
      </button>
      <AntdDrawer placement="left" width={300} onClose={onClose} open={open}>
        {auth?.user ? (
          <div className="flex flex-col gap-3 items-start w-full">
            <div
              onClick={() => {
                navigate(pagePaths.profile);
              }}
              className="flex gap-2 items-center cursor-pointer w-full"
            >
              <Avatar src={auth?.info?.avatar}></Avatar>
              <NavLink
                to={pagePaths.profile}
                onClick={onClose}
                className="w-full"
              >
                {auth?.info?.email}
              </NavLink>
            </div>
            <div className="flex gap-2">
              <Button danger onClick={handleLogout}>
                Sign out
              </Button>
              <Button type="primary">
                <NavLink to={pagePaths.admin} className="w-full">
                  Admin dashboard
                </NavLink>
              </Button>
            </div>
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <span className="text-gray-600 text-lg">Explore</span>
            </button>
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <span className="text-gray-600 text-lg">Messages</span>
            </button>
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <span className="text-gray-600 text-lg">List</span>
            </button>
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <span className="text-gray-600 text-lg">Orders</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <NavLink
                className="text-gray-600 w-full"
                to={pagePaths.signIn}
                onClick={onClose}
              >
                <span className="text-gray-600 text-lg">Sign in</span>
              </NavLink>
            </button>
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <NavLink
                className="text-gray-600 w-full"
                to={pagePaths.signUp}
                onClick={onClose}
              >
                <span className="text-gray-600 text-lg">Sign up</span>
              </NavLink>
            </button>
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <span className="text-gray-600 text-lg">Explore</span>
            </button>
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <span className="text-gray-600 text-lg">Messages</span>
            </button>
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <span className="text-gray-600 text-lg">List</span>
            </button>
            <button className="hover:bg-gray-200 duration-200 p-3 rounded font-bold text-left border-b w-full">
              <span className="text-gray-600 text-lg">Orders</span>
            </button>
          </div>
        )}
      </AntdDrawer>
    </>
  );
};

export default Drawer;
