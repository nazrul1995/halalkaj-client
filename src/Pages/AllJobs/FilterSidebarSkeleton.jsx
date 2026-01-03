const FilterSidebarSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>

      {[...Array(5)].map((_, i) => (
        <div key={i} className="mb-5">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      ))}

      <div className="h-9 bg-gray-200 rounded"></div>
    </div>
  );
};

export default FilterSidebarSkeleton;
