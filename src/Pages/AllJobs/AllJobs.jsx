import React, { useEffect, useState } from 'react';
//import { useLoaderData } from 'react-router';
import JobCard from '../../Components/JobCard';

const AllJobs = () => {

const [jobs, setJobs] = useState([]);
const [sortOrder, setSortOrder] = useState('newest');

useEffect(() => {
  fetch(`https://halalkaj-server.vercel.app/allJobs?sort=${sortOrder}`)
    .then(res => res.json())
    .then(data => setJobs(data));
}, [sortOrder]);



return (
  <div className='w-11/12 mx-auto'>
    <div className="flex justify-end mb-4">
      <label className="mr-2 text-gray-700 font-medium">Sort by:</label>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map(job => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  </div>
);

};

export default AllJobs;
