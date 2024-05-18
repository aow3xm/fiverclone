import React, { useRef, useState } from "react";
import { Carousel } from "antd";
import PlayOverlay from "../../PlayOverlay";
import VideoModal from "../VideoModal";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CarouselSection = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({ poster: "", src: "" });
  const carouselRef = useRef(null);

  const handleOpenModal = (poster, src) => {
    setCurrentVideo({ poster, src });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentVideo({ poster: "", src: "" });
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div className="container mx-auto my-20">
      <div className="carousel-container relative px-5">
        <Carousel
          ref={carouselRef}
          draggable
          autoplay
          autoplaySpeed={2000}
          dots={false}
        >
          {data?.map((testimonial, index) => (
            <div key={index} className="carousel-item">
              <div className="testimonial-content flex flex-col md:flex-row">
                <div
                  onClick={() => handleOpenModal(testimonial.image, testimonial.video)}
                  className="testimonial-image w-full md:w-1/2 mb-4 md:mb-0 cursor-pointer"
                >
                  <PlayOverlay src={testimonial.image} />
                </div>
                <div className="testimonial-info w-full md:w-1/2 md:pl-8 select-none">
                  <div className="testimonial-author flex items-center mb-4">
                    <p className="author-name text-xl md:text-2xl font-bold relative pr-4 after:content-[''] after:absolute after:border after:top-1/2 after:right-0 after:transform after:-translate-y-1/2 after:h-2/3">
                      {testimonial.name}
                    </p>
                    <img
                      src={`assets/images/brands/${testimonial.company}`}
                      alt={testimonial.company}
                      className="company-logo inline-block h-8 md:h-8 mt-2"
                    />
                  </div>
                  <i className="testimonial-quote text-green-800 text-lg md:text-xl">
                    {testimonial.quote}
                  </i>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="carousel-actions">
          <button
            onClick={handlePrev}
            className="prev-button text-2xl absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
          >
            <LeftOutlined />
          </button>
          <button
            onClick={handleNext}
            className="next-button text-2xl absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
          >
            <RightOutlined />
          </button>
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        poster={currentVideo.poster}
        src={currentVideo.src}
      />
    </div>
  );
};

export default CarouselSection;
