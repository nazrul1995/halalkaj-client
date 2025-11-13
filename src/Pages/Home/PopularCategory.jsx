// src/components/CategorySection.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    fetch("https://halalkaj-server.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500">Loading categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Explore by <span className="text-yellow-500">Category</span>
          </h2>
          <p className="mt-3 text-gray-600">Find the perfect service for your project</p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="category-swiper"
        >
          {categories.slice(0,7).map((cat, i) => (
            <SwiperSlide key={i}>
              <div className="group cursor-pointer">
                <div className="bg-white rounded-xl shadow-md overflow-hidden text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  {/* Image */}
                  <div className="h-32 md:h-40 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.category}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Category Name */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                      {cat.category}
                    </h3>
                  </div>
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