import React, { useState } from "react";
import {Drawer as AntdDrawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
const Drawer = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button className="" onClick={showDrawer}>
        <MenuOutlined />
      </button>
      <AntdDrawer
        placement="left"
      width={300}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </AntdDrawer>
    </>
  );
};
export default Drawer;
