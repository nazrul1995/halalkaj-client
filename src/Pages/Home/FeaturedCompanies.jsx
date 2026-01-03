const FeaturedCompanies = () => {
  return (
    <section className="py-16">
      <div className="w-11/12 max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Featured <span className="text-yellow-500">Companies</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow text-center">
              <p className="font-semibold">Company {i}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCompanies;
