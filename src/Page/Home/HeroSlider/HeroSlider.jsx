import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSlider = () => {
  return (
    <div className="mt-18 mb-10 bg-accent-content">
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="bg-accent-content max-w-7xl mx-auto"
      >
        <SwiperSlide>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-accent-content px-6 md:px-10 pt-6 pb-10">
            <div className="md:w-1/2 text-center md:text-left space-y-4">
              <h1 className="text-2xl md:text-3xl lg:4xl font-bold text-accent">
                Personal Fitness Coaching
              </h1>
              <p className="text-sm md:text-md lg:text-lg text-accent">
                Custom workout plans and one-on-one coaching sessions focused on
                fat loss and strength training.
              </p>
              <button className="px-6 py-3 bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105">
                Enroll Now
              </button>
            </div>

            <div className="md:w-1/2 flex justify-center py-8">
              <img
                src="https://i.ibb.co.com/LXW5V1jc/Asset-1.png"
                className="md:h-[400px] h-[200px]"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-accent-content px-6 md:px-10 pt-6 pb-10">
            <div className="md:w-1/2 text-center md:text-left space-y-4">
              <h1 className="text-2xl md:text-3xl lg:4xl font-bold text-accent">
                Yoga & Fitness
              </h1>
              <p className="text-sm md:text-md lg:text-lg text-accent">
                Relax and strengthen your body through guided yoga sessions.
                Perfect for beginners seeking balance.
              </p>
              <button className="px-6 py-3 bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105">
                View Details
              </button>
            </div>

            <div className="md:w-1/2 flex justify-center py-8">
              <img
                src="https://i.ibb.co.com/k2SLz9yy/Asset-1.png"
                className="md:h-[400px] h-[200px]"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-accent-content px-6 md:px-10 pt-6 pb-10">
            <div className="md:w-1/2 text-center md:text-left space-y-4">
              <h1 className="text-2xl md:text-3xl lg:4xl font-bold text-accent">
                Home Gardening Tips
              </h1>
              <p className="text-sm md:text-md lg:text-lg text-accent">
                Get hands-on advice on how to grow herbs, vegetables, and
                flowers in small home spaces.
              </p>
              <button className="px-6 py-3 bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105">
                Join Now
              </button>
            </div>

            <div className="md:w-1/2 flex justify-center py-8">
              <img
                src="https://i.ibb.co.com/hFchg0zx/Asset-1.png"
                className="md:h-[400px] h-[200px]"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
