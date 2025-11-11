import React from "react";
import { FaRegClock, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";

const JobCard = ({ job }) => {
  const { title, category, summary, postedBy, postedAt, coverImage } = job;


  const formattedDate = new Date(postedAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white shadow-lg hover:shadow-2xl rounded-xl border border-gray-200 transition p-4 flex flex-col hover:scale-105 transform duration-300">
      {/* Image */}
      <div className="overflow-hidden rounded-xl mb-3">
        <img
          src={coverImage || "https://via.placeholder.com/400x250?text=Job+Image"}
          alt={title}
          className="h-48 w-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-800 mb-1 truncate">{title}</h2>

      {/* Category */}
      <p className="text-sm text-gray-500 mb-2">{category}</p>

      {/* Summary */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{summary}</p>

      {/* Info */}
      <div className="flex justify-between text-sm text-gray-700 mt-auto mb-3">
        <div className="flex items-center gap-1">
          <FaUserAlt className="text-orange-500" />
          <span>{postedBy}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaRegClock className="text-blue-500" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* Button */}
      <Link to={`/all-jobs/${job._id}`} className="mt-auto bg-linear-to-r from-blue-500 to-indigo-600 text-white p-2 text-center rounded-md hover:scale-105 transform transition duration-300">
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
