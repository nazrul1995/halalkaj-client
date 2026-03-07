import React from "react";
import { FaBriefcase, FaUsers, FaSmile, FaTags } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    { icon: FaBriefcase, number: "10,000+", label: "Jobs Posted" },
    { icon: FaUsers, number: "5,000+", label: "Active Freelancers" },
    { icon: FaSmile, number: "2,000+", label: "Happy Clients" },
    { icon: FaTags, number: "500+", label: "Categories" },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Join thousands of freelancers and clients working together on our platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-md hover:shadow-xl transition p-6 text-center"
            >
              <div className="flex justify-center mb-4 text-primary text-2xl">
                <stat.icon />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {stat.number}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-md">
            <p className="text-xl font-bold text-primary">98%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Client Satisfaction
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-md">
            <p className="text-xl font-bold text-primary">24hrs</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Average Response
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-md">
            <p className="text-xl font-bold text-primary">$2M+</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transactions
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Statistics;