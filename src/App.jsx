import React, { useCallback, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home/index.jsx'
import ProductListing from './pages/ProductListing/index.jsx'
import ProductDetails from './pages/ProductDetails/index.jsx'
import { createContext } from 'react'

import Login from './pages/Login/index.jsx';
import Register from './pages/Register/index.jsx';
import CartPage from './pages/Cart/index.jsx';
import Verify from './pages/Verify/index.jsx';

import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/ForgotPassword/index.jsx';
import Checkbox from '@mui/material/Checkbox';
import CheckOut from './pages/Checkout/index.jsx';
import MyAccount from './pages/MyAccount/index.jsx';
import MyList from './pages/MyList/index.jsx';
import Orders from './pages/Orders/index.jsx';
import { useEffect } from 'react';
import { fetchDataFromApi, postData } from './utils/api.js';
import Address from './pages/MyAccount/address.jsx';
import OrderSuccess from './pages/Orders/success.jsx';
import OrderFailed from './pages/Orders/failure.jsx';
import SearchPage from './pages/Search/index.jsx';
import './responsive.css';
const MyContext = createContext();
function App() {
  const [catData, setCatData] = useState([]);
  const [openProductDetailsModel, setOpenProductDetailsModel] = React.useState({
    open: false,
    item: {}
  });
  const [maxWidth, setMaxWidth] = useState('lg');
  const [addressMode, setAddressMode] = useState('add');
  const [addressId, setAddressId] = useState('');
  const [fullWidth, setFullWidth] = useState(false);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [openAddressPanel, setOpenAddressPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [openSearchPanel, setOpenSearchPanel] = useState(false);
  const [userData, setuserData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [myListData, setMyListData] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
    const [isFilterBtnShow, setIsFilterBtnShow] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //       fetchDataFromApi(`/api/user/user-details`)
  //     });
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleOpenProductDetailsModel = (status, item) => {
    setOpenProductDetailsModel({
      open: status,
      item: item
    });
  }
  const openAlertBox = (status, msg) => {
    if (status === 'Success' || status === 'success') {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  }
  const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel({
      open: false,
      item: {}
    });
  };
  const toggleCartPanel = (newOpen) => () => {
    setOpenCartPanel(newOpen);
  };
  const toggleAddressPanel = (newOpen) => () => {
    if (newOpen === false) {
      setAddressMode("add");
    }
    setOpenAddressPanel(newOpen);
  };

  const isRedirecting = useRef(false);


  // Make toast available globally for axios interceptor
  useEffect(() => {
    window.showToast = openAlertBox;
    return () => {
      delete window.showToast;
    };
  }, [openAlertBox]);

  const getUserDetails = () => {
    fetchDataFromApi(`/api/user/user-details`).then((res) => {
      setuserData(res.data);

      if (res?.error === true) {
        if (res?.message === "You have not login") {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshToken");
          setuserData(null);
          setIsLogin(false);
          setCartData([]);
          setMyListData([]); // ADD THIS LINE - Clear myListData on session expiry
          openAlertBox("error", "Your session has expired. Please login again.");
        }
      }
    });



  }

  // Session check function
  const checkUserSession = useCallback(async () => {
    const token = localStorage.getItem('accesstoken');

    if (!token) {
      setIsLogin(false);
      setuserData(null);
      setCartData([]);
      setMyListData([]); // ADD THIS LINE - Clear myListData when no token
      return;
    }

    try {
      const res = await fetchDataFromApi(`/api/user/user-details`);

      if (res?.error === true) {
        if (res?.message === "You have not login") {
          if (isRedirecting.current) return;

          isRedirecting.current = true;
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshToken");
          setuserData(null);
          setIsLogin(false);
          setCartData([]);
          setMyListData([]); // ADD THIS LINE - Clear myListData on session expiry
          openAlertBox("error", "Your session has expired. Please login again.");
        }
      } else if (res?.data) {
        setuserData(res.data);
        getCartItems();
        getMyListData();
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Error checking session:", err);
    }
  }, [openAlertBox]);

  // Initial session check on mount
  useEffect(() => {
    const token = localStorage.getItem('accesstoken');
    if (token) {
      checkUserSession();
    }
  }, []); // Run only once on mount

  // Periodic session check
  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('accesstoken');
      if (token && !isRedirecting.current) {
        checkUserSession();
      }
    }, 60000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [checkUserSession]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(window.innerWidth);
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.data);
    });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const addToCart = (product, userId, quantity) => {
    if (userId === undefined) {
      openAlertBox("error", "you are not login, Please login first");
      return false;
    }
    const data = {
      productTitle: product?.name,
      image: product?.image,
      rating: product?.rating,
      price: product?.price,
      quantity: quantity,
      subTotal: parseInt(product?.price * quantity),
      productId: product?._id,
      countInStock: product?.countInStock,
      brand: product?.brand,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      size: product?.size || null,
      weight: product?.weight || null,
      rams: product?.rams || null,

    }
    console.log(data)

    postData("/api/cart/add", data).then((res) => {
      if (res?.error === false) {
        openAlertBox("success", res?.message);
        getCartItems();
      } else {
        openAlertBox("error", res?.message)
      }
    })
  }

  const getCartItems = () => {
    fetchDataFromApi(`/api/cart/get`).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
      }
    });
  }

  const getMyListData = () => {
    fetchDataFromApi("/api/myList").then((res) => {
      if (res?.error === false) {
        setMyListData(res?.data);
      }
    });
  };

  const values = {
    openSearchPanel,setOpenSearchPanel,
    windowWidth, setWindowWidth,
    addressId, setAddressId,
    addressMode, setAddressMode,
    checkUserSession,
    setMyListData,
    getMyListData,
    myListData,
    fullWidth, maxWidth,
    handleCloseProductDetailsModel,
    handleOpenProductDetailsModel,
    setOpenProductDetailsModel,
    openProductDetailsModel,
    setOpenCartPanel,
    toggleCartPanel,
    openCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin, setCartData,
    userData, setuserData,
    setCatData, catData,
    addToCart,
    cartData,
    getCartItems,
    toggleAddressPanel,
    openAddressPanel, setOpenAddressPanel,
    getUserDetails,
    searchData, setSearchData,
    openFilter, setOpenFilter,
    isFilterBtnShow, setIsFilterBtnShow
  }

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path={"/"} exact={true} element={<Home />} />
            <Route path={"/products"} exact={true} element={<ProductListing />} />
            <Route path={"/product/:id"} exact={true} element={<ProductDetails />} />
            <Route path={"/login"} exact={true} element={<Login />} />
            <Route path={"/register"} exact={true} element={<Register />} />
            <Route path={"/cart"} exact={true} element={<CartPage />} />
            <Route path={"/verify"} exact={true} element={<Verify />} />
            <Route path={"/forgot-password"} exact={true} element={<ForgotPassword />} />
            <Route path={"/checkout"} exact={true} element={<CheckOut />} />
            <Route path={"/my-account"} exact={true} element={<MyAccount />} />
            <Route path={"/my-list"} exact={true} element={<MyList />} />
            <Route path={"/my-orders"} exact={true} element={<Orders />} />
            <Route path={"/order/success"} exact={true} element={<OrderSuccess />} />
            <Route path={"/order/failed"} exact={true} element={<OrderFailed />} />
            <Route path={"/address"} exact={true} element={<Address />} />
            <Route path={"/search"} exact={true} element={<SearchPage />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
      {/* <Toaster /> */}
      <Toaster />

    </>
  )
}

export default App;
export { MyContext };
