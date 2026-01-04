import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";
// Images
import amazon from "../../../../assets/brands/amazon.png";
import amazon_vector from "../../../../assets/brands/amazon_vector.png";
import casio from "../../../../assets/brands/casio.png";
import moonstar from "../../../../assets/brands/moonstar.png";
import randstad from "../../../../assets/brands/randstad.png";
import star from "../../../../assets/brands/star.png";
import star_people from "../../../../assets/brands/start_people.png";

const brandsLogos = [amazon, amazon_vector, casio, moonstar, randstad, star, star_people];

const Brands = () => {
  return (
    <div>
      <h2 className="text-center text-[34px] font-bold my-6">
        We've helped thousands of sales teams
      </h2>
      <Swiper
        modules={[Autoplay]} // ✅ add this
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {brandsLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
