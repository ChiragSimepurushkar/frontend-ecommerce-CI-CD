import React from 'react';

const ProductLoading = () => {
    return (
        <div className="contents animate-pulse text-gray-200">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="col w-[15%] h-[250px]">
                    <div className="flex items-center justify-center mb-3 w-full h-[180px] bg-gray-300 rounded">
                        <svg
                            className="w-10 h-10 text-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <rect width="24" height="24" rx="4" />
                        </svg>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full w-4/5 !mt-3 !mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-full !mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-3/4 !mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-1/2"></div>
                </div>
            ))}
        </div>
    )
}

export default ProductLoading;