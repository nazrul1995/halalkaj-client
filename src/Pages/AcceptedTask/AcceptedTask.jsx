import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Components/Provider/AuthContext';
import JobCard from '../../Components/JobCard';
import Swal from 'sweetalert2';

const AcceptedTask = () => {
    const { user } = use(AuthContext)
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`https://halalkaj-server.vercel.app/my-accepted-tasks`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`,
            },
        })
            .then(res => res.json())
            .then(data => setJobs(data))
            .catch(err => console.error(err));
    }, [user]);

 const taskAction = (id) => {
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
        fetch(`https://halalkaj-server.vercel.app/task-action/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
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

    return (
        <div className='w-11/12 mx-auto py-10'>
            <h3 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Jobs By : {user.displayName}</h3>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {jobs.map(job =>  <div key={job._id}  className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col overflow-hidden group">
      {/* Cover Image */}
      <div className="relative w-full h-44 overflow-hidden">
        <img
          src={job.coverImage || "https://via.placeholder.com/400x250?text=Job+Cover"}
          alt={job.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <span className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {job.jobType || "Remote"}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-gray-800 font-semibold">{job.postedBy || "John Doe"}</h3>
            <p className="text-xs text-gray-400">{job.formattedDate}</p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-indigo-600">{job.price ? `$${job.price}` : "N/A"}</p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-300">
          {job.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description || "Exciting opportunity for skilled professionals to join a dynamic team."}
        </p>


        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button onClick={()=>taskAction(job._id)}>
            done
          </button>
          <button onClick={()=>taskAction(job._id)}>
            cancel
          </button>
        </div>
      </div>
    </div>)}
            </div>
        </div>
    );
};

export default AcceptedTask;