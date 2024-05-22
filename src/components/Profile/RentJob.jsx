import React from "react";
import { useSelector } from "react-redux";
import { Card, Tag, Button } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const RentJob = () => {
  const rentJobs = useSelector((state) => state.auth.rentJobs);

  return (
    <div className="flex flex-col gap-4 ">
      {rentJobs?.map((job) => (
        <Card
          key={job.id}
          className="rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row items-center"
        >
          <div className="flex flex-row items-center w-full md:w-auto">
            <img
              alt={job.congViec.tenCongViec}
              src={job.congViec.hinhAnh}
              className="w-32 h-32 object-cover"
            />
            <div className="p-4 flex flex-col justify-between">
              <h2 className="text-lg font-semibold">
                {job.congViec.tenCongViec}
              </h2>
              <p className="text-gray-500 truncate whitespace-normal">{job.congViec.moTaNgan}</p>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-center mt-2">
              <Tag color={job.hoanThanh ? "green" : "red"}>
                {job.hoanThanh ? (
                  <CheckCircleOutlined />
                ) : (
                  <CloseCircleOutlined />
                )}
                {job.hoanThanh ? "Completed" : "Not Completed"}
              </Tag>
              <span className="text-lg font-semibold">
                ${job.congViec.giaTien}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <NavLink to={`/detail/${job.congViec.id}`}>
                <Button type="primary">View Details</Button>
              </NavLink>
              <span className="text-gray-500">{job.ngayThue}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RentJob;
