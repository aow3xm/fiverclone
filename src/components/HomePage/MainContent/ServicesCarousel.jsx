import { Carousel as AntdCarousel } from "antd";
import React, { useRef } from "react";
import styles from "./ServiceCarousel.module.css";
import withResponsive from "../../../HOC/Responsive/WithResponsive";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const ServicesCarousel = ({ isMobile, isTablet, isDesktop, data}) => {
  const carouselRef = useRef(null);

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };



  return (
    <div className="container mx-auto my-20">
      {isMobile && (
        <div className="relative">
          <AntdCarousel
            autoplay={true}
            autoplaySpeed={2000}
            dots={false}
            infinite={true}
            draggable={true}
            slidesToShow={1}
            ref={carouselRef}
            style={{ padding: "0 1.5rem" }}
          >
            {data?.map((item) => (
              <div key={item.id} className="carousel-item w-[150px] h-[200px] border-none outline-none">
                <img className={`carousel-image ${styles.carouselImage}`} src={item.image} alt="" />
              </div>
            ))}
          </AntdCarousel>
          <div className="carousel-action">
            <button
              onClick={handlePrev}
              className="carousel-prev text-2xl absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
            >
              <LeftOutlined />
            </button>
            <button
              onClick={handleNext}
              className="carousel-next text-2xl absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
            >
              <RightOutlined />
            </button>
          </div>
        </div>
      )}
      {(isDesktop || isTablet) && (
        <div className="relative">
          <AntdCarousel
            autoplaySpeed={2000}
            dots={false}
            infinite={true}
            draggable={true}
            slidesToShow={4}
            ref={carouselRef}
            className="carousel px-4 space-x-5"
          >
            {data?.map((item) => (
              <div key={item.id} className="carousel-item w-[150px] h-[200px] border-none outline-none">
                <img className={`carousel-image ${styles.carouselImage}`} src={item.image} alt="" />
              </div>
            ))}
          </AntdCarousel>
          <div className="carousel-action">
            <button
              onClick={handlePrev}
              className="carousel-prev text-2xl absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
            >
              <LeftOutlined />
            </button>
            <button
              onClick={handleNext}
              className="carousel-next text-2xl absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
            >
              <RightOutlined />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withResponsive(ServicesCarousel);