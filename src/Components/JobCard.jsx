import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./Provider/AuthContext";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  const { user } = useContext(AuthContext);
  const [applied, setApplied] = useState(false);

  const {
    title,
    description,
    price,
    jobType,
    postedBy,
    skills = [],
    postedAt,
    coverImage,
    userEmail, // Job পোস্ট করার ইউজারের ইমেইল
  } = job;

  const formattedDate = new Date(postedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleAcceptedTask = async () => {
    if (applied) return; // Prevent double click

    // Prevent user from applying to own job
    if (userEmail === user.email) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "You cannot apply to your own job!",
      });
      return;
    }

    try {
      const addedTask = {
        jobId: job._id,
        title: job.title,
        category: job.category,
        summary: job.summary,
        coverImage: job.coverImage,
        created_at: new Date(),
        accepted_by: user.email,
      };

      const res = await fetch(`https://halalkaj-server.vercel.app/accepted-task-collection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(addedTask),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to apply");
      }

      Swal.fire({
        icon: "success",
        title: "Successfully applied!",
        showConfirmButton: false,
        timer: 1500,
      });

      setApplied(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err.message,
      });
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col overflow-hidden group">
      {/* Cover Image */}
      <div className="relative w-full h-44 overflow-hidden">
        <img
          src={coverImage || "https://via.placeholder.com/400x250?text=Job+Cover"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <span className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {jobType || "Remote"}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-gray-800 font-semibold">{postedBy || "John Doe"}</h3>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-indigo-600">{price ? `$${price}` : "N/A"}</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description || "Exciting opportunity for skilled professionals to join a dynamic team."}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {skills.slice(0, 3).map((skill, i) => (
            <span
              key={i}
              className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full border border-indigo-100"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full">
              +{skills.length - 3}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={handleAcceptedTask}
            disabled={applied}
            className={`bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold py-2 rounded-md hover:shadow-md hover:scale-105 transition-transform duration-300 ${
              applied ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {applied ? "Applied" : "APPLY NOW"}
          </button>

          <Link
            to={`/all-jobs/${job._id}`}
            rel="noopener noreferrer"
            className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 rounded-md hover:shadow-md hover:scale-105 transition-transform duration-300"
          >
            VIEW JOB
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
