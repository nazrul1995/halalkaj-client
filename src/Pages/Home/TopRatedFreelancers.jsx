import React from "react";

const TopRatedFreelancers = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Top Rated Freelancers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Meet our highest-rated professionals ready to bring your projects to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Freelancer Card 1 */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group">
            
            <div className="relative mb-6">
              <img
                src="https://via.placeholder.com/150"
                alt="Freelancer"
                className="w-28 h-28 rounded-full mx-auto border-4 border-gray-200 dark:border-slate-600"
              />

              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 badge badge-success text-white">
                Online
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              John Doe
            </h3>

            <p className="text-primary font-medium mb-3">
              Web Developer
            </p>

            <div className="flex justify-center items-center mb-4 text-sm">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                4.9 (120 reviews)
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="badge badge-outline badge-sm">React</span>
              <span className="badge badge-outline badge-sm">Node.js</span>
              <span className="badge badge-outline badge-sm">MongoDB</span>
            </div>

            <button className="btn btn-outline btn-sm rounded-full px-4 border-primary text-primary hover:bg-primary hover:text-white">
              View Profile
            </button>
          </div>

          {/* Freelancer Card 2 */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group">

            <div className="relative mb-6">
              <img
                src="https://via.placeholder.com/150"
                alt="Freelancer"
                className="w-28 h-28 rounded-full mx-auto border-4 border-gray-200 dark:border-slate-600"
              />

              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 badge badge-success text-white">
                Online
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              Jane Smith
            </h3>

            <p className="text-primary font-medium mb-3">
              Graphic Designer
            </p>

            <div className="flex justify-center items-center mb-4 text-sm">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                4.8 (95 reviews)
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="badge badge-outline badge-sm">Photoshop</span>
              <span className="badge badge-outline badge-sm">Illustrator</span>
              <span className="badge badge-outline badge-sm">Figma</span>
            </div>

            <button className="btn btn-outline btn-sm rounded-full px-4 border-primary text-primary hover:bg-primary hover:text-white">
              View Profile
            </button>
          </div>

          {/* Freelancer Card 3 */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group">

            <div className="relative mb-6">
              <img
                src="https://via.placeholder.com/150"
                alt="Freelancer"
                className="w-28 h-28 rounded-full mx-auto border-4 border-gray-200 dark:border-slate-600"
              />

              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 badge badge-success text-white">
                Online
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              Mike Johnson
            </h3>

            <p className="text-primary font-medium mb-3">
              Content Writer
            </p>

            <div className="flex justify-center items-center mb-4 text-sm">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                4.7 (85 reviews)
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="badge badge-outline badge-sm">SEO</span>
              <span className="badge badge-outline badge-sm">Copywriting</span>
              <span className="badge badge-outline badge-sm">Blogging</span>
            </div>

            <button className="btn btn-outline btn-sm rounded-full px-4 border-primary text-primary hover:bg-primary hover:text-white">
              View Profile
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopRatedFreelancers;