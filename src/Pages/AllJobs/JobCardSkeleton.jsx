const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 animate-pulse flex flex-col h-full">
      
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>

      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>

      <div className="mt-auto flex justify-between items-center">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>

        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
