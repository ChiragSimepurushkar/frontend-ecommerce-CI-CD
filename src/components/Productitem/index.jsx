import React, { useContext, useEffect, useState } from 'react';
import '../Productitem/style.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";
import { MdClose, MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import Tooltip from '@mui/material/Tooltip';
import { MyContext } from '../../App';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { deleteData, editData, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
const Productitem = (props) => {
    const context = useContext(MyContext);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [isAddedInMyList, setIsAddedInMyList] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [selectedTabName, setSelectedTabName] = useState(null);
    const [isShowTabs, setIsShowTabs] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const addToCart = (product, userId, quantity) => {

        const productItem = {
            name: product?.name,
            image: product?.images?.[0],
            rating: product?.rating,
            price: product?.price,
            quantity: quantity,
            subTotal: parseInt(product?.price * quantity),
            _id: product?._id,
            countInStock: product?.countInStock,
            brand: product?.brand,
            oldPrice: product?.oldPrice,
            discount: product?.discount,
            size: props?.item?.size?.length !== 0 ? selectedTabName : null,
            weight: props?.item?.productWeight?.length !== 0 ? selectedTabName : null,
            rams: props?.item?.productRam?.length !== 0 ? selectedTabName : null,
        }
        setIsLoading(true);
        if (props?.item?.size?.length !== 0
            || props?.item?.productRam?.length !== 0
            || props?.item?.productWeight?.length !== 0) {
            setIsShowTabs(true);
        } else {
            context?.addToCart(productItem, userId, quantity);
            setIsAdded(true);
            setIsShowTabs(false);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }


        if (activeTab !== null) {
            context?.addToCart(productItem, userId, quantity);
            setIsAdded(true);
            setIsShowTabs(false);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);

        }

    }

    useEffect(() => {
    if (!context?.cartData || !props?.item?._id) {
        setIsAdded(false);
        setQuantity(1);
        setCartItem([]);
        return;
    }

    const item = context.cartData.filter((cartItem) => {
        const productId = typeof cartItem.productId === 'object'
            ? cartItem.productId._id
            : cartItem.productId;
        return productId === props.item._id;
    });

    if (item.length > 0) {
        setCartItem(item);
        setQuantity(item[0]?.quantity || 1);
        setIsAdded(true);
    } else {
        setCartItem([]);
        setQuantity(1);
        setIsAdded(false);
    }
}, [context?.cartData, props?.item?._id]);

// Separate useEffect for myList to avoid dependency issues
useEffect(() => {
    if (!context?.myListData || !props?.item?._id) {
        setIsAddedInMyList(false);
        return;
    }

    const myListItem = context.myListData.filter((item) => {
        const productId = typeof item.productId === 'object'
            ? item.productId._id
            : item.productId;
        return productId === props.item._id;
    });

    setIsAddedInMyList(myListItem.length > 0);
}, [context?.myListData, props?.item?._id]);

    const handleClickActiveTab = (index, name) => {
        setActiveTab(index)
        setSelectedTabName(name)
    }

    const minQty = () => {
        if (quantity === 1) {
            // Delete when quantity is 1
            deleteData(`/api/cart/delete-cart-item/${cartItem[0]?._id}`).then((res) => {
                setIsAdded(false);
                setQuantity(1);
                context?.openAlertBox("success", res?.message); // Changed: res?.message not res?.data?.message
                context?.getCartItems();
                setIsAdded(false);
                setActiveTab(null)
                setIsShowTabs(false);
            }).catch((error) => {
                console.error("Delete error:", error);
                context?.openAlertBox("error", "Failed to remove item");
            });
        } else {
            // Update quantity when > 1
            const newQty = quantity - 1;
            setQuantity(newQty);

            const obj = {
                _id: cartItem[0]?._id,
                qty: newQty,
                subTotal: props?.item?.price * newQty
            };

            editData(`/api/cart/update-qty`, obj).then((res) => {
                context?.openAlertBox("success", res?.data?.message); // Changed: res?.message not res?.data?.message
                context?.getCartItems();
            }).catch((error) => {
                console.error("Update error:", error);
                context?.openAlertBox("error", "Failed to update");
            });
        }
    };
     const handleAddToMyList = (item) => {
        if (isAddedInMyList) return;

    if (context?.userData === null) {
      context?.openAlertBox("error", "you are not login please login first");
      return false;
    } else {
      const obj = {
        productId: item?._id,
        userId: context?.userData?._id,
        productTitle: item?.name,
        image: item?.images[0],
        rating: item?.rating,
        price: item?.price,
        oldPrice: item?.oldPrice,
        brand: item?.brand,
        discount: item?.discount,
      };

      postData("/api/myList/add", obj).then((res) => {
        if (res?.error === false) {
          context?.openAlertBox("success", res?.message);
          setIsAddedInMyList(true)
          context?.getMyListData();
        }else{
          context?.openAlertBox("error", res?.message);
        }
      });

      return true;
    }

  };

    const addQty = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);

        const obj = {
            _id: cartItem[0]?._id,
            qty: newQty,
            subTotal: props?.item?.price * newQty
        };

        editData(`/api/cart/update-qty`, obj).then((res) => {
            context?.openAlertBox("success", res?.data?.message); // Changed: res?.message not res?.data?.message
            context?.getCartItems();
        }).catch((error) => {
            console.error("Update error:", error);
            context?.openAlertBox("error", "Failed to update");
        });
    };
    
    

    return (
        <div className="Productitem flex-col lg:flex-row  shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
            <div className="group imgWrapper w-full lg:w-[100%] overflow-hidden rounded-md relative">
                <Link to={`/product/${props?.item?._id}`}>
                    <div className="img h-[250px] overflow-hidden relative group">
                        <img src={props?.item?.images?.[0]}
                            className='w-full h-full object-cover transition-all duration-700 group-hover:scale-105' alt={props?.item?.name} />
                        {props?.item?.images?.[1] && (
                            <img src={props?.item?.images?.[1]}
                                className='opacity-0 absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-100 group-hover:scale-105' alt={props?.item?.name} />
                        )}
                    </div>
                </Link>
                {
                    isShowTabs === true &&
                    <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full !bg-[rgba(0,0,0,0.5)] z-[60] p-3 gap-2">
                       <Button 
                       onClick={()=>setIsShowTabs(false)}
                       className="!absolute top-[10px] !h-[30px] right-[10px] !min-w-[30px] !min-h-[30px] !w-[30px] !rounded-full !bg-[rgba(255,255,255,1)]">
  <MdClose className="text-black [90] text-[25px]" />
</Button>      
                        {
                            props?.item?.size?.length !== 0 && props?.item?.size?.map((size, index) => {
                                return (
                                    <span
                                        onClick={() => handleClickActiveTab(index, size)}
                                        key={index} className={`flex items-center justify-center p-2 bg-[rgba(255,255,255,0.8)] 
                                max-w-[40px] h-[30px] rounded-sm cursor-pointer hover:bg-white ${activeTab === index && '!bg-[#ff5252] text-white'}`}>
                                        {size}
                                    </span>
                                )
                            })
                        }
                        {
                            props?.item?.productRam?.length !== 0 && props?.item?.productRam?.map((item, index) => {
                                return (
                                    <span
                                        onClick={() => handleClickActiveTab(index, item)}
                                        key={index} className={`flex items-center justify-center p-2 bg-[rgba(255,255,255,0.8)] 
                                max-w-[45px] h-[30px] rounded-sm cursor-pointer hover:bg-white ${activeTab === index && '!bg-[#ff5252] text-white'}`}>
                                        {item}
                                    </span>
                                )
                            })
                        }
                        {
                            props?.item?.productWeight?.length !== 0 && props?.item?.productWeight?.map((item, index) => {
                                return (
                                    <span
                                        onClick={() => handleClickActiveTab(index, item)}
                                        key={index} className={`flex items-center justify-center p-2 bg-[rgba(255,255,255,0.8)] 
                                max-w-[40px] h-[30px] rounded-sm cursor-pointer hover:bg-white ${activeTab === index && '!bg-[#ff5252] text-white'}`}>
                                        {item}
                                    </span>
                                )
                            })
                        }
                    </div>
                }


                <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff5252] text-white rounded-lg p-1 text-[12px] font-[500]'>
                    {props?.item?.discount}%</span>

                <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px]
                 transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
                    <Tooltip title="Like" placement="left-start">
                        
                        <Button 
                        onClick={()=>handleAddToMyList(props?.item)} 
                        className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
                    hover:!bg-[#ff5252] hover:!text-white group`}>
                         {isAddedInMyList===true ?
                         <IoIosHeart
                         className="text-[18px] heart-animate heart-glow"
                          style={{ color: '#ff5252' }}
                            />
                          :
                          <IoIosHeartEmpty className='text-[18px] !text-black group-hover:text-white' />
                         }
                           
                        </Button>
                    </Tooltip>
                    <Tooltip title="Comapre" placement="left-start">
                        <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
                    hover:!bg-[#ff5252] hover:!text-white group'>
                            <IoIosGitCompare className='text-[18px] !text-black group-hover:text-white' />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Zoom" placement="left-start">
                        <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
                    hover:!bg-[#ff5252] hover:!text-white group' onClick={() => context.handleOpenProductDetailsModel(true, props?.item)}>
                            <MdZoomOutMap className='text-[18px] !text-black group-hover:text-white' />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Share" placement="left-start">
                        <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
                    hover:!bg-[#ff5252] hover:!text-white group'>
                            <CiShare1 className='text-[18px] !text-black group-hover:text-white' />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className="info p-3 py-5 pb-[50px] px-3 lg:px-8 h-[190px] relative w-full lg:w-[75%]">
                <h6 className='text-[12px] lg:text-[13px] !font-[400]'><Link to={`/product/${props?.item?._id}`} className='link transition-all'>
                    {props?.item?.brand}</Link></h6>
                <h3 className='mb-1 text-[13px] title mt-1 font-[500] text-[#000]'><Link to={`/product/${props?.item?._id}`} className='link transition-all'>
                    {props?.item?.name.substr(0, 25) + "..."}</Link></h3>
                <Rating name="size-small" defaultValue={props?.item?.rating} size="small" readOnly />
                <div className="flex items-center gap-4">
                    <span className='oldPrice line-through text-gray-500 font-[500] text-[15px]'>&#x20b9;{props?.item?.OldPrice}</span>
                    <span className='price text-[#ff5252] text-[12px] lg:text-[15px] font-[600]'>
                    {props?.item?.price?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</span>
                </div>
                <div className="!absolute bottom-[15px] left-0 pl-3 pr-3 w-full">
                    {
                        isAdded === false ?
                            <Button
                                onClick={() => addToCart(props?.item, context?.userData?._id, quantity)}
                                className="btn-org addToCartBtn btn-border flex w-full btn-sm gap-2" size="small">
                                <MdOutlineShoppingCart className="text-[18px]" /> Add to Cart
                            </Button>
                            :
                            <>
                                {
                                    isLoading === true ?
                                        <Button
                                            className="btn-org btn-border flex w-full btn-sm gap-2" size="small">
                                            <CircularProgress />
                                        </Button>
                                        :
                                        <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)]">
                                            <Button className="!min-w-[35px] !w-[35px] !h-[30px] !bg-[#f1f1f1] !rounded-none"
                                                onClick={
                                                    minQty
                                                }>
                                                <FaMinus className="text-[rgba(0,0,0,0.7)]" /></Button>
                                            <span>{quantity}</span>
                                            <Button onClick={addQty} className="!min-w-[35px] !w-[35px] !h-[30px] !bg-[#ff5252] !rounded-none">
                                                <FaPlus className="text-white" />
                                            </Button>
                                        </div>
                                }
                            </>

                    }
                </div>
            </div>
        </div>
    );
}

export default Productitem;




// import React, { useContext, useEffect, useState, useRef } from 'react';
// import '../Productitem/style.css';
// import { Link } from 'react-router-dom';
// import Rating from '@mui/material/Rating';
// import Button from '@mui/material/Button';
// import { IoIosHeartEmpty } from "react-icons/io";
// import { IoIosGitCompare } from "react-icons/io";
// import { MdOutlineShoppingCart, MdZoomOutMap } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";
// import Tooltip from '@mui/material/Tooltip';
// import { MyContext } from '../../App';
// import { FaMinus, FaPlus } from 'react-icons/fa6';
// import { deleteData, editData } from '../../utils/api';
// import CircularProgress from '@mui/material/CircularProgress';

// const Productitem = (props) => {
//     const context = useContext(MyContext);
//     const [quantity, setQuantity] = useState(1);
//     const [isAdded, setIsAdded] = useState(false);
//     const [cartItem, setCartItem] = useState([]);
//     const [activeTab, setActiveTab] = useState(null);
//     const [selectedTabName, setSelectedTabName] = useState(null);
//     const [isShowTabs, setIsShowTabs] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const productRef = useRef(null);

//     const addToCart = (product, userId, quantity) => {
//         const productItem = {
//             name: product?.name,
//             image: product?.images?.[0],
//             rating: product?.rating,
//             price: product?.price,
//             quantity: quantity,
//             subTotal: parseInt(product?.price * quantity),
//             _id: product?._id,
//             countInStock: product?.countInStock,
//             brand: product?.brand,
//             oldPrice: product?.oldPrice,
//             discount: product?.discount,
//             size: props?.item?.size?.length !== 0 ? selectedTabName : null,
//             weight: props?.item?.productWeight?.length !== 0 ? selectedTabName : null,
//             rams: props?.item?.productRam?.length !== 0 ? selectedTabName : null,
//         }
        
//         setIsLoading(true);
        
//         // Check if product has variants that need selection
//         const hasVariants = props?.item?.size?.length !== 0
//             || props?.item?.productRam?.length !== 0
//             || props?.item?.productWeight?.length !== 0;

//         if (hasVariants) {
//             // If no variant selected yet, show the overlay
//             if (activeTab === null) {
//                 setIsShowTabs(true);
//                 setIsLoading(false);
//                 return;
//             }
            
//             // Variant is selected, proceed with adding to cart
//             context?.addToCart(productItem, userId, quantity);
//             setIsAdded(true);
//             setIsShowTabs(false);
//             setActiveTab(null);
//             setSelectedTabName(null);
//             setTimeout(() => {
//                 setIsLoading(false);
//             }, 500);
//         } else {
//             // No variants, add directly
//             context?.addToCart(productItem, userId, quantity);
//             setIsAdded(true);
//             setIsShowTabs(false);
//             setTimeout(() => {
//                 setIsLoading(false);
//             }, 500);
//         }
//     }

//     useEffect(() => {
//         if (!context?.cartData || !props?.item?._id) {
//             setIsAdded(false);
//             setQuantity(1);
//             setCartItem([]);
//             return;
//         }

//         const item = context.cartData.filter((cartItem) => {
//             const productId = typeof cartItem.productId === 'object'
//                 ? cartItem.productId._id
//                 : cartItem.productId;
//             return productId === props.item._id;
//         });

//         if (item.length > 0) {
//             setCartItem(item);
//             setQuantity(item[0]?.quantity || 1);
//             setIsAdded(true);
//         } else {
//             setCartItem([]);
//             setQuantity(1);
//             setIsAdded(false);
//         }
//     }, [context?.cartData, props?.item?._id]);

//     // Close overlay when clicking outside the entire product card
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (productRef.current && !productRef.current.contains(event.target)) {
//                 setIsShowTabs(false);
//                 setActiveTab(null);
//                 setSelectedTabName(null);
//             }
//         };

//         if (isShowTabs) {
//             // Add small delay to prevent immediate triggering
//             const timer = setTimeout(() => {
//                 document.addEventListener('mousedown', handleClickOutside);
//             }, 100);
            
//             return () => {
//                 clearTimeout(timer);
//                 document.removeEventListener('mousedown', handleClickOutside);
//             };
//         }
//     }, [isShowTabs]);

//     const handleClickActiveTab = (index, name) => {
//         setActiveTab(index);
//         setSelectedTabName(name);
//         // Automatically trigger add to cart after selection
//         setTimeout(() => {
//             addToCart(props?.item, context?.userData?._id, quantity);
//         }, 100);
//     }

//     const minQty = () => {
//         if (quantity === 1) {
//             // Delete when quantity is 1
//             deleteData(`/api/cart/delete-cart-item/${cartItem[0]?._id}`).then((res) => {
//                 setIsAdded(false);
//                 setQuantity(1);
//                 context?.openAlertBox("success", res?.message);
//                 context?.getCartItems();
//                 setIsAdded(false);
//                 setActiveTab(null);
//                 setIsShowTabs(false);
//                 setSelectedTabName(null);
//             }).catch((error) => {
//                 console.error("Delete error:", error);
//                 context?.openAlertBox("error", "Failed to remove item");
//             });
//         } else {
//             // Update quantity when > 1
//             const newQty = quantity - 1;
//             setQuantity(newQty);

//             const obj = {
//                 _id: cartItem[0]?._id,
//                 qty: newQty,
//                 subTotal: props?.item?.price * newQty
//             };

//             editData(`/api/cart/update-qty`, obj).then((res) => {
//                 context?.openAlertBox("success", res?.data?.message);
//                 context?.getCartItems();
//             }).catch((error) => {
//                 console.error("Update error:", error);
//                 context?.openAlertBox("error", "Failed to update");
//             });
//         }
//     };

//     const addQty = () => {
//         const newQty = quantity + 1;
//         setQuantity(newQty);

//         const obj = {
//             _id: cartItem[0]?._id,
//             qty: newQty,
//             subTotal: props?.item?.price * newQty
//         };

//         editData(`/api/cart/update-qty`, obj).then((res) => {
//             context?.openAlertBox("success", res?.data?.message);
//             context?.getCartItems();
//         }).catch((error) => {
//             console.error("Update error:", error);
//             context?.openAlertBox("error", "Failed to update");
//         });
//     };

//     return (
//         <div ref={productRef} className="Productitem shadow-lg rounded-md overflow-hidden border-1 border-[rgba(0,0,0,0.1)]">
//             <div className="group imgWrapper w-[100%] overflow-hidden rounded-md relative">
//                 <Link to={`/product/${props?.item?._id}`}>
//                     <div className="img h-[250px] overflow-hidden">
//                         <img src={props?.item?.images[0]} className='w-full' />
//                         <img src={props?.item?.images[1]}
//                             className='opacity-0 top-0 left-0 w-full absolute group-hover:opacity-100 transition-all duration-700 group-hover:scale-105' />
//                     </div>
//                 </Link>
                
//                 {/* Variant Selection Overlay */}
//                 {isShowTabs === true && (
//                     <div 
//                         className="flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[60] p-3 gap-2"
//                     >
//                         {props?.item?.size?.length !== 0 && props?.item?.size?.map((size, index) => (
//                             <span
//                                 onClick={() => handleClickActiveTab(index, size)}
//                                 key={index} 
//                                 className={`flex items-center justify-center p-2 bg-[rgba(255,255,255,0.8)] 
//                                 max-w-[40px] h-[30px] rounded-sm cursor-pointer hover:bg-white transition-all ${activeTab === index && '!bg-[#ff5252] text-white'}`}
//                             >
//                                 {size}
//                             </span>
//                         ))}
                        
//                         {props?.item?.productRam?.length !== 0 && props?.item?.productRam?.map((item, index) => (
//                             <span
//                                 onClick={() => handleClickActiveTab(index, item)}
//                                 key={index} 
//                                 className={`flex items-center justify-center p-2 bg-[rgba(255,255,255,0.8)] 
//                                 max-w-[45px] h-[30px] rounded-sm cursor-pointer hover:bg-white transition-all ${activeTab === index && '!bg-[#ff5252] text-white'}`}
//                             >
//                                 {item}
//                             </span>
//                         ))}
                        
//                         {props?.item?.productWeight?.length !== 0 && props?.item?.productWeight?.map((item, index) => (
//                             <span
//                                 onClick={() => handleClickActiveTab(index, item)}
//                                 key={index} 
//                                 className={`flex items-center justify-center p-2 bg-[rgba(255,255,255,0.8)} 
//                                 max-w-[40px] h-[30px] rounded-sm cursor-pointer hover:bg-white transition-all ${activeTab === index && '!bg-[#ff5252] text-white'}`}
//                             >
//                                 {item}
//                             </span>
//                         ))}
//                     </div>
//                 )}

//                 <span className='discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff5252] text-white rounded-lg p-1 text-[12px] font-[500]'>
//                     {props?.item?.discount}%
//                 </span>

//                 <div className="actions absolute top-[-200px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px]
//                  transition-all duration-300 group-hover:top-[15px] opacity-0 group-hover:opacity-100">
//                     <Tooltip title="Like" placement="left-start">
//                         <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
//                     hover:!bg-[#ff5252] hover:!text-white group'>
//                             <IoIosHeartEmpty className='text-[18px] !text-black group-hover:text-white' />
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Compare" placement="left-start">
//                         <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
//                     hover:!bg-[#ff5252] hover:!text-white group'>
//                             <IoIosGitCompare className='text-[18px] !text-black group-hover:text-white' />
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Zoom" placement="left-start">
//                         <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
//                     hover:!bg-[#ff5252] hover:!text-white group' onClick={() => context.handleOpenProductDetailsModel(true, props?.item)}>
//                             <MdZoomOutMap className='text-[18px] !text-black group-hover:text-white' />
//                         </Button>
//                     </Tooltip>
//                     <Tooltip title="Share" placement="left-start">
//                         <Button className='!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white !text-black 
//                     hover:!bg-[#ff5252] hover:!text-white group'>
//                             <CiShare1 className='text-[18px] !text-black group-hover:text-white' />
//                         </Button>
//                     </Tooltip>
//                 </div>
//             </div>
            
//             <div className="info p-3 py-5 pb-[50px] px-8 h-[190px] relative">
//                 <h6 className='text-[13px] !font-[400]'>
//                     <Link to={`/product/${props?.item?._id}`} className='link transition-all'>
//                         {props?.item?.brand}
//                     </Link>
//                 </h6>
//                 <h3 className='mb-1 text-[13px] title mt-1 font-[500] text-[#000]'>
//                     <Link to={`/product/${props?.item?._id}`} className='link transition-all'>
//                         {props?.item?.name.substr(0, 30) + "..."}
//                     </Link>
//                 </h3>
//                 <Rating name="size-small" defaultValue={props?.item?.rating} size="small" readOnly />
//                 <div className="flex items-center gap-4">
//                     <span className='oldPrice line-through text-gray-500 font-[500] text-[15px]'>
//                         &#x20b9;{props?.item?.oldPrice}
//                     </span>
//                     <span className='price text-[#ff5252] text-[15px] font-[600]'>
//                         &#x20b9;{props?.item?.price}
//                     </span>
//                 </div>
                
//                 <div className="!absolute bottom-[15px] left-0 pl-3 pr-3 w-full">
//                     {isAdded === false ? (
//                         <Button
//                             onClick={() => addToCart(props?.item, context?.userData?._id, quantity)}
//                             className="btn-org btn-border flex w-full btn-sm gap-2" 
//                             size="small"
//                         >
//                             <MdOutlineShoppingCart className="text-[18px]" /> Add to Cart
//                         </Button>
//                     ) : (
//                         <>
//                             {isLoading === true ? (
//                                 <Button className="btn-org btn-border flex w-full btn-sm gap-2" size="small">
//                                     <CircularProgress />
//                                 </Button>
//                             ) : (
//                                 <div className="flex items-center justify-between overflow-hidden rounded-full border border-[rgba(0,0,0,0.1)]">
//                                     <Button 
//                                         className="!min-w-[35px] !w-[35px] !h-[30px] !bg-[#f1f1f1] !rounded-none"
//                                         onClick={minQty}
//                                     >
//                                         <FaMinus className="text-[rgba(0,0,0,0.7)]" />
//                                     </Button>
//                                     <span>{quantity}</span>
//                                     <Button 
//                                         onClick={addQty} 
//                                         className="!min-w-[35px] !w-[35px] !h-[30px] !bg-[#ff5252] !rounded-none"
//                                     >
//                                         <FaPlus className="text-white" />
//                                     </Button>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Productitem;