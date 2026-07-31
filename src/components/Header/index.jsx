import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaCodeCompare } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navigation from './Navigation';
import { MyContext } from '../../App';
import { IoIosHeart } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import Button from '@mui/material/Button';
import { LuLogOut } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { fetchDataFromApi } from '../../utils/api';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: '0 4px',
    },
}));
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { IoMenu } from 'react-icons/io5';
import { linkWithCredential } from 'firebase/auth';

const Header = () => {
    const context = useContext(MyContext);

    const [anchorMyAcc, setAnchorMyAcc] = useState(null);
    const openMyAcc = Boolean(anchorMyAcc);
    const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

    const handleClickMyAcc = (event) => {
        setAnchorMyAcc(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
        setAnchorMyAcc(null);
    };

    const history = useNavigate();

    const handleClick = (event) => {
        setAnchorMyAcc(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorMyAcc(null);
    };
    const logout = () => {
        setAnchorMyAcc(null);
        const token = localStorage.getItem("accesstoken");
        // Clear all state immediately
        context?.setIsLogin(false);
        context?.setuserData(null);
        context?.setCartData([]);
        context?.setMyListData([]); // ADD THIS LINE - Clear myListData

        // Clear localStorage
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userEmail");
        // If no token, just redirect
        if (!token) {
            context.openAlertBox("error", "Already logged out");
            return;
        }
        // Try to call the backend logout API
        fetchDataFromApi(`/api/user/logout?token=${token}`,{
            withCredentials:true
        })
            .then((res) => {
                if (res?.success === true) {
                    context.openAlertBox("Success", "You have been logged out.");
                    history("/")
                } else {
                    context.openAlertBox("error", res?.message || "Logged out.");
                }
            })
            .catch(err => {
                console.error("Logout failed:", err);
                context.openAlertBox("error", "Logged out.");
            });
    };

    // return (
    //     <header className='bg-white sticky -top-[60px] z-[100]'>
    //         <div className='top-strip py-2 border-t-[1px] border-gray-200 border-b-[1px]'>
    //             <div className='container'>
    //                 <div className='flex items-center justify-between'>
    //                     <div className='col1 w-[50%] hidden lg:block'>
    //                         <p className='text-[12px] font-[500]'>
    //                             Get up to 50% off new season styles, limited time only
    //                         </p>
    //                     </div>
    //                     <div className='col2 flex items-center justify-between w-full lg:w-[50%] lg:justify-end'>
    //                         <ul className='flex items-center gap-3 w-full justify-between lg:w-[200px]'>
    //                             <li className='list-none'>
    //                                 <Link to="/help-center" className='text-[11px] lg:text-[13px] link font-[500] transition'>Help center</Link>
    //                             </li>
    //                             <li className='list-none'>
    //                                 <Link to="/order-tracking" className='text-[11px] lg:text-[13px] link font-[500] transition'>Order Tracking</Link>
    //                             </li>
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className='header py-4 border-b-[1px] border-gray-200'>
    //             <div className='container flex items-center justify-content-between'>
    //                 <div className='col1 w-[25%]'>
    //                     <Link to={"/"}><img src="/logo.png" className="w-[200px]" /></Link>
    //                 </div>
    //                 <div className="hidden lg:block col2 fixed top-0 left-0 w-full h-full lg:w-[45%] lg:static p-2 lg:p-0 bg-white z-50">
    //                     <Search />
    //                 </div>
    //                 <div className='col3 w-[35%] flex items-center pl-7'>
    //                     <ul className='flex items-center justify-end gap-0 lg:gap-3 w-full'>
    //                         {
    //                             context.isLogin == false ?
    //                                 (<li className='list-none'>
    //                                     <Link to="/login" className='link transition text-[17px] font-[500]'>Login</Link> / <Link className='link transition text-[17px] font-[500]' to="/register">Register</Link>
    //                                 </li>)
    //                                 :
    //                                 (
    //                                     <>
    //                                         <li>
    //                                             <Button
    //                                                 className="!text-[#000] myAccountWrap flex items-center gap-3"
    //                                                 onClick={handleClickMyAcc}
    //                                             >
    //                                                 <div className='!w-[40px] !h-[40px] rounded-full bg-[#f1f1f1] flex items-center justify-center overflow-hidden'>
    //                                                     {context?.userData?.avatar ? (
    //                                                         <img
    //                                                             src={context.userData.avatar}
    //                                                             alt={context.userData.name}
    //                                                             className="w-full h-full object-cover"
    //                                                             onError={(e) => {
    //                                                                 console.log("Image failed to load:", context.userData.avatar);
    //                                                                 e.target.style.display = 'none';
    //                                                             }}
    //                                                         />
    //                                                     ) : (
    //                                                         <FaRegUser className='text-[16px] text-[rgba(0,0,0,0.7)]' />
    //                                                     )}
    //                                                 </div>
    //                                                 {
    //                                                     context?.windowWidth > 992 &&
    //                                                     <div className="info flex flex-col">
    //                                                         <h4 className="text-[14px] font-[700] capitalize">
    //                                                             {context?.userData?.name}
    //                                                         </h4>
    //                                                         <span className="text-[13px]">
    //                                                             {context?.userData?.email}
    //                                                         </span>
    //                                                     </div>
    //                                                 }
    //                                             </Button>

    //                                             <Menu
    //                                                 id="account-menu"
    //                                                 anchorEl={anchorMyAcc}
    //                                                 open={openMyAcc}
    //                                                 onClose={handleCloseMyAcc}
    //                                                 onClick={handleCloseMyAcc}
    //                                                 slotProps={{
    //                                                     paper: {
    //                                                         elevation: 0,
    //                                                         sx: {
    //                                                             overflow: 'visible',
    //                                                             filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    //                                                             mt: 1.5,
    //                                                             '& .MuiAvatar-root': {
    //                                                                 width: 32,
    //                                                                 height: 32,
    //                                                                 ml: -0.5,
    //                                                                 mr: 1,
    //                                                             },
    //                                                             '&::before': {
    //                                                                 content: '""',
    //                                                                 display: 'block',
    //                                                                 position: 'absolute',
    //                                                                 top: 0,
    //                                                                 right: 14,
    //                                                                 width: 10,
    //                                                                 height: 10,
    //                                                                 bgcolor: 'background.paper',
    //                                                                 transform: 'translateY(-50%) rotate(45deg)',
    //                                                                 zIndex: 0,
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                 }}
    //                                                 transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    //                                                 anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    //                                             >
    //                                                 <Link to="/my-account" className='w-full block'>
    //                                                     <MenuItem onClick={handleCloseMyAcc} className='flex gap-2 !py-2'>
    //                                                         <FaRegUser className='text-[18px]' /> <span className='text-[14px]'>My Account</span>
    //                                                     </MenuItem>
    //                                                 </Link>
    //                                                 <Link to="/my-orders" className='w-full block'>
    //                                                     <MenuItem onClick={handleCloseMyAcc} className='flex gap-2 !py-2'>
    //                                                         <FaShoppingCart className='text-[18px]' /><span className='text-[14px]'> Orders</span>
    //                                                     </MenuItem>
    //                                                 </Link>
    //                                                 <Link to="/my-list" className='w-full block'>
    //                                                     <MenuItem onClick={handleCloseMyAcc} className='flex gap-2 !py-2'>
    //                                                         <IoIosHeart className='text-[18px]' /> <span className='text-[14px]'>My List</span>
    //                                                     </MenuItem>
    //                                                 </Link>
    //                                                 <MenuItem onClick={logout} className='flex gap-2 !py-2'>
    //                                                     <LuLogOut className='text-[18px]' /><span className='text-[14px]'> Logout</span>
    //                                                 </MenuItem>
    //                                             </Menu>
    //                                         </li>
    //                                     </>

    //                                 )
    //                         }
    //                         {/* <li>
    //                             <Tooltip title="compare">
    //                                 <IconButton aria-label="cart">
    //                                     <StyledBadge badgeContent={4} color="secondary">
    //                                         <FaCodeCompare />
    //                                     </StyledBadge>
    //                                 </IconButton>
    //                             </Tooltip>
    //                         </li> */}

    //                         {
    //                             context?.windowWidth > 992 &&
    //                             <li>
    //                                 <Tooltip title="Wish List">
    //                                     <Link to={"/my-list"}>
    //                                         <IconButton aria-label="cart">
    //                                             <StyledBadge badgeContent={context?.myListData?.length} color="secondary">
    //                                                 <  FaRegHeart />
    //                                             </StyledBadge>
    //                                         </IconButton>
    //                                     </Link>
    //                                 </Tooltip>
    //                             </li>
    //                         }


    //                         <li className='ml-0'>
    //                             <Tooltip title="cart">
    //                                 <IconButton aria-label="cart" 
    //                                 onClick={context.toggleCartPanel(true)}>
    //                                     <StyledBadge badgeContent={context?.cartData?.length} color="secondary">
    //                                         < MdOutlineShoppingCart />
    //                                     </StyledBadge>
    //                                 </IconButton>
    //                             </Tooltip>
    //                         </li>
    //                     </ul>
    //                 </div>
    //             </div>
    //         </div>
    //         <Navigation />
    //     </header>
    // )
    return (
        <header className='bg-white sticky top-0 lg:-top-[60px] z-[100] shadow-sm'>
            {/* Top Strip */}
            <div className='top-strip py-2 border-t-[1px] border-gray-200 border-b-[1px]'>
                <div className='container mx-auto px-4'>
                    <div className='flex items-center justify-between'>
                        {/* Preserve: Hidden on mobile, shown on lg via your original logic style */}
                        <div className='col1 w-[50%] hidden lg:block'>
                            <p className='text-[12px] font-[500]'>
                                Get up to 50% off new season styles, limited time only
                            </p>
                        </div>
                        <div className='col2 flex items-center justify-between w-full lg:w-[50%] lg:justify-end'>
                            <ul className='flex items-center gap-3 w-full justify-between lg:w-auto'>
                                <li className='list-none'>
                                    <Link to="/help-center" className='text-[11px] lg:text-[13px] link font-[500] transition'>Help center</Link>
                                </li>
                                <li className='list-none'>
                                    <Link to="/order-tracking" className='text-[11px] lg:text-[13px] link font-[500] transition'>Order Tracking</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header py-3 lg:py-4 border-b-[1px] border-gray-200'>
                <div className='container-fluid flex flex-wrap lg:flex-nowrap items-center justify-between'>
                    <div className='flex items-center gap-2 lg:gap-4 '>
                        {
                            context?.windowWidth < 992 &&
                            <Button onClick={() => setIsOpenCatPanel(true)} className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-gray-800">
                                <IoMenu size={22} />
                            </Button>
                        }
                        <div className='col1 w-auto lg:w-[25%]'>
                            <Link to={"/"}>
                                <img src="/logo.png" className="w-[120px] md:w-[160px] lg:w-[900px]" alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className={`col2 fixed top-0
                     left-0 w-full h-full lg:w-[45%] 
                    lg:static p-2 lg:p-0 bg-white z-50 
                    ${context?.windowWidth>992 && '!block'}
                    ${context?.openSearchPanel===true?'block':'hidden'}`}>
                        <Search />
                    </div>
                    <div className='col3 w-auto lg:w-[35%] flex items-center justify-end lg:pl-7 order-2 lg:order-3'>
                        <ul className='flex items-center justify-end gap-1 md:gap-2 lg:gap-3 w-full'>
                            {
                                context.isLogin == false && context?.windowWidth>992?
                                    (<li className='list-none whitespace-nowrap'>
                                        <Link to="/login" className='link transition text-[14px] md:text-[17px] font-[500]'>Login</Link>
                                        <span className="mx-1">/</span>
                                        <Link className='link transition text-[14px] md:text-[17px] font-[500]' to="/register">Register</Link>
                                    </li>)
                                    :
                                    (
                                        <>
                                            {
                                                context?.windowWidth > 992 &&
                                                <li className='list-none'>
                                                    <Button
                                                        className="!text-[#000] myAccountWrap flex items-center !min-w-0 !p-1 md:!p-2"
                                                        onClick={handleClickMyAcc}
                                                    >
                                                        <div className='w-[35px] h-[35px] md:w-[40px] md:h-[40px] rounded-full bg-[#f1f1f1] flex items-center justify-center overflow-hidden border border-gray-100'>
                                                            {context?.userData?.avatar ? (
                                                                <img
                                                                    src={context.userData.avatar}
                                                                    alt={context.userData.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <FaRegUser className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                                            )}
                                                        </div>

                                                        {/* Preserve Original Logic: Name only if windowWidth > 992 */}

                                                        <div className="info flex flex-col ml-3 text-left">
                                                            <h4 className="text-[14px] font-[700] capitalize leading-tight">
                                                                {context?.userData?.name}
                                                            </h4>
                                                            <span className="text-[12px] opacity-70">
                                                                {context?.userData?.email}
                                                            </span>
                                                        </div>

                                                    </Button>

                                                    <Menu
                                                        anchorEl={anchorMyAcc}
                                                        open={openMyAcc}
                                                        onClose={handleCloseMyAcc}
                                                        onClick={handleCloseMyAcc}
                                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                    >
                                                        <MenuItem onClick={handleCloseMyAcc} component={Link} to="/my-account" className='flex gap-2 !py-2'>
                                                            <FaRegUser className='text-[18px]' /> <span className='text-[14px]'>My Account</span>
                                                        </MenuItem>
                                                        <MenuItem onClick={handleCloseMyAcc} component={Link} to="/my-orders" className='flex gap-2 !py-2'>
                                                            <FaShoppingCart className='text-[18px]' /><span className='text-[14px]'> Orders</span>
                                                        </MenuItem>
                                                        <MenuItem onClick={handleCloseMyAcc} component={Link} to="/my-list" className='flex gap-2 !py-2'>
                                                            <IoIosHeart className='text-[18px]' /> <span className='text-[14px]'>My List</span>
                                                        </MenuItem>
                                                        <Divider />
                                                        <MenuItem onClick={logout} className='flex gap-2 !py-2'>
                                                            <LuLogOut className='text-[18px]' /><span className='text-[14px]'> Logout</span>
                                                        </MenuItem>
                                                    </Menu>
                                                </li>
                                            }
                                        </>
                                    )
                            }

                            {/* Preserve Original Logic: Wish List only if windowWidth > 992 */}
                            {
                                context?.windowWidth > 992 &&
                                <li className='list-none'>
                                    <Tooltip title="Wish List">
                                        <Link to={"/my-list"}>
                                            <IconButton aria-label="wishlist">
                                                <StyledBadge badgeContent={context?.myListData?.length} color="secondary">
                                                    <FaRegHeart className="text-[22px]" />
                                                </StyledBadge>
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                </li>
                            }

                            <li className='list-none'>
                                <Tooltip title="cart">
                                    <IconButton aria-label="cart" onClick={context.toggleCartPanel(true)}>
                                        <StyledBadge badgeContent={context?.cartData?.length} color="secondary">
                                            <MdOutlineShoppingCart className="text-[24px]" />
                                        </StyledBadge>
                                    </IconButton>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Navigation setIsOpenCatPanel={setIsOpenCatPanel} isOpenCatPanel={isOpenCatPanel}/>
        </header>
    )
}
export default Header;