import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const OrderFailed = () => {
    // Scroll to top on mount to ensure the user sees the failure message
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className="section py-4 lg:py-10">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    {/* Failure Illustration - Use a red/error themed image */}
                    <img src={'/failure.png'}  className='w-[150px] sm:w-[200px]' alt="Order Failed" />
                    
                    <h1 className="text-[25px] sm:text-[35px] font-bold text-[#d32f2f] mb-2 mt-4">
                        Order Placement Failed!
                    </h1>
                    
                    <p className="!text-[12px] sm:text-[16px] text-gray-600 mb-8 max-w-[500px]">
                        We're sorry, but there was an issue processing your order. 
                        Please check your payment details or try again later.
                    </p>

                    {/* Navigation back to Cart or Checkout to retry */}
                    <div className="flex gap-4">
                        <Link to="/cart">
                            <Button className="btn-dark btn-lg">
                                Return to Cart
                            </Button>
                        </Link>
                        
                        <Link to="/">
                            <Button className="btn-org btn-lg">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderFailed;