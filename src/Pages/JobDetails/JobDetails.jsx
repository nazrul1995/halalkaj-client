import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { IoMdArrowBack } from 'react-icons/io';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import { AuthContext } from '../../Components/Provider/AuthContext';
import Swal from 'sweetalert2';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {

    fetch(`http://localhost:3000/allJobs/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, user]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/deleteJob/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate("/");

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const handleAcceptedTask = () => {
  

    fetch(`http://localhost:3000/accepted-task-collections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({...job, accepted_by: user.email}),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Successfully accepted this task!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        Job not found!
      </div>
    );
  }


  const { title, category, summary, postedBy, postedAt, coverImage } = job;
  const formattedDate = new Date(postedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });



  return (
    <div className="w-11/12 mx-auto py-10">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
      >
        <IoMdArrowBack /> Back to Jobs
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left side (Main content) */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-xl p-6">
          <img
            src={coverImage || 'https://via.placeholder.com/800x400?text=Job+Image'}
            alt={title}
            className="rounded-xl mb-6 w-full h-64 object-cover"
          />

          <h1 className="text-3xl font-bold text-gray-800 mb-3">{title}</h1>
          <p className="text-sm text-blue-500 font-medium mb-2">{category}</p>

          <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
            <div className="flex items-center gap-1">
              <FaUser className="text-orange-500" />
              <span>{postedBy}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCalendarAlt className="text-blue-500" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-5">{summary}</p>

          <div className='flex space-x-2.5'>
            <button onClick={handleAcceptedTask} className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-md hover:scale-105 transition duration-300">
              Apply Now
            </button>
            {
              user && user.email === job.userEmail && <div>
              <Link to={`/update-job/${id}`} className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-md hover:scale-105 transition duration-300">
                Update Job
              </Link>
              <button onClick={handleDelete} className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-md hover:scale-105 transition duration-300">
                Delete Job
              </button>
            </div>
            }
          </div>
        </div>

        {/* Right side (Sidebar) */}
        <div className="bg-gray-50 shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About the Employer</h2>
          <div className="flex items-center gap-4 mb-4">
            <img
              src="https://i.ibb.co/6DYM05G/default-avatar.png"
              alt={postedBy}
              className="w-12 h-12 rounded-full border border-gray-300"
            />
            <div>
              <h3 className="font-semibold">{postedBy}</h3>
              <p className="text-sm text-gray-500">Verified Employer</p>
            </div>
          </div>

          <hr className="my-4" />

          <h2 className="text-lg font-semibold text-gray-700 mb-2">Job Info</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <strong>Category:</strong> {category}
            </li>
            <li>
              <strong>Posted:</strong> {formattedDate}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
