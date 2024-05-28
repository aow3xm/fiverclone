import { Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShowEmpty from "../Loading";

const checkImageURL = (url) => url || "/assets/images/404.jpg";

const JobTitleCard = ({ data }) => {
  const jobTitle = useSelector((state) => state.jobs.jobTitle[0]);

  if (!jobTitle) {
    return <ShowEmpty />;
  }

  const { tenLoaiCongViec, dsNhomChiTietLoai } = jobTitle;

  if (!dsNhomChiTietLoai || dsNhomChiTietLoai.length === 0) {
    return <ShowEmpty />;
  }

  return (
    <div className="container mx-auto mt-5 space-y-20 text-gray-600">
      <div className="space-y-5">
        <h3 className=" text-2xl font-bold text-gray-600">
          Explore {tenLoaiCongViec}
        </h3>
        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
          {dsNhomChiTietLoai?.map((nhom) => (
            <div key={nhom.id} className="flex flex-col w-60 lg:w-80">
              <div className="w-full h-40 overflow-hidden rounded-lg">
                <img
                  src={checkImageURL(nhom.hinhAnh)}
                  alt={nhom.tenNhom}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="mt-2 text-lg font-semibold text-gray-700 p-2">
                  {nhom.tenNhom.slice(0, 20)}
                </h4>
                {nhom.dsChiTietLoai?.map((chiTiet) => (
                  <Link
                    key={chiTiet.id}
                    to={`/categories/${chiTiet.id}`}
                    className="mt-2 text-gray-600 hover:bg-gray-200 duration-300 rounded p-2"
                  >
                    {chiTiet.tenChiTiet.slice(0, 25)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="font-bold text-3xl">
          Services Related To {tenLoaiCongViec}
        </h1>
        <div className="flex gap-3 flex-wrap justify-center items-center">
          {data?.map((item, index) => (
            <Tag key={index} color="geekblue">
              <span className="text-sm">{item}</span>
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobTitleCard;
