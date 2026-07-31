import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaShoppingBag } from "react-icons/fa";
import MyListItems from './MyListItems';
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';

const MyList = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const context = useContext(MyContext)
    return (
        <section className='py-4 lg:py-10 w-full'>
            <div className="container flex flex-col lg:flex-row gap-5">
                <div className="col1 w-full lg:w-[20%] hidden lg:block">
                    <AccountSidebar />
                </div>
                <div className="col2 w-full lg:w-[70%]">
                    <div className="shadow-md rounded-md bg-white p-5">
                        <div className="py-2 px-3  border-b border-[rgba(0,0,0,0.1)]">
                            <h2 className='!font-bold'>My List</h2>
                            <p className="mt-0">
                                There are <span className="font-bold text-[#ff5252]">{context?.myListData?.length}</span> products in My List
                            </p>
                        </div>
                        {
                            context?.myListData?.length !== 0
                                ? context?.myListData?.map((item, index) => {
                                    return (
                                        <MyListItems size='S' qty={1} item={item} />
                                    )
                                }) :
                                <>
                                    <div className="flex items-center justify-center flex-col pt-10 pb-10 gap-5">
                                        <img src="/myList.png" className='w-[200px]' />
                                        <h4 className='font-[800]'>My List is currently empty</h4>
                                        <Link to={'/'}>
                                            <Button className='btn-org btn-md'>
                                                Continue Shopping</Button>
                                        </Link>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MyList;