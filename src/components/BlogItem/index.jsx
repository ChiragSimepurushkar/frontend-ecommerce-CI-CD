import React from 'react';
import { IoTimeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
const BlogItem = (props) => {
    return (
        <div className="blogItem group">
            <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
                <img className='w-full transition-all group-hover:scale-105 group-hover:rotate-1 ' alt="blog image"
                    src={props?.item?.images[0]} />
                <span className='flex items-center p-1 text-[10px] lg:text-[12px] font-[500] gap-2 rounded-md bg-[#ff5252] justify-center text-white absolute bottom-[15px] right-[15px] z-50'>
                    <IoTimeOutline className='text-[16px]' /> 
                    {props?.item?.createdAt?.split("T")[0]}
                </span>
            </div>
            <div className="info py-4">
                <h2 className='text-[15px] font-[600] text-black'>
                    <Link to="/" className='link'>{props?.item?.title}</Link>
                </h2>
                <div className='text-[12px] lg:text-[15px]' dangerouslySetInnerHTML={{ __html: props?.item?.description?.substr(0, 100) + '...' }} />
                <Link className='link font-[500] text-[12px] lg:text-[14px] flex items-center gap-1'>Read More<FaLongArrowAltRight /></Link>
            </div>
        </div>
    );
}

export default BlogItem;