import React from 'react';

const ProductLoading = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-pulse !pl-8 !mt-4 py-5 w-full">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="w-full flex flex-col h-[250px]">
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

                    <div className="flex flex-col gap-2 !mb-3">
                        <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-5/6"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductLoading;