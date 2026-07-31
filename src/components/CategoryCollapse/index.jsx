import * as React from 'react';
import Button from '@mui/material/Button';
import { FaRegPlusSquare } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaRegMinusSquare } from "react-icons/fa";
const CategoryCollapse = (props) => {
    const [submenuIndex, setSubmenuIndex] = React.useState(null);
    const [innerSubmenuIndex, setInnerSubmenuIndex] = React.useState(null);

    const openSubmenu = (index) => {
        if (submenuIndex === index) {
            setSubmenuIndex(null);
        } else {
            setSubmenuIndex(index);
        }
    }
    const openInnerSubmenu = (index) => {
        if (innerSubmenuIndex === index) {
            setInnerSubmenuIndex(null);
        } else {
            setInnerSubmenuIndex(index);
        }
    }
    return (
        <div className="!scroll w-full max-h-[600px] overflow-y-auto custom-scrollbar bg-white rounded-lg shadow-sm">
            <ul className='w-full divide-y divide-gray-50'>
                {props?.data?.length !== 0 && props?.data?.map((cat, index) => {
                    const isSubOpen = submenuIndex === index;
                    return (
                        <li key={index} className="list-none flex flex-col w-full transition-all duration-300">
                            {/* Main Category Row */}
                            <div className="relative group flex items-center hover:bg-blue-50/50">
                                <Link to={`/products?catId=${cat?._id}`} className='flex-grow'>
                                    <Button className='!w-full !text-left !justify-start !px-4 !py-3 !text-gray-700 !font-semibold !text-[15px] !capitalize !rounded-none'>
                                        {cat?.name}
                                    </Button>
                                </Link>
                                <div className="absolute right-4 z-10">
                                    {isSubOpen ? (
                                        <FaRegMinusSquare
                                            className='text-blue-600 cursor-pointer 
                                            hover:scale-110 transition-transform'
                                            onClick={() => openSubmenu(index)}
                                        />
                                    ) : (
                                        <FaRegPlusSquare
                                            className='text-gray-400 cursor-pointer hover:text-blue-500 hover:scale-110 transition-all'
                                            onClick={() => openSubmenu(index)}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Second Level Submenu */}
                            {isSubOpen && (
                                <ul className='w-full bg-gray-50/30 animate-in fade-in slide-in-from-top-1 duration-200'>
                                    {cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                                        const isInnerOpen = innerSubmenuIndex === index_;
                                        return (
                                            <li key={index_} className='list-none relative flex flex-col border-l-2 border-transparent hover:border-blue-300'>
                                                <div className="relative flex items-center pl-4">
                                                    <Link to="/" className='flex-grow'>
                                                        <Button className='!w-full !text-left !justify-start !px-4 !py-2 !text-gray-600 !text-[14px] !font-medium !capitalize !rounded-none'>
                                                            {subCat?.name}
                                                        </Button>
                                                    </Link>
                                                    <div className="absolute right-4">
                                                        {isInnerOpen ? (
                                                            <FaRegMinusSquare
                                                                className='text-blue-500 text-sm cursor-pointer'
                                                                onClick={() => openInnerSubmenu(index_)}
                                                            />
                                                        ) : (
                                                            <FaRegPlusSquare
                                                                className='text-gray-400 text-sm cursor-pointer hover:text-blue-400'
                                                                onClick={() => openInnerSubmenu(index_)}
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Third Level Submenu */}
                                                {isInnerOpen && (
                                                    <ul className='w-full pl-8 pb-2 space-y-1 bg-white/50'>
                                                        {subCat?.children?.length !== 0 && subCat?.children?.map((thirdCat, index__) => (
                                                            <li key={index__} className='list-none relative py-1'>
                                                                <Link to="/" className='block text-gray-500 hover:text-blue-600 text-[13px] font-normal transition-colors py-1 pl-4 border-l border-gray-200 hover:border-blue-400'>
                                                                    {thirdCat?.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default CategoryCollapse;