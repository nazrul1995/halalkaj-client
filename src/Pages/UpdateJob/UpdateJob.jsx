import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { AuthContext } from "../../Components/Provider/AuthContext";
import Swal from "sweetalert2";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/alljobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load job details");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedJob = {
      title: form.title.value,
      category: form.category.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
      userEmail: user?.email,
    };

    fetch(`http://localhost:3000/updateJob/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Job Updated!",
            text: "Your job has been updated successfully.",
            icon: "success",
            confirmButtonColor: "#10b981",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => navigate(`/`));
        } else {
          Swal.fire({
            title: "No Changes",
            text: "No modifications were made or you're not the owner.",
            icon: "info",
            confirmButtonColor: "#facc15",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while updating the job.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-warning mb-4"></span>
          <p className="text-xl font-medium text-gray-700">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
          <p className="text-xl font-bold text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <i className="fas fa-search text-6xl text-gray-400 mb-4"></i>
          <p className="text-xl font-bold text-gray-600">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <Link
                to={`/allJobs/${id}`}
                className="inline-flex items-center gap-2 text-warning hover:text-yellow-600 font-medium mb-3 transition-colors"
              >
                <i className="fas fa-arrow-left"></i> Back to Job Details
              </Link>
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-900 to-green-700">
                Edit <span className="text-warning">Job Post</span>
              </h1>
              <p className="text-lg text-gray-600 mt-2">Update your job listing with new details</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-4 rounded-xl shadow-inner">
              <p className="text-sm font-medium text-amber-800">Job ID: {id.slice(-6)}</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-200">
          <form onSubmit={handleUpdate} className="space-y-8">

            {/* Cover Image URL */}
            <div className="group">
              <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-image text-warning"></i>
                Cover Image URL
              </label>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-56 h-40 bg-gray-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 shadow-inner group-hover:border-warning transition-all">
                  {job.coverImage ? (
                    <img
                      src={job.coverImage}
                      alt="Current cover"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x250?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <i className="fas fa-image text-6xl"></i>
                    </div>
                  )}
                </div>
                <input
                  type="url"
                  name="coverImage"
                  defaultValue={job.coverImage}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full h-16 text-lg focus:ring-2 focus:ring-warning focus:ring-opacity-50 transition-all"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Paste a direct image URL (jpg, png, webp, gif)</p>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-heading text-warning"></i>
                Job Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={job.title}
                required
                placeholder="e.g. Need a Modern Logo for Tech Startup"
                className="input input-bordered w-full h-16 text-lg focus:ring-2 focus:ring-warning focus:ring-opacity-50 transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-tags text-warning"></i>
                Category
              </label>
              <select
                name="category"
                defaultValue={job.category}
                required
                className="select select-bordered w-full h-16 text-lg focus:ring-2 focus:ring-warning focus:ring-opacity-50 transition-all"
              >
                <option disabled value="">Select a category</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="SEO">SEO</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <i className="fas fa-align-left text-warning"></i>
                Job Summary
              </label>
              <textarea
                name="summary"
                rows="8"
                defaultValue={job.summary}
                required
                placeholder="Describe your project briefly: goals, requirements, deliverables..."
                className="textarea textarea-bordered w-full text-lg focus:ring-2 focus:ring-warning focus:ring-opacity-50 resize-none transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8">
              <Link
                to={`/allJobs/${id}`}
                className="btn btn-ghost border-2 border-gray-300 text-red-600 hover:bg-red-50 hover:border-red-400 rounded-full px-8 py-3 text-lg font-semibold transition-all transform hover:scale-105"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn bg-green-900 hover:bg-green-800 text-white rounded-full px-10 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3"
              >
                <i className="fas fa-save"></i>
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;