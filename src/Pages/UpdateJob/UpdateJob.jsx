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
            confirmButtonColor: "#3085d6",
          }).then(() => navigate(`/`));
        } else {
          Swal.fire({
            title: "Update Failed",
            text: "Maybe you are not the owner or no changes were made.",
            icon: "warning",
            confirmButtonColor: "#f59e0b",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while updating the job.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading job data...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        {error}
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Job not found
      </div>
    );

  return (
    <div className="w-11/12 mx-auto py-10">
      <Link
        to={`/allJobs/${id}`}
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Job Details
      </Link>

      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Update Job</h2>

      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto"
      >
        {/* Job Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={job.title}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Category (Select Dropdown) */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">
            Category
          </label>
          <select
            name="category"
            defaultValue={job.category}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option disabled value="">
              Select a category
            </option>
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
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">
            Summary
          </label>
          <textarea
            name="summary"
            rows="5"
            defaultValue={job.summary}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        {/* Cover Image */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            defaultValue={job.coverImage}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-md hover:scale-105 transition duration-300"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
