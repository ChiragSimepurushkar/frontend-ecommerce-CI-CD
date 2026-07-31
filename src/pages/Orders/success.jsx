import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const OrderSuccess = () => {
    // Scroll to top on mount to ensure the user sees the success message
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="section py-4 lg:py-8 lg:py-10">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    {/* Success Icon */}
                    <img src={'/orderSuccess.png'} className='w-[100px] sm:w-[150px]'/>
                    
                    <h1 className="text-[25px] sm:text-[35px] font-bold text-[#343434] mb-2">
                        Order Placed Successfully!
                    </h1>
                    
                    <p className="text-[12px] sm:text-[16px] text-gray-600 mb-8 max-w-[500px]">
                        Thank you for your purchase. Your order has been received and 
                        is currently being processed.
                    </p>

                    {/* Navigation back to Home */}
                    <Link to="/">
                        <Button className="btn-org btn-lg">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default OrderSuccess;