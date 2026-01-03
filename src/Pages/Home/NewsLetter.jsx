import { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      return setError("Email is required");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError("Please enter a valid email address");
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Successfully subscribed to job alerts.");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="w-11/12 max-w-7xl mx-auto py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Info (like listing header area) */}
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-bold text-gray-800">
            Job <span className="text-yellow-500">Alerts</span>
          </h2>
          <p className="mt-2 text-gray-600">
            Get the latest halal job updates directly in your inbox.
          </p>
        </div>

        {/* Right Card (like filter card) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <form onSubmit={handleSubmit}>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary
                    ${error ? "border-red-500" : "border-gray-300"}
                  `}
                  placeholder="example@email.com"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary rounded-lg px-6 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Messages */}
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm mt-2">{success}</p>
              )}

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsLetter;
