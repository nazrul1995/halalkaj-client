const CareerBlogs = () => {
  return (
    <section className="w-11/12 max-w-7xl mx-auto py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          Career Tips & Blogs
        </h2>
        <p className="mt-2 text-gray-600">
          Improve your career with expert advice
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-40 bg-gray-200"></div>
            <div className="p-5">
              <h3 className="font-semibold mb-2">
                How to get hired faster in 2025
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                Learn effective strategies to stand out in job applications.
              </p>
              <button className="mt-4 text-primary font-medium">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerBlogs;
