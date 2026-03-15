import React from "react";

const ProductListLoading = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse !pl-8 !mt-4 py-5 w-full">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-center gap-6 bg-white rounded-md shadow-sm p-4 w-full"
        >
          {/* Image */}
          <div className="w-full sm:w-[25%] h-[180px] bg-gray-300 rounded-md flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" rx="4" />
            </svg>
          </div>

          {/* Content */}
          <div className="w-full sm:w-[75%] space-y-3 !mt-4">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-5 bg-gray-300 rounded w-2/3"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>

            {/* Rating */}
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>
              ))}
            </div>

            {/* Price */}
            <div className="flex gap-4 !mt-4">
              <div className="h-5 w-20 bg-gray-300 rounded"></div>
              <div className="h-5 w-24 bg-gray-300 rounded"></div>
            </div>

            {/* Button */}
            <div className="!mt-4 h-10 w-32 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListLoading;
