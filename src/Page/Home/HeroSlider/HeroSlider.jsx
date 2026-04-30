import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi"; // npm install react-icons

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const SlideItem = ({ title, subtitle, description, buttonText, image }) => (
  <div className="relative min-h-[500px] md:min-h-[600px] flex items-center bg-base-200 py-12">
    {/* Background Decorative Glow */}
    <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-[100px] rounded-full" />

    <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-6 text-center md:text-left"
      >
        <span className="badge badge-primary badge-outline font-bold tracking-widest uppercase py-3 px-5">
          {subtitle}
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-base-content leading-tight">
          {title.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-primary">{title.split(" ").pop()}</span>
        </h1>
        <p className="text-base-content/70 text-lg md:text-xl max-w-md mx-auto md:mx-0">
          {description}
        </p>
        <div className="pt-2">
          <button className="btn btn-primary btn-lg rounded-2xl group px-10 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            {buttonText}
            <HiOutlineChevronRight className="text-2xl group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex justify-center"
      >
        <motion.img
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          src={image}
          alt={title}
          className="w-full max-w-[380px] lg:max-w-[480px] drop-shadow-2xl"
        />
      </motion.div>
    </div>
  </div>
);

const HeroSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const slides = [
    {
      subtitle: "Clean City Initiative",
      title: "Keep Our City Clean",
      description:
        "Submit garbage reports instantly and help our community maintain a healthy, beautiful environment.",
      buttonText: "Report Now",
      image: "https://i.ibb.co.com/0Wb5JZW/garbage.png",
    },
    {
      subtitle: "Smart Waste",
      title: "Sort Smart Live Green",
      description:
        "Small actions lead to big changes. Discover how professional recycling methods protect our future.",
      buttonText: "Learn More",
      image: "https://i.ibb.co.com/tTqNhNmB/recycling.png",
    },
  ];

  return (
    <div className="mt-20 max-w-[1400px] mx-auto px-4 group relative">
      <div className="overflow-hidden rounded-[3rem] shadow-2xl border border-base-300">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="professional-swiper"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <SlideItem {...s} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- CUSTOM NAVIGATION ARROWS --- */}
        <div className="hidden md:block">
          <button
            ref={prevRef}
            className="glass-nav absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 z-20 hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            <HiOutlineChevronLeft className="text-3xl" />
          </button>
          <button
            ref={nextRef}
            className="glass-nav absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 z-20 hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-500"
          >
            <HiOutlineChevronRight className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
