// Banner.jsx
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const Banner = () => {
  const containerRef = useRef();
  const titleRef = useRef();
  const highlightRef = useRef();
  const subtitleRef = useRef();
  const searchBarRef = useRef();
  const popularRef = useRef();

  const slides = [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  ];

  // GSAP Text Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Main Title (Letter by letter)
    tl.from(titleRef.current.querySelectorAll(".char"), {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: "back.out(1.7)",
    });

    // 2. Highlight "Top Talent"
    tl.from(highlightRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.7,
    }, "-=0.6");

    // 3. Subtitle
    tl.from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, "-=0.5");

    // 4. Search Bar (Slide + Scale)
    tl.from(searchBarRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: "back.out(1.4)",
    }, "-=0.4");

    // 5. Popular Searches
    tl.from(popularRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.7,
    }, "-=0.3");

  }, { scope: containerRef });

  // Split Title into characters
  const titleText = "Hire Top Talent across the Globe";
  const chars = titleText.split("").map((char, i) => (
    <span key={i} className="char inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Swiper Background */}
      <Swiper
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        modules={[Autoplay, EffectFade]}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-full bg-cover bg-center animate-zoom"
              style={{ backgroundImage: `url(${img})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10 px-6 text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          <span ref={titleRef}>{chars}</span>
          <br />
          <span ref={highlightRef} className="text-yellow-400">
            FreeAgent
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
          Thousands of Small businesses & Entrepreneurs use FreeAgent to get their Job done
        </p>

        {/* Search Bar */}
        <div
          ref={searchBarRef}
          className="flex flex-col md:flex-row gap-0 bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full mx-auto"
        >
          <input
            type="text"
            placeholder="Job title, keywords..."
            className="flex-1 px-5 py-4 text-gray-700 focus:outline-none border-r border-gray-200"
          />
          <select className="px-5 py-4 border-r border-gray-200 focus:outline-none bg-gray-50">
            <option>Employers</option>
            <option>Freelancers</option>
          </select>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-8 py-4 transition-all duration-300 transform hover:scale-105">
            Search
          </button>
        </div>

        {/* Popular Searches */}
        <p ref={popularRef} className="mt-6 text-sm text-gray-300">
          Popular Searches: Designer, Developer, Web Design, Logo Design, WordPress <br />
          <Link to="#" className="text-yellow-400 underline hover:text-yellow-300 transition">
            Advanced Search
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Banner;