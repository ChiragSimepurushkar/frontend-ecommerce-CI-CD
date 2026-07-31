import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoTriangleDown } from "react-icons/go";
import Rating from '@mui/material/Rating';
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { MyContext } from '../../App';
import { deleteData } from '../../utils/api';
const MyListItems = (props) => {
    const context = useContext(MyContext)

    const removeItem = (id) => {
        deleteData(`/api/myList/${id}`).then((res) => {
            context?.openAlertBox("success", res?.message);
            context?.getMyListData();
        });
    };
    return (
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5  border-b border-[rgba(0,0,0,0.1)]">
            <div className="img w-[30%] sm:w-[15%] rounded-md overflow-hidden">
                <Link to={`/product/${props?.item?.productId}`} className='group'>
                    <img src={props?.item?.image}
                        className='w-full group-hover:scale-105 transition-all' />
                </Link>
            </div>
            <div className="info w-[70%] sm:w-[85%] relative">
                <IoCloseCircleOutline
                    onClick={() => removeItem(props?.item?._id)}
                    className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' />
                <span className="text-[13px]">{props?.item?.brand}</span>
                <h3 className="text-[13px] sm:text-[15px]">
                    <Link className="link" to={`/product/${props?.item?.productId}`}>{props?.item?.productTitle?.substr(0, 80) + '...'}</Link>
                </h3>
                <Rating name="size-small" value={props?.item?.rating} size="small" readOnly />

                <div className="flex !mb-2 items-center gap-4 !mt-2">
                    <span className='price text-[14px] font-[600]'>&#x20b9;{props?.item?.price}</span>
                    <span className='oldPrice line-through text-gray-500 font-[500] text-[14px]'>&#x20b9;{props?.item?.oldPrice}</span>
                    <span className='price text-[#ff5252] text-[14px] font-[600]'>{props?.item?.discount}% OFF</span>

                </div>

                {/* <Button className='btn-org btn-sm'onClick={()=>addToCart(props?.item?.productId)}>Add to Cart</Button> */}
            </div>
        </div>
    );
}

export default MyListItems;