import React, { useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import VideoModal from "../VideoModal";
import PlayOverlay from "../../PlayOverlay";

const HeroSection = ({ data }) => {
  const [isOpen, setOpen] = useState(false);

  const handleChange = () => {
    setOpen(!isOpen);
  };

  return (
    <div id="hero-section" className="bg-green-50 text-gray-800 py-10">
      <div className="container mx-auto flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 items-center">
        <div className="hero-text md:w-1/2 flex flex-col space-y-4">
          <h2 className="text-3xl md:text-3xl font-bold">
            A whole world of freelance talent at your fingertips
          </h2>
          {data?.map((item, index) => (
            <div key={index}>
              <div className="feature-item flex items-center space-x-3 font-bold text-sm md:text-xl">
                <CheckCircleOutlined />
                <span>{item.title}</span>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div
          onClick={handleChange}
          className="hero-video md:w-1/2 cursor-pointer"
        >
          <PlayOverlay src="/assets/images/selling.png" />
          <VideoModal
            isOpen={isOpen}
            onClose={handleChange}
            src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7"
            poster="/assets/images/selling.png"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
