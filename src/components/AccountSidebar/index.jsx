import React, { useContext, useEffect, useState } from 'react';
import { LuMapPinCheck, LuUpload } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';
import { fetchDataFromApi, uploadImage } from '../../utils/api';
const AccountSidebar = () => {
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);

    const context = useContext(MyContext);

    const logout = () => {
        // setAnchorMyAcc(null);
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

    useEffect(() => {
        const userAvatar = [];
        if (context?.userData?.avatar !== "" && context?.userData?.avatar !== undefined) {
            userAvatar.push(context?.userData?.avatar);
            setPreviews(userAvatar)
        }
    }, [context?.userData])

    const formdata = new FormData();
    let selectedImages = [];

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPreviews([]);
            const files = e.target.files;
            setUploading(true);
            console.log(files);

            for (var i = 0; i < files.length; i++) {
                // Check if the file exists and its MIME type is a valid image format
                if (files[i] &&
                    (files[i].type === "image/jpeg" ||
                        files[i].type === "image/jpg" ||
                        files[i].type === "image/png" ||
                        files[i].type === "image/webp")
                ) {
                    const file = files[i];
                    selectedImages.push(file);
                    formdata.append('avatar', file);
                } else {
                    setUploading(false);
                    context.setAlertBox("error", "Please select a valid JPG, PNG or webp image file.",);
                    // Stop processing immediately
                    return false;
                }
                uploadImage("/api/user/user-avatar", formdata).then((res) => {
                    setUploading(false);
                    let avatar = [];
                    avatar.push(res?.data?.avtar);
                    setPreviews(avatar)
                })
            }

        } catch (error) {
            console.log(error);
            // Ensure uploading state is set to false here on error
            setUploading(false);
        }
    };
    return (
        <div className="card bg-white shadow-md rounded-md sticky top-[200px]">
            <div className="w-full p-5 flex items-center justify-center flex-col">
                <div className="w-[110px] relative h-[110px] !mb-4 rounded-full
                 overflow-hidden group flex items-center justify-center bg-gray-200">
                    {
                        uploading === true ? <CircularProgress color="inherit" /> :
                            <>
                                {
                                    previews?.length !== 0 ?
                                        previews.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                className="w-full h-full object-cover"
                                            />
                                        ))
                                        :
                                        <img
                                            src={'/user.png'}
                                            className="w-full h-full object-cover"
                                        />
                                }
                            </>
                    }
                    <div
                        className="overlay w-[100%] h-[100%] flex items-center justify-center
                                absolute top-0 opacity-0 transition-all left-0 z-50 bg-[rgba(0,0,0,0.7)]
                                 cursor-pointer group-hover:opacity-100">
                        <LuUpload className='text-[#fff] text-[25px]' />
                        <input type='file'
                            accept="image/*"
                            onChange={(e) => {
                                onChangeFile(e, "/api/user/user-avatar")
                            }}
                            name="avatar"
                            className='w-full cursor-pointer opacity-0 h-full absolute top-0 left-0' />
                    </div>
                </div>
                <h4>{context?.userData?.name}</h4>
                <h6 className='text-[12px] font-[500]'>{context?.userData?.email}</h6>
            </div>
            <ul className='list-none pb-5 bg-[#f1f1f1] myAccountTabs'>
                <li className="w-full">
                    <NavLink exact={true}
                        activeClassname="isActive"
                        to="/my-account" className={({ isActive }) =>
                            isActive ? "active" : ""}>
                        <Button className="w-full !py-2 !px-5 !text-left !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <FaRegUser className="text-[17px]" /> My Profile
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink exact={true}
                        activeClassname="isActive"
                        to="/address" className={({ isActive }) =>
                            isActive ? "active" : ""}>
                        <Button className="w-full !py-2 !px-5 !text-left !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <LuMapPinCheck className="text-[20px]" />Address
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink exact={true}
                        activeClassname="isActive"
                        to="/my-orders" className={({ isActive }) =>
                            isActive ? "active" : ""}>
                        <Button className="w-full !py-2  !px-5 !text-left !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <BsCart3 className="text-[17px]" /> My orders
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink exact={true}
                        activeClassname="isActive"
                        to="/my-list" className={({ isActive }) =>
                            isActive ? "active" : ""}>
                        <Button className="w-full !py-2  !px-5 !text-left !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <IoMdHeartEmpty className="text-[19px]" /> My List
                        </Button>
                    </NavLink>
                </li>
                <li className="w-full">
                        <Button onClick={logout} className="w-full !py-2  !px-5 !text-left !justify-start !capitalize !text-[rgba(0,0,0,0.8)] !rounded-none flex items-center gap-2">
                            <LuLogOut className="text-[17px]" />Logout
                        </Button>
                </li>
            </ul>
        </div>
    );
}

export default AccountSidebar;