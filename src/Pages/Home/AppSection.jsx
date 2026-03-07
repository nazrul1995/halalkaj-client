import React from "react";
import { FaApple, FaAndroid } from "react-icons/fa";

const AppSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-md p-10 grid md:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Download Our Mobile App
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Manage freelance jobs, connect with clients, and track projects
              easily from your mobile device. Work anytime, anywhere with our
              mobile application.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">

              <button className="btn btn-outline rounded-full flex items-center gap-3 px-6 border-primary text-primary hover:bg-primary hover:text-white">
                <FaApple size={20} />
                App Store
              </button>

              <button className="btn btn-outline rounded-full flex items-center gap-3 px-6 border-primary text-primary hover:bg-primary hover:text-white">
                <FaAndroid size={20} />
                Google Play
              </button>

            </div>

            {/* Small Stats */}
            <div className="flex gap-8 text-sm text-gray-500 dark:text-gray-400">
              <span>⭐ 4.8 Rating</span>
              <span>⬇ 10K+ Downloads</span>
              <span>🕒 24/7 Support</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5738/5738130.png"
              alt="App preview"
              className="rounded-xl shadow-lg hover:shadow-xl transition"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default AppSection;