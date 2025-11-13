// src/components/CategorySection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { name: "Web Development", icon: "code", color: "bg-blue-500" },
  { name: "Graphic Design", icon: "palette", color: "bg-purple-500" },
  { name: "Video Editing", icon: "video", color: "bg-red-500" },
  { name: "Digital Marketing", icon: "megaphone", color: "bg-green-500" },
  { name: "Writing", icon: "edit", color: "bg-yellow-500" },
  { name: "Mobile Apps", icon: "mobile", color: "bg-indigo-500" },
  { name: "SEO", icon: "search", color: "bg-pink-500" },
  { name: "Virtual Assistant", icon: "headset", color: "bg-teal-500" },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Explore by <span className="text-warning">Category</span>
          </h2>
          <p className="mt-3 text-gray-600">Find the perfect service for your project</p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          autoplay={{ delay: 3000 }}
          loop
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="category-swiper"
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={i}>
              <div className="group cursor-pointer">
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  <div className={`w-16 h-16 ${cat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <i className={`fas fa-${cat.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-warning transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySection;