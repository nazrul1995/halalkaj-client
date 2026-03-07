const WhyChooseUs = () => {
  return (
    <section className="py-16">
      <div className="w-11/12 max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose <span className="text-yellow-500">HalalKaj</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            '100% Halal Jobs',
            'Verified Employers',
            'Easy & Secure Application',
          ].map((text, i) => (
            <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-300">
              <h3 className="text-lg font-semibold">{text}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
