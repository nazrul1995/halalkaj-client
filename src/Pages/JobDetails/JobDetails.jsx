import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { IoMdArrowBack } from 'react-icons/io';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaEdit, FaTrash, FaQuestionCircle, FaGlobe, FaDollarSign } from 'react-icons/fa';
import { AuthContext } from '../../Components/Provider/AuthContext';
import Swal from 'sweetalert2';
import Breadcrumb from '../../Components/Breadcrumb';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplied, setIsApplied] = useState(false);

  // Fetch Job Details
  useEffect(() => {
    fetch(`https://halalkaj-server.vercel.app/allJobs/${id}`)
      .then(res => res.json())
      .then(data => {
        setJob(data);
        setLoading(false);

        // Check if already applied
        if (user?.email) {
          fetch(`https://halalkaj-server.vercel.app/my-accepted-tasks?email=${user.email}`, {
            headers: { authorization: `Bearer ${user.accessToken}` }
          })
            .then(res => res.json())
            .then(tasks => {
              setIsApplied(tasks.some(t => t._id === data._id));
            });
        }
      })
      .catch(() => setLoading(false));
  }, [id, user]);

  // Handle Apply
  const handleApply = () => {
    if (job.userEmail === user.email) {
      return Swal.fire("Warning", "You cannot apply to your own job.", "warning");
    }

    Swal.fire({
      title: "Send Proposal?",
      text: "You are about to apply for this job.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Apply!",
    }).then(result => {
      if (result.isConfirmed) {
        fetch("https://halalkaj-server.vercel.app/accepted-task-collection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`
          },
          body: JSON.stringify({
            ...job,
            accepted_by: user.email,
            accepted_at: new Date()
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.insertedId) {
              setIsApplied(true);
              Swal.fire("Applied!", "Your proposal has been sent.", "success");
            }
          })
          .catch(() => Swal.fire("Error", "Failed to apply.", "error"));
      }
    });
  };

  // Handle Delete
  const handleDelete = () => {
    Swal.fire({
      title: "Delete Job?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete!"
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://halalkaj-server.vercel.app/deleteJob/${id}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${user.accessToken}` }
        })
          .then(() => {
            navigate("/");
            Swal.fire("Deleted!", "Job has been removed.", "success");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen text-error">
        <p className="text-xl font-semibold">Job not found!</p>
      </div>
    );
  }

  const {
    title, category, summary, postedBy, postedAt, coverImage,
    location = 'Remote', budget = 'Not specified', level = 'Intermediate',
    userEmail, skills = [], duration = '1-3 months'
  } = job;

  const formattedDate = new Date(postedAt).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  const isOwnJob = user?.email === userEmail;

  return (

    <section className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Jobs', href: '/all-jobs' },
            { label: title } // current page (no href)
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Job Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-blue-600" /> {location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-green-600" /> {duration}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {level}
                    </span>
                    <span className="font-semibold text-gray-900">${budget}</span>
                  </div>
                </div>
                <Link to="/all-jobs" className="btn btn-ghost btn-circle">
                  <IoMdArrowBack className="text-xl" />
                </Link>
              </div>

              {/* Cover Image */}
              {coverImage && (
                <div className="mb-6 -mx-6">
                  <img src={coverImage} alt={title} className="w-full h-64 object-cover rounded-t-xl" />
                </div>
              )}

              {/* Description */}
              <div className="prose prose-sm max-w-none mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary}</p>
              </div>

              {/* Skills */}
              {skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Skills & Expertises</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons – তোমার কার্ডের মতো স্টাইল */}
              <div className="flex gap-2 pt-4 border-t">
                {/* Send Proposal / Applied */}
                {!isOwnJob && (
                  <button
                    onClick={handleApply}
                    disabled={isApplied}
                    className={`btn btn-sm rounded-full px-4 font-semibold transition-all
        ${isApplied
                        ? 'btn-success text-white hover:bg-green-600'
                        : 'btn-warning text-white hover:bg-yellow-600'
                      }`}
                  >
                    {isApplied ? 'Proposal Sent' : 'Send Proposal'}
                  </button>
                )}

                {/* Update Job – Outline Primary */}
                {isOwnJob && (
                  <Link to={`/update-job/${id}`}
                    className="btn btn-outline btn-sm rounded-full px-4 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <FaEdit className="mr-1 text-sm" /> Update
                  </Link>
                )}

                {/* Delete Job – Outline Error */}
                {isOwnJob && (
                  <button
                    onClick={handleDelete}
                    className="btn btn-outline btn-sm rounded-full px-4 border-error text-error hover:bg-error hover:text-white"
                  >
                    <FaTrash className="mr-1 text-sm" /> Delete
                  </button>
                )}
              </div>
            </div>

            {/* Job Q&A */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-blue-600" /> Job Q&A
              </h3>
              <p className="text-sm text-gray-500 mb-4">Become a member to ask a question and get more benefits.</p>

              <div className="space-y-3">
                <details className="collapse collapse-arrow bg-gray-50 rounded-lg">
                  <summary className="collapse-title text-sm font-medium">Can I post my job for free?</summary>
                  <div className="collapse-content text-sm text-gray-600">
                    <p>Condimentum id venenatis a condimentum vitae. Faucibus a pellentesque sit amet. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Ut tellus elementum sagittis vitae et leo duis ut diam.</p>
                  </div>
                </details>

                <details className="collapse collapse-arrow bg-gray-50 rounded-lg">
                  <summary className="collapse-title text-sm font-medium">How many jobs can I post for free?</summary>
                  <div className="collapse-content text-sm text-gray-600">
                    <p>Condimentum id venenatis a condimentum vitae. Faucibus a pellentesque sit amet. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. Ut tellus elementum sagittis vitae et leo duis ut diam.</p>
                  </div>
                </details>
              </div>
            </div>

            {/* Proposals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Project Proposals (0)</h3>
              <p className="text-sm text-gray-500">No proposals yet. Be the first to apply!</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Job Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Job Information</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium">{formattedDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1"><FaGlobe className="text-gray-400" /> Location</span>
                  <span className="font-medium">{location}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1"><FaDollarSign className="text-gray-400" /> Budget</span>
                  <span className="font-medium">${budget}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1"><FaClock className="text-gray-400" /> Duration</span>
                  <span className="font-medium">{duration}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{category}</span>
                </li>
              </ul>
            </div>

            {/* Employer Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">About the Client</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="https://i.ibb.co/6DYM05G/default-avatar.png" alt={postedBy} />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{postedBy}</p>
                  <p className="text-xs text-success">Canada</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-xs text-gray-600">Expert Proposals</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-gray-900">2 years ago</p>
                  <p className="text-xs text-gray-600">Member Since</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default JobDetails;