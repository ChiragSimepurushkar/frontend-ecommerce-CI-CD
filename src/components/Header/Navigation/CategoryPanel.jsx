import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoClose } from "react-icons/io5";
import "../Navigation/style.css"
import CategoryCollapse from '../../CategoryCollapse';
import { Button } from '@mui/material';
import { MyContext } from '../../../App';
import { Link } from 'react-router-dom';
import { fetchDataFromApi } from '../../../utils/api';
const CategoryPanel = (props) => {
    const context = useContext(MyContext)
    const toggleDrawer = (newOpen) => () => {
        props.setIsOpenCatPanel(newOpen);
        props.propSetIsOpenCatPanel(newOpen)
    };
    const logout = () => {
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
        fetchDataFromApi(`/api/user/logout?token=${token}`, {
            withCredentials: true
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

    const DrawerList = (
        <Box sx={{ width: 320 }} role="presentation" className="categoryPanel">
            <div className="p-3">
                <img src={'/logo.png'} className="w-[170px]" />
            </div>
            <h3 className='p-3 text-[15px] font-[500] 
            flex items-center justify-between'>Shop By Category
                < IoClose onClick={toggleDrawer(false)} className='cursor-pointer text-[20px]' />
            </h3>
            {
                props?.data?.length !== 0 &&
                <CategoryCollapse data={props?.data} />
            }
            {
                context?.windowWidth < 992 && context?.isLogin === false &&
                <div className="p-3 block">
                    <Link onClick={() => {
                        props.setIsOpenCatPanel(false);
                        props.propSetIsOpenCatPanel(false)
                    }} to={'/login'}><Button className="btn-org w-full">Login</Button>
                    </Link>
                </div>
            }
            {
                context?.windowWidth < 992 && context?.isLogin === true &&
                <div className="p-3 block" onClick={logout} to={'/login'}><Button className="btn-org w-full">Logout</Button>
                </div>
            }
        </Box>
    );
    return (
        <div>
            <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default CategoryPanel;