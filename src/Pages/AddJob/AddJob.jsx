// src/pages/AddJobPost.jsx
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Components/Provider/AuthContext";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const categories = [
    "Web Development",
    "Graphic Design",
    "Video Editing",
    "Digital Marketing",
    "Writing & Translation",
    "Mobile Apps",
    "SEO",
    "Virtual Assistant",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.accessToken) {
      Swal.fire("Error", "Please login to post a job.", "error");
      return;
    }

    const formData = new FormData(e.target);
    const jobData = {
      title: formData.get("title"),
      category: formData.get("category"),
      summary: formData.get("summary"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      jobType: formData.get("jobType"),
      coverImage: imageUrl || "https://via.placeholder.com/400x250?text=Job+Cover",
      userEmail: user.email,
      postedBy: user.displayName || user.email.split("@")[0],
    };

    // Validation
    if (!jobData.title || !jobData.category || !jobData.summary || !jobData.price) {
      Swal.fire("Missing Fields", "Please fill all required fields.", "warning");
      return;
    }

    if (imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(imageUrl)) {
      Swal.fire("Invalid URL", "Please enter a valid image URL (jpg, png, etc.).", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://halalkaj-server-mtjhf6suj-nazrul1995s-projects.vercel.appadd-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Job Posted!",
          text: "Your job is live!",
          timer: 2000,
          showConfirmButton: false,
        });
        e.target.reset();
        setImageUrl("");
      } else {
        throw new Error(data.message || "Failed to post job");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Post a <span className="text-success">New Job</span>
          </h1>
          <p className="mt-2 text-gray-600">Hire top talent for your project</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-32 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x250?text=Invalid+URL";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <i className="fas fa-image text-2xl"></i>
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Supported: jpg, png, webp, gif</p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Need a Logo Designer for Startup"
                className="input input-bordered w-full"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select name="category" required className="select select-bordered w-full">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                name="summary"
                required
                rows="3"
                placeholder="Briefly describe your project..."
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                required
                rows="6"
                placeholder="Provide detailed requirements, deliverables, timeline..."
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Price & Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="5"
                  placeholder="e.g. 250"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select name="jobType" className="select select-bordered w-full">
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <a
                href="/my-posted-jobs"
                className="btn btn-ghost text-red-600 border border-gray-300 hover:bg-red-50 hover:border-red-300"
              >
                Cancel
              </a>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-success text-white hover:bg-green-700 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Posting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Post Job
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;