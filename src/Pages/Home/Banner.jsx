import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

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
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        effect="fade"
        modules={[Autoplay, EffectFade]}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-full bg-cover bg-center animate-zoom"
              style={{
                backgroundImage: `url(${img})`,
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
        <div className="text-center text-white max-w-3xl px-6">
          <h1 className="text-5xl font-bold">
            Hire <span className="text-yellow-400">Top Talent</span> <br />
            across the Globe
          </h1>
          <p className="mt-4 text-lg">
            Thousands of Small businesses & Entrepreneurs use FreeAgent to get
            their Job done
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
