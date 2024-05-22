import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Result
        status="404"
        title="404"
        subTitle="Trang bạn đang tìm kiếm không tồn tại."
        extra={
          <Button type="primary">
            <Link to="/">Quay lại trang chủ</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
