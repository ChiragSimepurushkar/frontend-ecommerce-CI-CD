import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin5Fill } from "react-icons/ri";
import Button from '@mui/material/Button';
import { MyContext } from '../../App';
import { deleteData } from '../../utils/api';
const CartPanel = (props) => {
    const context = useContext(MyContext)
    const removeItem = (id) => {
        deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
            context?.openAlertBox("success", res?.message); // Changed: res?.message not res?.data?.message
            context?.getCartItems();
        }).catch((error) => {
            console.error("Delete error:", error);
            context?.openAlertBox("error", "Failed to remove item");
        });
    }
    return (
        <>
            <div className="scroll w-full max-h-[700px] overflow-y-scroll overflow-x-hidden py-3 px-4">
                {
                    props?.data?.map((item, index) => {
                        console.log(item)
                        return (
                            <div key={index._id} className="cartItem w-full flex items-center gap-4 pb-4 border-b border-[rgba(0,0,0,0.1)]">
                                <div className="img w-[25%] overflow-hidden rounded-md h-[80px] pt-3">
                                    <Link to={`/product/${item?._id}`} className='block group'>
                                        <img
                                            src={item?.image}
                                            className="w-full group-hover:scale-105"
                                        />
                                    </Link>
                                </div>
                                <div className="info w-[75%] pr-5 relative !pt-3">
                                    <h4 className='text-[14px] font-[500]'>
                                        <Link className='link transition-all' to={`/product/${item?._id}`}>
                                            {console.log(item?._id)}
                                            {item?.productTitle?.substr(0, 20) + "..."}
                                        </Link>
                                    </h4>
                                    <p className='flex items-center gap-5 mt-2 mb-2'>
                                        <span className='text-[13px] sm:text-[14px]'>Qty : <span>{item?.quantity}</span></span>
                                        <span className='text-[#ff5252] font-bold'>{(item?.price).toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "INR",
                                        })}</span>
                                    </p>
                                    <RiDeleteBin5Fill onClick={() => removeItem(item?._id)} className="absolute text-[20px] transition-all link cursor-pointer top-[30px] right-[10px]" />
                                </div>
                            </div>
                        )
                    })
                }

            </div><br />
            <div className="bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5">
                <div className="flex-col bottomInfo px-4 py-3 w-full border-t flex items-center justify-between border-[rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between w-full ">
                        <span className='text-[12px] sm:text-[14px] font-[600]'>
                            {context?.cartData?.length} item</span>
                        <span className='font-bold text-[#ff5252]'>
                            {context.cartData?.length !== 0
                                ? context.cartData
                                    ?.map((item) => parseInt(item.price) * item.quantity)
                                    .reduce((total, value) => total + value, 0)
                                    ?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "INR",
                                    })
                                : 0}
                        </span>
                    </div>
                    {/* <div className="flex items-center justify-between w-full ">
                        <span className='text-[14px] font-[600]'>Shipping</span>
                        <span className='font-bold text-[#ff5252]'>$8.00</span>
                    </div> */}
                </div>
                <div className="flex-col bottomInfo px-4 py-3 w-full border-t flex items-center justify-between border-[rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between w-full ">
                        <span className='text-[14px] font-[600]'>Total (tax excl.)</span>
                        <span className='font-bold text-[#ff5252]'>
                            {context.cartData?.length !== 0
                                ? context.cartData
                                    ?.map((item) => parseInt(item.price) * item.quantity)
                                    .reduce((total, value) => total + value, 0)
                                    ?.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "INR",
                                    })
                                : 0}
                        </span>
                    </div>
                    {/* <div className="flex items-center justify-between w-full ">
                        <span className='text-[14px] font-[600]'>Total (tax incl.)</span>
                        <span className='font-bold text-[#ff5252]'>$93.00</span>
                    </div> */}
                    <br />
                    <div className="flex items-center justify-between w-full gap-5">
                        <Link to="/cart" className='w-[50%] d-block'>
                            <Button
                                onClick={context.toggleCartPanel(false)}
                                className='btn-org btn-lg w-full'>View Cart</Button></Link>
                        <Link to="/checkout" className='w-[50%] d-block'>
                            <Button onClick={context.toggleCartPanel(false)} className='btn-org btn-border btn-lg w-full'>Checkout</Button></Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartPanel;