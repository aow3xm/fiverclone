import React, { useState } from "react";
import { Carousel as AntdCarousel } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./Carousel.module.css";
import { pagePaths } from "../../../paths";

const Carousel = ({ carouselImages, popularSearches, partnerLogos }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(pagePaths.result(search));
    }
  };

  return (
    <section className="carousel relative">
      <AntdCarousel dots={false} autoplay autoplaySpeed={2000} effect="fade">
        {carouselImages?.map((image, index) => (
          <div key={index} className="h-[500px] md:h-[800px]">
            <img
              className={styles.carouselStyle}
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </AntdCarousel>
      <div className="container mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="form w-full text-white space-y-5">
          <h3 className="font-semibold text-2xl sm:text-4 lg:text-5xl">
            Find the perfect <span className="italic">freelance</span>
            <br />
            services for your business
          </h3>
          <div className="flex flex-col sm:flex-row w-full lg:w-3/5">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <input
                className="focus:outline-none rounded-t-md sm:rounded-l-md sm:rounded-r-none p-3 w-full sm:w-2/3 h-10 sm:h-12 text-black"
                type="text"
                placeholder="Try 'Mobile app'"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-b-md sm:rounded-r-md sm:rounded-l-none px-4 h-10 sm:h-12 bg-green-700 hover:bg-green-800 duration-300 font-bold"
              >
                Search
              </button>
            </form>
          </div>
          <div className="hidden xl:flex items-center space-x-3">
            <span>Popular:</span>
            {popularSearches?.map((search, index) => (
              <button key={index} className={styles.btn}>
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-slate-100">
        <div className="container mx-auto flex justify-center space-x-5">
          {partnerLogos?.map((logo, index) => (
            <img
              key={index}
              className="w-[50px] lg:w-[75px] h-20 object-contain"
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
