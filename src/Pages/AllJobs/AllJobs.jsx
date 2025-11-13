import React, { useEffect, useState } from 'react';
import JobCard from '../../Components/JobCard';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    level: '',
    sortOrder: 'newest'
  });

  // Fetch all jobs
  useEffect(() => {
    setLoading(true);
    fetch('https://halalkaj-server.vercel.app/allJobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Apply filters + sort
  useEffect(() => {
    let result = [...jobs];

    // Category
    if (filters.category) {
      result = result.filter(job => job.category === filters.category);
    }

    // Location
    if (filters.location) {
      result = result.filter(job => 
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Budget Range
    if (filters.budgetMin || filters.budgetMax) {
      result = result.filter(job => {
        const budget = parseFloat(job.budget?.replace(/[^0-9.-]+/g, '')) || 0;
        const min = parseFloat(filters.budgetMin) || 0;
        const max = parseFloat(filters.budgetMax) || Infinity;
        return budget >= min && budget <= max;
      });
    }

    // Level
    if (filters.level) {
      result = result.filter(job => job.level === filters.level);
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.postedAt);
      const dateB = new Date(b.postedAt);
      return filters.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredJobs(result);
  }, [filters, jobs]);

  // Unique values for dropdowns
  const categories = [...new Set(jobs.map(job => job.category).filter(Boolean))];
  //const locations = [...new Set(jobs.map(job => job.location).filter(Boolean))];
  const levels = [...new Set(jobs.map(job => job.level).filter(Boolean))];

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      category: '',
      location: '',
      budgetMin: '',
      budgetMax: '',
      level: '',
      sortOrder: 'newest'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto mt-32">
      <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Find <span className="text-warning">Jobs</span>
          </h1>
          <p className="mt-2 text-gray-600">This might be interesting job site for you</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Filters</h3>

            {/* Category */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                placeholder="e.g. Remote, Dhaka"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Budget Range */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range ($)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.budgetMin}
                  onChange={(e) => handleFilterChange('budgetMin', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.budgetMax}
                  onChange={(e) => handleFilterChange('budgetMax', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Level */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">All Levels</option>
                {levels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full btn btn-outline btn-sm rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Right Side - Job Cards */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
            </h2>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow">
              <p className="text-xl text-gray-500">No jobs match your filters.</p>
              <button onClick={handleReset} className="mt-4 btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs; 