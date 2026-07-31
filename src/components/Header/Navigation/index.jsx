import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { RiMenu2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoRocketOutline } from "react-icons/io5";
import CategoryPanel from './CategoryPanel';
import "../Navigation/style.css"
import { useEffect } from 'react';

import { useContext } from 'react';
import { MyContext } from '../../../App';
import MobileNav from './mobileNav';

const Navigation = (props) => {
    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
    const [catData, setCatData] = useState([]);
    const context = useContext(MyContext);

    useEffect(() => {
        if (context?.catData && context.catData.length > 0) {
            setCatData(context.catData);
        }
    }, [context?.catData]);
    useEffect(() => {
        setIsOpenCatPanel(props.isOpenCatPanel);
    }, [props.isOpenCatPanel])

    const openCategoryPanel = () => {
        setIsOpenCatPanel(true);
    }
    return (
        <>
            <nav className='navigation'>
                <div className="container-fluid flex items-center justify-start lg:justify-end gap-8">
                    {
                        context?.windowWidth > 992 &&
                        <div className="col_1 w-[20%]">
                            <Button className='!text-black gap-2 w-full'
                                onClick={openCategoryPanel}>
                                <RiMenu2Line className='text-[18px]' />
                                Shop By Categories
                                <FaAngleDown className='text-[14px] ml-auto font-bold' />
                            </Button>
                        </div>
                    }
                    <div className="col_2 w-full lg:w-[60%]">
                        <ul className='flex items-center gap-3 nav p-2' >
                            <li className='list-none'>
                                <Link to="/" className='link transition text-[14px] !font-[500]'><Button className='link transition !font-[500]'>Home</Button></Link>
                            </li>
                            {
                                catData?.length !== 0 && catData?.map((cat, index) => {
                                    return (
                                        <li className='list-none relative' key={index}>
                                            <Link
                                                to={`/products?catId=${cat._id}`}
                                                className="link transition text-[14px] font-[500]"
                                            >

                                                <Button className='link transition !font-[500]'>
                                                    {cat?.name}</Button></Link>
                                            {
                                                cat?.children?.length !== 0 &&
                                                <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                                                    <ul>
                                                        {
                                                            cat?.children?.map((subCat, index_) => {
                                                                return (
                                                                    <li className='list-none w-full relative' key={index_}>
                                                                        <Link
                                                                            to={`/products?subCat=${subCat._id}`}
                                                                            className="w-full"
                                                                        >

                                                                            <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]'>
                                                                                {subCat?.name}</Button>
                                                                            {
                                                                                subCat?.children?.length !== 0 && <div className="submenu absolute top-[0%] left-[100%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                                                                                    <ul>
                                                                                        {
                                                                                            subCat?.children?.map((thirdCat, index__) => {
                                                                                                return (
                                                                                                    <li className='list-none w-full' key={index__}>
                                                                                                        <Link
                                                                                                            to={`/products?thirdLavelCatId=${thirdCat._id}`}
                                                                                                            className="w-full"
                                                                                                        >
                                                                                                            <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]'>
                                                                                                                {thirdCat?.name}</Button>
                                                                                                        </Link>
                                                                                                    </li>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                            }
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="col_3 w-[20%] hidden lg:block">
                        <p className="text-[14px] flex items-center gap-3 mb-0 mt-0">
                            <IoRocketOutline className='text-[18px]' />
                            Free internatinal Delivery</p>
                    </div>
                </div>
            </nav>
            {
                catData?.length !== 0 &&
                <CategoryPanel data={catData}
                    setIsOpenCatPanel={setIsOpenCatPanel}
                    propSetIsOpenCatPanel={props?.setIsOpenCatPanel}
                    isOpenCatPanel={isOpenCatPanel} />
            }
            {
                context?.windowWidth < 992 &&
                <MobileNav />
            }
        </>
    )
}
export default Navigation;