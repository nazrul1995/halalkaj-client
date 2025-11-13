import React, { useEffect, useState } from 'react';
import JobCard from '../../Components/JobCard';

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('https://halalkaj-server.vercel.app/latest-Jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='w-11/12 mx-auto py-10'>
      <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Explore Our <span className="text-yellow-500">Latest job</span>
          </h2>
          <p className="mt-3 text-gray-600">Find the perfect job for you</p>
        </div>

      <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'>
        {jobs.map(job => <JobCard job={job} key={job._id} />)}
      </div>
    </div>
  );
};

export default LatestJobs;
