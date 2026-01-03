const HowItWorks = () => {
  return (
    <section className="w-11/12 max-w-7xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          How <span className="text-warning">HalalKaj</span> Works
        </h2>
        <p className="mt-2 text-gray-600">
          Simple steps to get hired faster
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { step: '01', title: 'Create Account', desc: 'Register and complete your profile' },
          { step: '02', title: 'Browse Jobs', desc: 'Find halal jobs that match your skills' },
          { step: '03', title: 'Apply & Get Hired', desc: 'Apply and communicate with employers' }
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-warning mb-3">{item.step}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
