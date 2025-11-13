// src/components/TestimonialSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "CEO, TechFlow",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "HalalKaj helped us hire a top-tier developer in just 3 days. The quality of talent is unmatched!",
    rating: 5,
  },
  {
    name: "Rahim Khan",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I've earned over $50K in the last year. The platform is fair, transparent, and pays on time.",
    rating: 5,
  },
  {
    name: "Ayesha Rahman",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "From logo to full website – everything done by HalalKaj freelancers. Highly recommend!",
    rating: 5,
  },
  {
    name: "Omar Faruk",
    role: "Marketing Director",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    text: "Our social media grew 300% thanks to their expert marketers. Best investment we made.",
    rating: 5,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            What Our <span className="text-warning">Users Say</span>
          </h2>
          <p className="mt-3 text-gray-600">Trusted by thousands of businesses and freelancers</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonial-swiper pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-md"
                    />
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-800">{t.name}</h4>
                      <p className="text-sm text-gray-600">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">"{t.text}"</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;