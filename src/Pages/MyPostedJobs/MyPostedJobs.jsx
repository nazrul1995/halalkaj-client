import React, { use, useEffect, useState } from 'react';
import JobCard from '../../Components/JobCard';
import { AuthContext } from '../../Components/Provider/AuthContext';

const MyPostedJobs = () => {
    const {user} = use(AuthContext)
    const [jobs, setJobs] = useState([]);
    
      useEffect(() => {
        fetch(`https://halalkaj-server.vercel.app/my-posted-jobs?email=${user.email}`)
          .then(res => res.json())
          .then(data => setJobs(data))
          .catch(err => console.error(err));
      }, [user]);
    return (
       <div className='w-11/12 mx-auto py-10'>
            <h3 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Jobs By : {user.displayName}</h3>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {jobs.map(job => <JobCard job={job} key={job._id} />)}
            </div>
        </div>
    );
};

export default MyPostedJobs;