const CallToAction = () => {
  return (
    <section className="w-11/12 max-w-7xl mx-auto py-16">
      <div className="bg-white rounded-xl shadow-md p-10 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Ready to Find Your Next Job?
          </h2>
          <p className="text-gray-600 max-w-xl">
            Join HalalKaj today and explore verified halal job opportunities
            tailored to your skills and experience.
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex gap-4">
          <button className="btn btn-primary text-white px-8 rounded-lg">
            Get Started
          </button>
          <button className="btn btn-outline rounded-lg px-8 btn-warning text-white font-semibold hover:bg-yellow-600">
            Browse Jobs
          </button>
        </div>

      </div>
    </section>
  );
};

export default CallToAction;
