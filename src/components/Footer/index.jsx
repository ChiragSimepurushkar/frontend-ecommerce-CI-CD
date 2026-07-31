import React, { useContext } from 'react';
import { FaShippingFast } from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { FaGifts } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { MdSupportAgent } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoCloseCircleOutline } from "react-icons/io5";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";

import Drawer from '@mui/material/Drawer';
import { MyContext } from '../../App.jsx';
import CartPanel from '../CartPanel/index.jsx';
import { createContext } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ProductDetailsComponent from '../ProductDetailsComponent/index.jsx';
import ProductZoom from '../ProductZoom/index.jsx';
import AddAddress from '../../pages/MyAccount/addAddress.jsx';


const Footer = () => {
    const context = useContext(MyContext);
    return (
        <>
            <footer className='py-6 bg-[#f8f8f8] border-1 
            border-[rgba(0,0,0,0.1)]'>
                <div className="container">
                    <div className="scrollableBox footerBoxWrap flex items-center justify-center 
                    px-5 py-3 lg:py-8 gap-10 pb-3 lg:pb-8">
                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <FaShippingFast className='group-hover:-translate-y-1 text-[50px] transition-all duration-300 group-hover:text-[#ff5252]' />
                            <h3 className='text-[16px] font-[600] mt-3'>Free Shipping</h3>
                            <p className='text-[12px] font-[500]'>For all Orders Over $100</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <FaBoxesPacking className='group-hover:-translate-y-1 text-[50px] transition-all duration-300 group-hover:text-[#ff5252]' />
                            <h3 className='text-[16px] font-[600] mt-3'>30 Days Returns</h3>
                            <p className='text-[12px] font-[500]'>For an Exchange product</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <GiWallet className='group-hover:-translate-y-1 text-[50px] transition-all duration-300 group-hover:text-[#ff5252]' />
                            <h3 className='text-[16px] font-[600] mt-3'>Secure Payment</h3>
                            <p className='text-[12px] font-[500]'>Payment Card Accepted</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <FaGifts className='group-hover:-translate-y-1 text-[50px] transition-all duration-300 group-hover:text-[#ff5252]' />
                            <h3 className='text-[16px] font-[600] mt-3'>Special Gifts</h3>
                            <p className='text-[12px] font-[500]'>For all Orders Over $100</p>
                        </div>
                        <div className="col flex items-center justify-center flex-col group w-[15%]">
                            <MdSupportAgent className='group-hover:-translate-y-1 text-[50px] transition-all duration-300 group-hover:text-[#ff5252]' />
                            <h3 className='text-[16px] font-[600] mt-3'>Support 24/7</h3>
                            <p className='text-[12px] font-[500]'>FContact us Anytime</p>
                        </div>
                    </div>
                    <br></br>
                    <hr />
                    <div className="footer flex px-3 lg:px-0 py-8 flex-col lg:flex-row">
                        <div className="part1 w-full lg:w-[25%] border-r border-[rgba(0,0,0,0.1)]">
                            <h2 className='text-[18px] font-[600] !mb-4'>Contact Us</h2>
                            <p className='text-[13px] font-[400] pb-4'>Classushop - Mega Super Store<br></br> 580-Union Trade Center France</p>
                            <Link className='link text-[13px]' to="mailto:simepurushkarchirag84@gmail.com">sales@yourcomapny.com</Link>
                            <span className='text-[22px] font-[600] block w-full !mt-3 !mb-5 text-[#ff5252]'>(+91) 9359025745</span>
                            <div className="flex items-center gap-2">
                                <IoMdChatbubbles className='text-[40px] text-[#ff5252]' />
                                <span className='text-[16px] font-[600]'>
                                    Online Chat <br></br>Get Expert Help</span>
                            </div>
                        </div>
                        <div className="part2 w-full lg:w-[40%] flex lg:pl-10 pl-0 mt-5 lg:mt-0">
                            <div className="part2_col1 w-[50%]">
                                <h2 className='text-[18px] font-[600] !mb-4'>Products</h2>
                                <ul className='list'>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>Price Drop</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>New Products</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>Best Sales</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>Contact Us</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>SiteMap</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>Stores</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="part2_col1 w-[50%] pl-10">
                                <h2 className='text-[18px] font-[600] !mb-4'>Comapny</h2>
                                <ul className='list'>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>Delivery</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>Legal Notice</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>Teams And Conditions of Use</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>About Us</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>Secure Payment</Link>
                                    </li>
                                    <li className='list-none text-[14px] w-full !mb-2'>
                                        <Link to="/" className='link'>Login</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="part3 w-full lg:w-[35%] px-4 md:px-8 flex-col mt-10 lg:mt-0">
                            <h2 className='text-[18px] font-[600] mb-2 lg:!mb-4'>Subscribe to newsletter</h2>
                            <p className='text-[13px]'>Subscribe to our latest newsletter to get news about special discounts</p>

                            <form className='mt-5 w-full'>
                                <input
                                    type="text"
                                    className='!mb-4 w-full h-[45px] focus:border-[rgba(0,0,0,0.3)] border outline-none px-4 rounded-sm'
                                    placeholder='Your Email Address'
                                />

                                {/* Added w-full to button for better touch target on mobile */}
                                <Button className='btn-org w-full lg:w-auto'>SUBSCRIBE</Button>

                                <FormControlLabel
                                    className='mt-3 lg:mt-0 block w-full'
                                    /* Fixed: Added specific styling to ensure text wraps correctly on mobile */
                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px', lineHeight: '1.4' } }}
                                    control={<Checkbox size="small" />}
                                    label="I agree to the terms and conditions and the privacy policy"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
            <div className=" bg-white bottomStrip py-3 border-t border-[rgba(0,0,0,0.1)] pt-3 pb-[100px] lg:pb-3">
                <div className="container flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0">
                    <ul className='flex items-center gap-2'>
                        <li className='list-none'>
                            <Link to="/" target="_blank"
                                className='h-[35px] w-[35px] rounded-full 
                            border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                                <FaLinkedin className='text-[20px] group-hover:bg-[#ff5252] group-hover:text-white' />
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link to="/" target="_blank"
                                className='h-[35px] w-[35px] rounded-full 
                            border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                                <SiGmail className='text-[20px] group-hover:bg-[#ff5252] group-hover:text-white' />
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link to="/" target="_blank"
                                className='h-[35px] w-[35px] rounded-full 
                            border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                                <FaSquareInstagram className='text-[20px] group-hover:bg-[#ff5252] group-hover:text-white' />
                            </Link>
                        </li>
                        <li className='list-none'>
                            <Link to="/" target="_blank"
                                className='h-[35px] w-[35px] rounded-full 
                            border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all'>
                                <IoLogoYoutube className='text-[20px] group-hover:bg-[#ff5252] group-hover:text-white' />
                            </Link>
                        </li>
                    </ul>
                    <p className='mb-0 text-[13px] text-center'>&copy;
                        2025- Ecommerce Software by Chirag Simepurushkar
                    </p>
                    <div className="flex items-center">
                        <img src="https://ecommerce-frontend-view.netlify.app/carte_bleue.png" />
                        <img src="https://ecommerce-frontend-view.netlify.app/visa.png" />
                        <img src="https://ecommerce-frontend-view.netlify.app/master_card.png" />
                        <img src="https://ecommerce-frontend-view.netlify.app/american_express.png" />
                        <img src="https://ecommerce-frontend-view.netlify.app/paypal.png" />
                    </div>
                </div>
            </div>


            {/* Cart Panel */}
            <Drawer open={context.openCartPanel}
                onClose={context.toggleCartPanel(false)}
                anchor={"right"}
                className='cartPanel'>
                <div className="border-b overflow-hidden border-[rgba(0,0,0,0.1)] cartPanel w-[400px] flex items-center justify-between py-3 px-4 gap-3">
                    <h4>Shopping Cart ({context?.cartData?.length})</h4>
                    <IoCloseCircleOutline className='text-[20px] cursor-pointer'
                        onClick={context.toggleCartPanel(false)} />
                </div>
                {context?.cartData?.length !== 0 ? <CartPanel data={context?.cartData} /> :
                    <>
                        <div className="flex items-center justify-center flex-col pt-40 gap-5">
                            <img src="/shopping.png" className='w-[280px]' />
                            <h4 className='font-[800]'>Your Cart is currently empty</h4>
                            <Link to={'/'}>
                                <Button className='btn-org btn-md'
                                    onClick={context.toggleCartPanel(false)} >
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </>}
            </Drawer>



            {/* Address Panel */}
            <Drawer open={context.openAddressPanel}
                onClose={context.toggleAddressPanel(false)}
                anchor={"right"}
                className='addressPanel'>
                <div className="border-b overflow-hidden border-[rgba(0,0,0,0.1)] 
                cartPanel w-[550px] flex items-center justify-between py-3 px-4 gap-3">
                    <h4>{context?.addressMode === "add" ? 'Add ' : "Edit "}
                        Delivery Address</h4>
                    <IoCloseCircleOutline className='text-[20px] cursor-pointer'
                        onClick={context.toggleAddressPanel(false)} />
                </div>
                <div className="p-8 w-full max-h-[82vh] overflow-auto">
                    <AddAddress />
                </div>
            </Drawer>


            <Dialog
                fullWidth={context?.fullWidth}
                maxWidth={context?.maxWidth}
                open={context?.openProductDetailsModel.open}
                onClose={context?.handleCloseProductDetailsModel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='productDetailsModel'
            >
                <DialogContent>
                    <div className="flex items-center w-full productDetailsModelContainer relative">
                        <Button onClick={context?.handleCloseProductDetailsModel}
                            className='!h-[40px] !text-[#000] !rounded-full !w-[40px] 
            !min-w-[40px] !absolute top-[15px] !bg-[#f1f1f1] right-[15px]'>
                            <IoCloseCircleOutline className='!text-[20px]' /></Button>
                        {
                            context?.openProductDetailsModel?.item?.length !== 0 &&
                            <>
                                <div className="col1 w-[40%] px-3 py-8">
                                    <ProductZoom images={context?.openProductDetailsModel?.item?.images} />
                                </div>
                                <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
                                    <ProductDetailsComponent item={context?.openProductDetailsModel?.item} />
                                </div>
                            </>
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Footer;

// import React, { useContext } from 'react';
// import { FaShippingFast, FaLinkedin, FaGifts, FaShoppingCart } from "react-icons/fa";
// import { FaBoxesPacking, FaSquareInstagram } from "react-icons/fa6";
// import { GiWallet } from "react-icons/gi";
// import { IoMdChatbubbles, IoLogoYoutube } from "react-icons/io";
// import { MdSupportAgent } from "react-icons/md";
// import { Link } from 'react-router-dom';
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { SiGmail } from "react-icons/si";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Drawer from '@mui/material/Drawer';
// import { MyContext } from '../../App.jsx';
// import CartPanel from '../CartPanel/index.jsx';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import ProductDetailsComponent from '../ProductDetailsComponent/index.jsx';
// import ProductZoom from '../ProductZoom/index.jsx';
// import AddAddress from '../../pages/MyAccount/addAddress.jsx';
// import { IconButton } from '@mui/material';

// const Footer = () => {
//     const context = useContext(MyContext);
//     return (
//         <>
//             <footer className='py-10 bg-[#f8f8f8] border-t border-gray-200'>
//                 <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-screen-xl">
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 pb-10 border-b border-gray-200">
//                         {[
//                             { Icon: FaShippingFast, title: "Free Shipping", desc: "For all Orders Over $100" },
//                             { Icon: FaBoxesPacking, title: "30 Days Returns", desc: "For an Exchange product" },
//                             { Icon: GiWallet, title: "Secure Payment", desc: "Payment Card Accepted" },
//                             { Icon: FaGifts, title: "Special Gifts", desc: "For all Orders Over $100" },
//                             { Icon: MdSupportAgent, title: "Support 24/7", desc: "Contact us Anytime" }
//                         ].map((item, index) => (
//                             <div key={index} className="flex flex-col items-center text-center min-w-[160px] lg:min-w-0 lg:flex-1 group">
//                                 <item.Icon className='text-[40px] lg:text-[50px] transition-transform duration-300 group-hover:-translate-y-2 group-hover:text-[#ff5252] text-gray-700' />
//                                 <h3 className='text-[15px] font-[600] mt-4 text-gray-900'>{item.title}</h3>
//                                 <p className='text-[12px] text-gray-500 mt-1'>{item.desc}</p>
//                             </div>
//                         ))}
//                     </div>

//                     <hr className="my-8 border-gray-200" />

//                     <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-10 lg:py-12">
//                         <div className="md:col-span-4 lg:col-span-3">
//                             <h2 className='text-[18px] font-[700] mb-6 uppercase tracking-wider text-gray-800'>Contact Us</h2>
//                             <p className='text-[14px] leading-relaxed text-gray-600 mb-4'>
//                                 Classushop - Mega Super Store<br />
//                                 580-Union Trade Center France
//                             </p>
//                             <Link className='text-[14px] text-blue-600 hover:underline' to="mailto:sales@yourcomapny.com">sales@yourcomapny.com</Link>
//                             <span className='text-[24px] font-[700] block my-4 text-[#ff5252]'>(+91) 9359025745</span>
//                             <div className="flex items-center gap-4 mt-6 p-4 bg-white rounded-xl shadow-sm">
//                                 <IoMdChatbubbles className='text-[40px] text-[#ff5252]' />
//                                 <span className='text-[15px] font-[600] text-gray-800 leading-tight'>
//                                     Online Chat <br /><span className="text-[13px] font-[400] text-gray-500">Get Expert Help</span>
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="md:col-span-8 lg:col-span-5 grid grid-cols-2 gap-6">
//                             <div className="">
//                                 <h2 className='text-[16px] font-[700] mb-6 uppercase tracking-wider text-gray-800'>Products</h2>
//                                 <ul className='space-y-3'>
//                                     {['Price Drop', 'New Products', 'Best Sales', 'Contact Us', 'SiteMap', 'Stores'].map(link => (
//                                         <li key={link}><Link to="/" className='text-[14px] text-gray-500 hover:text-[#ff5252] transition-colors'>{link}</Link></li>
//                                     ))}
//                                 </ul>
//                             </div>
//                             <div className="flex-1 pl-4">
//                                 <h2 className='text-[16px] font-[700] mb-6 uppercase tracking-wider text-gray-800'>Company</h2>
//                                 <ul className='space-y-3'>
//                                     {['Delivery', 'Legal Notice', 'Terms And Conditions', 'About Us', 'Secure Payment', 'Login'].map(link => (
//                                         <li key={link}><Link to="/" className='text-[14px] text-gray-500 hover:text-[#ff5252] transition-colors'>{link}</Link></li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="md:col-span-12 lg:col-span-4">
//                             <h2 className='text-[18px] font-[700] mb-4 uppercase tracking-wider text-gray-800'>Newsletter</h2>
//                             <p className='text-[14px] text-gray-500 mb-6'>Subscribe to get news about special discounts and latest offers.</p>
//                             <form className='space-y-4'>
//                                 <input type="text" className='w-full h-[48px] border border-gray-300 outline-none px-4 rounded-lg focus:border-[#ff5252] transition-all bg-white' placeholder='Your Email Address' />
//                                 <Button className='!bg-[#ff5252] !text-white !w-full !py-3 !font-bold !rounded-lg hover:!bg-black transition-all'>SUBSCRIBE</Button>
//                                 <FormControlLabel control={<Checkbox size="small" />} className="!text-gray-500" label={<span className="text-[12px]">I agree the terms and conditions</span>} />
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </footer>

//             <div className="bg-white py-6 border-t border-gray-200">
//                 <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
//                     <div className='flex items-center gap-3 order-2 md:order-1'>
//                         {[
//                             { Icon: FaLinkedin, path: "/" },
//                             { Icon: SiGmail, path: "/" },
//                             { Icon: FaSquareInstagram, path: "/" },
//                             { Icon: IoLogoYoutube, path: "/" }
//                         ].map((soc, i) => (
//                             <Link key={i} to={soc.path} className='h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#ff5252] hover:text-white hover:border-[#ff5252] transition-all'>
//                                 <soc.Icon className='text-[18px]' />
//                             </Link>
//                         ))}
//                     </div>

//                     <p className='text-[13px] text-gray-400 order-3 md:order-2 text-center'>
//                         &copy; 2025 Ecommerce by Chirag Simepurushkar
//                     </p>

//                     <div className="flex items-center gap-2 order-1 md:order-3 opacity-70 grayscale hover:grayscale-0 transition-all">
//                         <img src="https://ecommerce-frontend-view.netlify.app/carte_bleue.png" alt="card" className="h-6" />
//                         <img src="https://ecommerce-frontend-view.netlify.app/visa.png" alt="visa" className="h-6" />
//                         <img src="https://ecommerce-frontend-view.netlify.app/master_card.png" alt="mastercard" className="h-6" />
//                         <img src="https://ecommerce-frontend-view.netlify.app/paypal.png" alt="paypal" className="h-6" />
//                     </div>
//                 </div>
//             </div>

//             <Drawer
//                 open={context.openCartPanel}
//                 onClose={context.toggleCartPanel(false)}
//                 anchor="right"
//                 PaperProps={{ sx: { width: { xs: '100%', sm: '400px' } } }}
//             >
//                 <div className="flex items-center justify-between p-4 border-b">
//                     <h4 className="font-bold text-lg">Shopping Cart ({context?.cartData?.length})</h4>
//                     <IoCloseCircleOutline className='text-2xl cursor-pointer hover:text-red-500' onClick={context.toggleCartPanel(false)} />
//                 </div>
//                 {context?.cartData?.length !== 0 ? <CartPanel data={context?.cartData} /> :
//                     <div className="flex items-center justify-center flex-col h-full px-10 text-center gap-6">
//                         <img src="/shopping.png" className='w-48 opacity-20' alt="empty" />
//                         <h4 className='font-bold text-xl text-gray-400'>Your Cart is empty</h4>
//                         <Button className='!bg-[#ff5252] !text-white !px-8 !py-3 !rounded-full' onClick={context.toggleCartPanel(false)}>
//                             Continue Shopping
//                         </Button>
//                     </div>
//                 }
//             </Drawer>

//             <Drawer
//                 open={context.openAddressPanel}
//                 onClose={context.toggleAddressPanel(false)}
//                 anchor="right"
//                 PaperProps={{ sx: { width: { xs: '100%', sm: '550px' } } }}
//             >
//                 <div className="flex items-center justify-between p-4 border-b">
//                     <h4 className="font-bold text-lg">{context?.addressMode === "add" ? 'Add ' : "Edit "} Delivery Address</h4>
//                     <IoCloseCircleOutline className='text-2xl cursor-pointer hover:text-red-500' onClick={context.toggleAddressPanel(false)} />
//                 </div>
//                 <div className="p-6 overflow-y-auto">
//                     <AddAddress />
//                 </div>
//             </Drawer>

//             <Dialog
//                 fullWidth
//                 maxWidth="lg"
//                 open={context?.openProductDetailsModel.open}
//                 onClose={context?.handleCloseProductDetailsModel}
//                 className='productDetailsModel'
//                 PaperProps={{ sx: { borderRadius: '20px', overflow: 'hidden' } }}
//             >
//                 <DialogContent className="!p-0">
//                     <div className="relative flex flex-col lg:flex-row w-full min-h-[400px]">
//                         <IconButton
//                             onClick={context?.handleCloseProductDetailsModel}
//                             className='!absolute top-4 right-4 z-50 !bg-white/80 !backdrop-blur-sm shadow-md'
//                         >
//                             <IoCloseCircleOutline />
//                         </IconButton>

//                         {context?.openProductDetailsModel?.item && (
//                             <>
//                                 <div className="w-full lg:w-1/2 p-6 lg:p-10 bg-gray-50 flex items-center justify-center">
//                                     <ProductZoom images={context?.openProductDetailsModel?.item?.images} />
//                                 </div>
//                                 <div className="w-full lg:w-1/2 p-6 lg:p-12 overflow-y-auto">
//                                     <ProductDetailsComponent item={context?.openProductDetailsModel?.item} />
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// }

// export default Footer;