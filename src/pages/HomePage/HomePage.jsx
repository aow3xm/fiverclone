import React from "react";
import Carousel from "../../components/HomePage/Carousel/Carousel";
import ServicesCarousel from "../../components/HomePage/MainContent/ServicesCarousel";
import HeroSection from "../../components/HomePage/MainContent/HeroSection";
import CarouselSection from "../../components/HomePage/MainContent/MainCarousel";
import ExploreSection from "../../components/HomePage/MainContent/ExploreSection";
import {
  carouselImages,
  popularSearches,
  partnerLogos,
  exploreData,
  carouselData,
  heroData,
  serviceCarousel,
} from "./data.js";
const HomePage = () => {
  return (
    <section>
      <Carousel
        carouselImages={carouselImages}
        popularSearches={popularSearches}
        partnerLogos={partnerLogos}
      />
      <ServicesCarousel data={serviceCarousel} />
      <HeroSection data={heroData} />
      <CarouselSection data={carouselData} />
      <ExploreSection data={exploreData} />
    </section>
  );
};

export default HomePage;
