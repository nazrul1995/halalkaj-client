// Banner.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router";

const Banner = () => {
  const slides = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        loop={true}
        autoplay={{ delay: 5000 }}
        effect="fade"
        modules={[Autoplay, EffectFade]}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-full bg-cover bg-center animate-zoom" style={{ backgroundImage: `url(${img})` }}></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10 px-6 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Hire <span className="text-yellow-400">Top Talent</span> <br /> across the Globe
        </h1>
        <p className="text-lg text-white/90 mb-6">
          Thousands of Small businesses & Entrepreneurs use FreeAgent to get their Job done
        </p>

        <div className="flex flex-col md:flex-row gap-3 bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full mx-auto p-2">
          <input type="text" placeholder="Job title, keywords..." className="flex-1 px-4 py-3 rounded-md focus:outline-none border border-gray-200" />
          <select className="px-4 py-3 border-l border-gray-200 focus:outline-none rounded-md md:rounded-none">
            <option>Employers</option>
            <option>Freelancers</option>
          </select>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-md md:rounded-none transition">
            Search
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-300">
          Popular Searches: Designer, Developer, Web Design, Logo Design, WordPress <br />
          <Link to="#" className="text-yellow-400 underline">
            Advanced Search
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Banner;
