import React, { useContext } from 'react';
import '../ProductitemListView/style.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import Tooltip from '@mui/material/Tooltip';
import { FaShoppingCart } from "react-icons/fa";
import { MyContext } from '../../App';

const ProductitemListView = (props) => {
    const context = useContext(MyContext);
    const item = props?.item;

    return (
        <div className="Productitem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)] flex items-center">
            
            {/* IMAGE SECTION */}
            <div className="group imgWrapper w-[25%] overflow-hidden rounded-md relative">
                <Link to={`/product/${item?._id}`}>
                    <div className="img h-[250px] overflow-hidden">
                        <img
                            src={item?.images?.[0]}
                            className="w-full"
                        />
                        <img
                            src={item?.images?.[1] || item?.images?.[0]}
                            className="opacity-0 top-0 left-0 w-full absolute group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                        />
                    </div>
                </Link>

                {item?.discount && (
                    <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff5252] text-white rounded-lg p-1 text-[12px] font-[500]">
                        {item.discount}%
                    </span>
                )}

                {/* ACTIONS */}
                <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px]
                    transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">

                    <Tooltip title="Like" placement="left-start">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white group">
                            <IoIosHeartEmpty className='text-[18px] !text-black group-hover:text-white'  />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Compare" placement="left-start">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white group">
                            <IoIosGitCompare className='text-[18px] !text-black group-hover:text-white'  />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Zoom" placement="left-start">
                        <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white group"
                            onClick={() => context.handleOpenProductDetailsModel(true, item)}
                        >
                            <MdZoomOutMap className='text-[18px] !text-black group-hover:text-white' />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Share" placement="left-start">
                        <Button className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black hover:!bg-[#ff5252] hover:!text-white group">
                            <CiShare1 className='text-[18px] !text-black group-hover:text-white' />
                        </Button>
                    </Tooltip>
                </div>
            </div>

            {/* INFO SECTION */}
            <div className="info p-3 py-5 px-8 w-[75%]">
                <h6 className="text-[15px]">
                    <Link to={`/product/${item?._id}`} className="link transition-all">
                        {item?.brand}
                    </Link>
                </h6>

                <h3 className="!mb-3 text-[18px] title !mt-3 font-[500] text-[#000]">
                    <Link to={`/product/${item?._id}`} className="link transition-all">
                        {item?.name}
                    </Link>
                </h3>

                <p className="!mb-3 text-[14px]">{item?.description}</p>

                <Rating
                    name="size-small"
                    defaultValue={item?.rating}
                    size="small"
                    readOnly
                />

                <div className="flex items-center gap-4">
                    <span className="oldPrice line-through text-gray-500 font-[500] text-[15px]">
                        ₹{item?.OldPrice}
                    </span>
                    <span className="price text-[#ff5252] text-[15px] font-[600]">
                        ₹{item?.price}
                    </span>
                </div>

                <div className="!mt-3">
                    <Button className="btn-org flex gap-2">
                        <FaShoppingCart className="text-[20px]" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductitemListView;
