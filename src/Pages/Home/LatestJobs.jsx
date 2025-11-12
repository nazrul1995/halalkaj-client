import React, { useEffect, useState } from 'react';
import JobCard from '../../Components/JobCard';

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/latest-Jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='w-11/12 mx-auto py-10'>
      <h3 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Latest Jobs</h3>

      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {jobs.map(job => <JobCard job={job} key={job._id} />)}
      </div>
    </div>
  );
};

export default LatestJobs;
