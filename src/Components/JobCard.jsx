import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./Provider/AuthContext";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  const { user } = useContext(AuthContext);
  const [applied, setApplied] = useState(false);
  const {userEmail} = job;
  const handleAcceptedTask = async () => {
    if (applied) return;

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
        postedBy: job.postedBy,
        coverImage: job.coverImage,
        created_at: new Date(),
        accepted_by: user.email,
        accepted_date: new Date()
      };

      const res = await fetch(`http://localhost:3000/accepted-task-collection`, {
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


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };


  return (
    <div className="card bg-white shadow-md border border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
            {job.title}
          </h2>
          <div className="flex gap-2 mt-2">
            <span className="badge badge-outline badge-sm">Fixed</span>
            <span className="badge badge-primary badge-sm">{job.category}</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-circle text-gray-500 hover:text-primary">
          <i className="fa-regular fa-bookmark text-lg"></i>
        </button>
      </div>

      {/* Meta */}
      <div className="text-xs text-gray-500 flex flex-wrap items-center gap-2 mb-3">
        <span>Posted {formatDate(job.postedAt)}</span>
        <span>•</span>
        <span>0 Proposals</span>
        <span>•</span>
        <span className="text-primary font-medium">Basic Level</span>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{job.summary}</p>

      {/* Price */}
      <div className="mb-4">
        <span className="text-xl font-bold text-success">${job.price ? job.price:"Not Fixed"}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="min-w-0">
            <h4 className="font-semibold text-sm text-gray-800 truncate">{job.postedBy}</h4>
            <p className="text-xs text-gray-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Remote
            </p>
          </div>
        </div>

        {/* Buttons: View Job (Outline) + Apply Job (Yellow) */}
        <div className="flex gap-2">
          <Link to={`/all-jobs/${job._id}`}>
            <button className="btn btn-outline btn-sm rounded-full px-4 border-primary text-primary hover:bg-primary hover:text-white">
              View Job
            </button>
          </Link>
          <button onClick={handleAcceptedTask} className="btn btn-warning btn-sm rounded-full px-4 text-white font-semibold hover:bg-yellow-600">Apply Job</button>        </div>
      </div>
    </div>
  );
};

export default JobCard;
