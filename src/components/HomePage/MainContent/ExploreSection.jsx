import React from "react";

const ExploreSection = ({data}) => {
  return (
    <div className="explore-section container mx-auto mb-20">
      <h3 className="section-title text-4xl">Explore the marketplace</h3>
      <div className="explore-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8 gap-10 justify-items-center">
        {data?.map((item, index) => (
          <div key={index} className="explore-item flex flex-col items-center cursor-pointer hover:text-blue-500 duration-300">
            <img
              src={item.image}
              alt={item.title}
              className="explore-icon w-12 h-12"
            />
            <span className="explore-title mt-2 text-center">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSection;
