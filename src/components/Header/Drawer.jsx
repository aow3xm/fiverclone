import React, { useState } from "react";
import { Drawer as AntdDrawer, Button } from "antd";
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
          <div className="flex flex-col gap-3 items-start">
            <NavLink to={pagePaths.profile} onClick={onClose}>
              {auth?.info?.email}
            </NavLink>
            <Button danger onClick={handleLogout}>
              Sign out
            </Button>
            <Button type="primary">
              <NavLink to={pagePaths.admin}>Go to admin dashboard</NavLink>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <NavLink to={pagePaths.signIn} onClick={onClose}>
              Sign in
            </NavLink>
            <NavLink to={pagePaths.signUp} onClick={onClose}>
              Sign up
            </NavLink>
          </div>
        )}
      </AntdDrawer>
    </>
  );
};

export default Drawer;
