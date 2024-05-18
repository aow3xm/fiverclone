import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchJobTitle } from "../../redux/actions/jobsActions";

const Banner = ({ data }) => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchJobTitle(params.id));
  }, [dispatch, params.id]);

  const jobTitle = useSelector((state) => state.jobs.jobTitle[0]);

  return (
    <div className="flex flex-col gap-5">
      <div className="h-64 bg-green-950 rounded-xl flex flex-col justify-center gap-3 items-center text-white">
        <h3 className="text-4xl font-bold">{jobTitle?.tenLoaiCongViec}</h3>
        <p className="font-semibold text-xl">Designs to make you stand out.</p>
        <button className="bg-transparent hover:bg-white hover:text-black duration-300 border p-3 rounded-lg ">
          How fiverr works
        </button>
      </div>

      <div className="container mx-auto text-gray-600 space-y-4">
        <h3 className="text-2xl font-semibold">
          Most popular in {jobTitle?.tenLoaiCongViec}
        </h3>
        <div className="flex flex-wrap gap-2">
          {data?.map((item) => (
            <div className="rounded-lg border shadow-lg flex flex-row items-center gap-2 p-3">
              <img className="w-14" src={item.image} alt={item.title} />
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
