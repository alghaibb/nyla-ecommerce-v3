"use client";

import React from "react";
import Slider from "react-slick";
import Slide from "./Slide";

const HeroBanner = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    speed: 1000,
  };

  const slideData = [
    {
      id: 0,
      img: "/slideimage-1.jpg",
    },
    {
      id: 1,
      img: "/slideimage-2.jpg",
    },
    {
      id: 2,
      img: "/slideimage-3.jpg",
    },
  ];

  return (
    <div>
      <div className="overflow-hidden font-custom">
        <Slider {...settings}>
          {slideData.map((item) => (
            <Slide key={item.id} img={item.img} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroBanner;
