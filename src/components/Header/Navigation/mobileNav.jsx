import React, { useContext, useEffect } from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { BsBagCheck } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { Button } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { MyContext } from '../../../App';

const MobileNav = () => {
  const context = useContext(MyContext);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/products") {
      context?.setIsFilterBtnShow(true);
    } else {
      context?.setIsFilterBtnShow(false);
    }
    window.scrollTo(0, 0);
  }, [location]);
  const openFilters = () => {
    context?.setOpenFilter(true);
  };

  return (
    <div className='z-[51] mobileNav bg-white p-1 px-3 w-full flex items-center justify-evenly
        !fixed bottom-0 left-0 place-items-center gap-0'>
      <NavLink exact={true}
        activeClassname="isActive"
        to="/" className={({ isActive }) =>
          isActive ? "active" : ""}>
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
          <IoHomeOutline size={18} />
          <span className='text-[12px]'>Home</span>
        </Button>
      </NavLink>
      {
        context?.isFilterBtnShow === true &&
        <Button onClick={openFilters} className="!bg-[#ffaeae] flex-col !rounded-full !h-[45px] !w-[45px] !min-w-[40px] !capitalize !text-gray-700">
          <MdOutlineFilterAlt className='text-[#ff5252]' size={18} />
          <span className='text-[12px] text-[#ff5252]'>Filter</span>
        </Button>
      }

      {/* <NavLink exact={true}
        activeClassname="isActive"
        to="/search" className={({ isActive }) =>
          isActive ? "active" : ""}> */}
        <Button onClick={()=>context?.setOpenSearchPanel(true)} className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
          <IoSearch size={18} />
          <span className='text-[12px]'>Search</span>
        </Button>
      {/* </NavLink> */}
      <NavLink exact={true}
        activeClassname="isActive"
        to="/my-list" className={({ isActive }) =>
          isActive ? "active" : ""}>
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
          <LuHeart size={18} />
          <span className='text-[12px]'>WishList</span>
        </Button>
      </NavLink>
      <NavLink exact={true}
        activeClassname="isActive"
        to="/my-orders" className={({ isActive }) =>
          isActive ? "active" : ""}>
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
          <BsBagCheck size={18} />
          <span className='text-[12px]'>Orders</span>
        </Button>
      </NavLink>
      <NavLink exact={true}
        activeClassname="isActive"
        to="/my-account" className={({ isActive }) =>
          isActive ? "active" : ""}>
        <Button className="flex-col !w-[40px] !min-w-[40px] !capitalize !text-gray-700">
          <FiUser size={18} />
          <span className='text-[12px]'>Account</span>
        </Button>
      </NavLink>
    </div>
  )
}
export default MobileNav;