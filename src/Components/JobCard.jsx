import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "./Provider/AuthContext";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  const { user } = useContext(AuthContext);
  const [applied, setApplied] = useState(false);

  const {
    _id,
    title,
    category,
    postedBy,
    summary,
    price,
    postedAt,
    level,
    userEmail,
  } = job;

  const handleAcceptedTask = async () => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "Login required",
        text: "Please login to apply for jobs",
      });
    }

    if (applied) return;

    if (userEmail === user.email) {
      return Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "You cannot apply to your own job!",
      });
    }

    try {
      const addedTask = {
        jobId: _id,
        title,
        category,
        postedBy,
        accepted_by: user.email,
        accepted_date: new Date(),
      };

      const res = await fetch(
        `https://halalkaj-server.vercel.app/accepted-task-collection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(addedTask),
        }
      );

      if (!res.ok) throw new Error("Failed to apply");

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
    const diff = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 30) return `${diff} days ago`;
    if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
    return `${Math.floor(diff / 365)} years ago`;
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-md p-5 flex flex-col h-full hover:shadow-xl transition">

      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2">
          {title}
        </h2>

        <div className="flex items-center gap-2 mt-2 text-sm">
          <span className="text-gray-500">Category:</span>
          <span className="badge badge-primary badge-sm text-white">
            {category}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-wrap gap-2 mb-3">
        <span>Posted {formatDate(postedAt)}</span>
        <span>•</span>
        <span>{level || "Basic"} Level</span>
        <span>•</span>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
        {summary}
      </p>

      {/* Price */}
      <div className="mb-4">
        <span className="text-xl font-bold text-success">
          {price ? `$${price}` : "Negotiable"}
        </span>
      </div>

      {/* Footer (Stick to bottom) */}
      <div className="mt-auto flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-semibold text-sm text-gray-800 dark:text-white truncate">
            {postedBy}
          </h4>
        </div>

        <div className="flex gap-2">
          <Link to={`/all-jobs/${_id}`}>
            <button className="btn btn-outline btn-sm rounded-full px-4 border-primary text-primary hover:bg-primary hover:text-white">
              View
            </button>
          </Link>

          <button
            onClick={handleAcceptedTask}
            disabled={applied}
            className={`btn btn-sm rounded-full px-4 font-semibold text-white
              ${applied ? "bg-gray-400 cursor-not-allowed" : "btn-warning hover:bg-yellow-600"}
            `}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
