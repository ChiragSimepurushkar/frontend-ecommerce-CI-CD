
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { GoTriangleDown } from "react-icons/go";
import Rating from '@mui/material/Rating';
import { IoCloseCircleOutline } from "react-icons/io5";
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import { MyContext } from '../../App';

const CartItems = (props) => {
    const context = useContext(MyContext);

    const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
    const openSize = Boolean(sizeAnchorEl);
    const [selectedSize, setSelectedSize] = useState(props?.item?.size);

    const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
    const openQty = Boolean(qtyAnchorEl);
    const [selectedQty, setSelectedQty] = useState(props.qty);

    const [weightAnchorEl, setWeightAnchorEl] = useState(null);
    const openWeight = Boolean(weightAnchorEl);
    const [selectedWeight, setSelectedWeight] = useState(props?.item?.weight);

    const [ramAnchorEl, setRamAnchorEl] = useState(null);
    const openRam = Boolean(ramAnchorEl);
    const [selectedRam, setSelectedRam] = useState(props?.item?.rams);

    // Generic update function with validation
    const updateCartItem = async (updateType, value) => {
        // For variants (size/weight/ram), validate if the value exists in THIS specific product
        if (updateType === 'size' || updateType === 'weight' || updateType === 'ram') {
            try {
                // Fetch the product to validate if this variant exists for THIS product
                const res = await fetchDataFromApi(`/api/product/${props?.item?.productId?._id || props?.item?.productId}`);
                const product = res?.product;

                if (!product) {
                    context?.openAlertBox("error", "Product not found");
                    return;
                }

                let isValid = false;

                // Check if the selected value exists in THIS product's options
                if (updateType === 'size') {
                    isValid = product?.size?.includes(value);
                    if (!isValid) {
                        context?.openAlertBox("error", `Size "${value}" is not available for this product`);
                        return;
                    }
                } else if (updateType === 'weight') {
                    isValid = product?.productWeight?.includes(value);
                    if (!isValid) {
                        context?.openAlertBox("error", `Weight "${value}" is not available for this product`);
                        return;
                    }
                } else if (updateType === 'ram') {
                    isValid = product?.productRam?.includes(value);
                    if (!isValid) {
                        context?.openAlertBox("error", `RAM "${value}" is not available for this product`);
                        return;
                    }
                }
            } catch (error) {
                console.error("Validation error:", error);
                context?.openAlertBox("error", "Failed to validate product option");
                return;
            }
        }

        // If validation passed or it's a quantity update, proceed with the cart update
        const cartObj = {
            _id: props?.item?._id,
            qty: updateType === 'quantity' ? value : props?.item?.quantity,
            subTotal: props?.item?.price * (updateType === 'quantity' ? value : props?.item?.quantity),
        };

        // Only include the field that's being updated
        if (updateType === 'size') {
            cartObj.size = value;
        } else if (updateType === 'weight') {
            cartObj.weight = value;
        } else if (updateType === 'ram') {
            cartObj.rams = value;
        }

        console.log('Updating cart with:', cartObj);

        editData("/api/cart/update-qty", cartObj).then((res) => {
            if (res?.data?.error === false) {
                context?.openAlertBox("success", res?.data?.message);
                context?.getCartItems();
            } else {
                context?.openAlertBox("error", res?.data?.message || "Failed to update cart");
            }
        }).catch((error) => {
            console.error("Update error:", error);
            context?.openAlertBox("error", "Failed to update cart");
        });
    };

    // Size handlers
    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if (value) {
            setSelectedSize(value);
            updateCartItem('size', value);
        }
    };

    // Weight handlers
    const handleClickWeight = (event) => {
        setWeightAnchorEl(event.currentTarget);
    };
    const handleCloseWeight = (value) => {
        setWeightAnchorEl(null);
        if (value) {
            setSelectedWeight(value);
            updateCartItem('weight', value);
        }
    };

    // RAM handlers
    const handleClickRam = (event) => {
        setRamAnchorEl(event.currentTarget);
    };
    const handleCloseRam = (value) => {
        setRamAnchorEl(null);
        if (value) {
            setSelectedRam(value);
            updateCartItem('ram', value);
        }
    };

    // Qty handlers
    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if (value) {
            setSelectedQty(value);
            updateCartItem('quantity', value);
        }
    };

    const removeItem = (id) => {
        deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
            context?.openAlertBox("success", res?.message);
            context?.getCartItems();
        });
    }

    return (
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
            <div className="img w-[30%] sm:w-[20%] lg:w-[15%] rounded-md overflow-hidden">
                <Link to={`/product/${props?.item?.productId?._id || props?.item?.productId}`} className='group'>
                    <img src={props?.item?.image}
                        className='w-full group-hover:scale-105 transition-all'
                        alt={props?.item?.productTitle} />
                </Link>
            </div>
            <div className="info w-[70%] sm:w-[80%] lg:w-[85%] relative">
                <IoCloseCircleOutline
                    onClick={() => removeItem(props?.item?._id)}
                    className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' />
                <span className="text-[13px]">{props?.item?.brand}</span>
                <h3 className="text-[13px] sm:text-[15px] pb-2">
                    <Link to={`/product/${props?.item?.productId?._id || props?.item?.productId}`} 
                    className="link">
                        {props?.item?.productTitle?.substr(0, context?.windowWidth < 992 ? 30 : 120) + '...'}
                    </Link>
                </h3>
                <Rating name="size-small" value={props?.item?.rating} size="small" readOnly />

                <div className="flex items-center gap-4 !mt-2">
                    {/* SIZE DROPDOWN - Shows ALL sizes from database */}
                    {(props?.item?.size !== "" && props?.item?.size !== null &&
                        props?.productSizeData?.length > 0) && (
                            <div className='relative'>
                                <span onClick={handleClickSize}
                                    className="flex cursor-pointer rounded-md py-1 px-2 font-[600] text-[11px] bg-[#f1f1f1] items-center justify-center">
                                    Size: {selectedSize} <GoTriangleDown />
                                </span>
                                <Menu
                                    id="size-menu"
                                    anchorEl={sizeAnchorEl}
                                    open={openSize}
                                    onClose={() => handleCloseSize(null)}
                                >
                                    {props?.productSizeData?.map((sizeObj, index) => (
                                        <MenuItem
                                            key={index}
                                            className={`${sizeObj.name === selectedSize && 'selected'}`}
                                            onClick={() => handleCloseSize(sizeObj.name)}
                                        >
                                            {sizeObj.name}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        )}

                    {/* WEIGHT DROPDOWN - Shows ALL weights from database */}
                    {(props?.item?.weight !== "" && props?.item?.weight !== null &&
                        props?.productWeightData?.length > 0) && (
                            <div className='relative'>
                                <span onClick={handleClickWeight}
                                    className="flex cursor-pointer rounded-md py-1 px-2 font-[600] text-[11px] bg-[#f1f1f1] items-center justify-center">
                                    Weight: {selectedWeight} <GoTriangleDown />
                                </span>
                                <Menu
                                    id="weight-menu"
                                    anchorEl={weightAnchorEl}
                                    open={openWeight}
                                    onClose={() => handleCloseWeight(null)}
                                >
                                    {props?.productWeightData?.map((weightObj, index) => (
                                        <MenuItem
                                            key={index}
                                            className={`${weightObj.name === selectedWeight && 'selected'}`}
                                            onClick={() => handleCloseWeight(weightObj.name)}
                                        >
                                            {weightObj.name}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        )}

                    {/* RAM DROPDOWN - Shows ALL RAMs from database */}
                    {(props?.item?.rams !== "" && props?.item?.rams !== null &&
                        props?.productRamsData?.length > 0) && (
                            <div className='relative'>
                                <span onClick={handleClickRam}
                                    className="flex cursor-pointer rounded-md py-1 px-2 font-[600] text-[11px] bg-[#f1f1f1] items-center justify-center">
                                    RAM: {selectedRam} <GoTriangleDown />
                                </span>
                                <Menu
                                    id="ram-menu"
                                    anchorEl={ramAnchorEl}
                                    open={openRam}
                                    onClose={() => handleCloseRam(null)}
                                >
                                    {props?.productRamsData?.map((ramObj, index) => (
                                        <MenuItem
                                            key={index}
                                            className={`${ramObj.name === selectedRam && 'selected'}`}
                                            onClick={() => handleCloseRam(ramObj.name)}
                                        >
                                            {ramObj.name}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        )}

                    {/* QUANTITY DROPDOWN */}
                    <div className='relative'>
                        <span className="flex cursor-pointer rounded-md py-1 px-2 font-[600] text-[11px]
                         bg-[#f1f1f1] items-center justify-center" onClick={handleClickQty}>
                            Qty: {selectedQty} <GoTriangleDown />
                        </span>
                        <Menu
                            id="qty-menu"
                            anchorEl={qtyAnchorEl}
                            open={openQty}
                            onClose={() => handleCloseQty(null)}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                                <MenuItem
                                    className={`${num === selectedQty && 'selected'}`}
                                    key={num}
                                    onClick={() => handleCloseQty(num)}
                                >
                                    {num}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </div>

                <div className="flex items-center gap-4 !mt-2">
                    <span className='price text-[14px] font-[600]'>₹{props?.item?.price}</span>
                    <span className='oldPrice line-through text-gray-500 font-[500] text-[14px]'>₹{props?.item?.oldPrice}</span>
                    <span className='price text-[#ff5252] text-[14px] font-[600]'>{props?.item?.discount}% OFF</span>
                </div>
            </div>
        </div>
    );
}

export default CartItems;



// ------------last edited -------------------
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { GoTriangleDown } from "react-icons/go";
// import Rating from '@mui/material/Rating';
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { deleteData, editData } from '../../utils/api';
// import { useContext } from 'react';
// import { MyContext } from '../../App';

// const CartItems = (props) => {
//     const context = useContext(MyContext);

//     const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
//     const openSize = Boolean(sizeAnchorEl);
//     const [selectedSize, setSelectedSize] = useState(props?.item?.size);

//     const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
//     const openQty = Boolean(qtyAnchorEl);
//     const [selectedQty, setSelectedQty] = useState(props.qty);

//     const [weightAnchorEl, setWeightAnchorEl] = useState(null);
//     const openWeight = Boolean(weightAnchorEl);
//     const [selectedWeight, setSelectedWeight] = useState(props?.item?.weight);

//     const [ramAnchorEl, setRamAnchorEl] = useState(null);
//     const openRam = Boolean(ramAnchorEl);
//     const [selectedRam, setSelectedRam] = useState(props?.item?.rams);

//     // Get product options from the populated productId
//     const productSizeData = props?.item?.productId?.size || [];
//     const productWeightData = props?.item?.productId?.productWeight || [];
//     const productRamData = props?.item?.productId?.productRam || [];

//     // Generic update function
//     const updateCartItem = (updateType, value) => {
//         const cartObj = {
//             _id: props?.item?._id,
//             qty: updateType === 'quantity' ? value : props?.item?.quantity,
//             subTotal: props?.item?.price * (updateType === 'quantity' ? value : props?.item?.quantity),
//         };

//         // Only include the field that's being updated
//         if (updateType === 'size') {
//             cartObj.size = value;
//         } else if (updateType === 'weight') {
//             cartObj.weight = value;
//         } else if (updateType === 'ram') {
//             cartObj.rams = value;
//         }

//         console.log('Updating cart with:', cartObj);

//         editData("/api/cart/update-qty", cartObj).then((res) => {
//             if (res?.data?.error === false) {
//                 context?.openAlertBox("success", res?.data?.message);
//                 context?.getCartItems();
//             } else {
//                 context?.openAlertBox("error", res?.data?.message || "Failed to update cart");
//             }
//         }).catch((error) => {
//             console.error("Update error:", error);
//             context?.openAlertBox("error", "Failed to update cart");
//         });
//     };

//     // Size handlers
//     const handleClickSize = (event) => {
//         setSizeAnchorEl(event.currentTarget);
//     };
//     const handleCloseSize = (value) => {
//         setSizeAnchorEl(null);
//         if (value) {
//             setSelectedSize(value);
//             updateCartItem('size', value);
//         }
//     };

//     // Weight handlers
//     const handleClickWeight = (event) => {
//         setWeightAnchorEl(event.currentTarget);
//     };
//     const handleCloseWeight = (value) => {
//         setWeightAnchorEl(null);
//         if (value) {
//             setSelectedWeight(value);
//             updateCartItem('weight', value);
//         }
//     };

//     // RAM handlers
//     const handleClickRam = (event) => {
//         setRamAnchorEl(event.currentTarget);
//     };
//     const handleCloseRam = (value) => {
//         setRamAnchorEl(null);
//         if (value) {
//             setSelectedRam(value);
//             updateCartItem('ram', value);
//         }
//     };

//     // Qty handlers
//     const handleClickQty = (event) => {
//         setQtyAnchorEl(event.currentTarget);
//     };
//     const handleCloseQty = (value) => {
//         setQtyAnchorEl(null);
//         if (value) {
//             setSelectedQty(value);
//             updateCartItem('quantity', value);
//         }
//     };

//     const removeItem = (id) => {
//         deleteData(`/api/cart/delete-cart-item/${id}`).then((res) => {
//             context?.openAlertBox("success", res?.message);
//             context?.getCartItems();
//         });
//     }
    

//     return (
//         <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
//             <div className="img w-[15%] rounded-md overflow-hidden">
//                 <Link to={`/product/${props?.item?.productId?._id || props?.item?.productId}`} className='group'>
//                     <img src={props?.item?.image}
//                         className='w-full group-hover:scale-105 transition-all'
//                         alt={props?.item?.productTitle} />
//                 </Link>
//             </div>
//             <div className="info w-[85%] relative">
//                 <IoCloseCircleOutline
//                     onClick={() => removeItem(props?.item?._id)}
//                     className='cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all' />
//                 <span className="text-[13px]">{props?.item?.brand}</span>
//                 <h3 className="text-[15px] pb-2">
//                     <Link to={`/product/${props?.item?.productId?._id || props?.item?.productId}`} className="link">
//                         {props?.item?.productTitle}
//                     </Link>
//                 </h3>
//                 <Rating name="size-small" value={props?.item?.rating} size="small" readOnly />

//                 <div className="flex items-center gap-4 !mt-2">
//                     {/* SIZE DROPDOWN */}
//                     {(props?.item?.size !== "" && props?.item?.size !== null &&
//                         productSizeData?.length > 0) && (
//                             <div className='relative'>
//                                 <span onClick={handleClickSize}
//                                     className="flex cursor-pointer rounded-md py-1 px-2 font-[600] text-[11px] bg-[#f1f1f1] items-center justify-center">
//                                     Size: {selectedSize} <GoTriangleDown />
//                                 </span>
//                                 <Menu
//                                     id="size-menu"
//                                     anchorEl={sizeAnchorEl}
//                                     open={openSize}
//                                     onClose={() => handleCloseSize(null)}
//                                 >
//                                     {productSizeData?.map((size, index) => (
//                                         <MenuItem
//                                             key={index}
//                                             className={`${size === selectedSize && 'selected'}`}
//                                             onClick={() => handleCloseSize(size)}
//                                         >
//                                             {size}
//                                         </MenuItem>
//                                     ))}
//                                 </Menu>
//                             </div>
//                         )}

//                     {/* WEIGHT DROPDOWN */}
//                     {(props?.item?.weight !== "" && props?.item?.weight !== null &&
//                         productWeightData?.length > 0) && (
//                             <div className='relative'>
//                                 <span onClick={handleClickWeight}
//                                     className="flex cursor-pointer rounded-md py-1 px-2 font-[600] text-[11px] bg-[#f1f1f1] items-center justify-center">
//                                     Weight: {selectedWeight} <GoTriangleDown />
//                                 </span>
//                                 <Menu
//                                     id="weight-menu"
//                                     anchorEl={weightAnchorEl}
//                                     open={openWeight}
//                                     onClose={() => handleCloseWeight(null)}
//                                 >
//                                     {productWeightData?.map((weight, index) => (
//                                         <MenuItem
//                                             key={index}
//                                             className={`${weight === selectedWeight && 'selected'}`}
//                                             onClick={() => handleCloseWeight(weight)}
//                                         >
//                                             {weight}
//                                         </MenuItem>
//                                     ))}
//                                 </Menu>
//                             </div>
//                         )}

//                     {/* RAM DROPDOWN */}
//                     {(props?.item?.rams !== "" && props?.item?.rams !== null &&
//                         productRamData?.length > 0) && (
//                             <div className='relative'>
//                                 <span onClick={handleClickRam}
//                                     className="flex cursor-pointer rounded-md py-1 px-2 font-[600] text-[11px] bg-[#f1f1f1] items-center justify-center">
//                                     RAM: {selectedRam} <GoTriangleDown />
//                                 </span>
//                                 <Menu
//                                     id="ram-menu"
//                                     anchorEl={ramAnchorEl}
//                                     open={openRam}
//                                     onClose={() => handleCloseRam(null)}
//                                 >
//                                     {productRamData?.map((ram, index) => (
//                                         <MenuItem
//                                             key={index}
//                                             className={`${ram === selectedRam && 'selected'}`}
//                                             onClick={() => handleCloseRam(ram)}
//                                         >
//                                             {ram}
//                                         </MenuItem>
//                                     ))}
//                                 </Menu>
//                             </div>
//                         )}

//                     {/* QUANTITY DROPDOWN */}
//                     <div className='relative'>
//                         <span className="flex cursor-pointer rounded-md py-1 px-2 font-[600] text-[11px]
//                          bg-[#f1f1f1] items-center justify-center" onClick={handleClickQty}>
//                             Qty: {selectedQty} <GoTriangleDown />
//                         </span>
//                         <Menu
//                             id="qty-menu"
//                             anchorEl={qtyAnchorEl}
//                             open={openQty}
//                             onClose={() => handleCloseQty(null)}
//                         >
//                             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
//                                 <MenuItem
//                                     className={`${num === selectedQty && 'selected'}`}
//                                     key={num}
//                                     onClick={() => handleCloseQty(num)}
//                                 >
//                                     {num}
//                                 </MenuItem>
//                             ))}
//                         </Menu>
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-4 !mt-2">
//                     <span className='price text-[14px] font-[600]'>₹{props?.item?.price}</span>
//                     <span className='oldPrice line-through text-gray-500 font-[500] text-[14px]'>₹{props?.item?.oldPrice}</span>
//                     <span className='price text-[#ff5252] text-[14px] font-[600]'>{props?.item?.discount}% OFF</span>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CartItems;


 // =============================================
// if (field === "size") {
//   fetchDataFromApi(`/api/product/${props?.item?.productId}`).then((res) => {
//     const product = res?.product;

//     const item = product?.size?.filter((size) =>
//       size?.includes(selectedVal)
//     );

//     if (item?.length !== 0) {
//       // Logic for item exists
//     }

//     console.log(item);
//   });
// }
// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Rating from '@mui/material/Rating';
// import { GoTriangleDown } from "react-icons/go";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { deleteData, editData } from '../../utils/api';
// import { MyContext } from '../../App';

// const CartItems = ({
//     item,
//     qty,
//     selectedValue,
//     productSizeData = [],
//     productRamsData = [],
//     productWeightData = [],
// }) => {
//     const context = useContext(MyContext);

//     /* ---------------- STATE ---------------- */
//     const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
//     const [ramAnchorEl, setRamAnchorEl] = useState(null);
//     const [weightAnchorEl, setWeightAnchorEl] = useState(null);
//     const [qtyAnchorEl, setQtyAnchorEl] = useState(null);

//     const [selectedQty, setSelectedQty] = useState(qty);
//     const [selectedSize, setSelectedSize] = useState(item?.size);
//     const [selectedRam, setSelectedRam] = useState(item?.rams);
//     const [selectedWeight, setSelectedWeight] = useState(item?.weight);

//     /* ---------------- API UPDATE ---------------- */
//     const updateCart = async (payload) => {
//         const res = await editData('/api/cart/update-qty', payload);

//         if (res?.data?.error === false) {
//             context.openAlertBox('success', res.data.message);
//             context.getCartItems();
//         } else {
//             context.openAlertBox('error', res?.data?.message || 'Update failed');
//         }
//     };

//     /* ---------------- HANDLERS ---------------- */
//     const updateQty = (value) => {
//         setSelectedQty(value);
//         updateCart({
//             _id: item._id,
//             qty: value,
//             subTotal: item.price * value,
//         });
//         setQtyAnchorEl(null);
//     };

//     const updateSize = (value) => {
//         setSelectedSize(value);
//         updateCart({ _id: item._id, size: value });
//         setSizeAnchorEl(null);
//     };

//     const updateRam = (value) => {
//         setSelectedRam(value);
//         updateCart({ _id: item._id, rams: value });
//         setRamAnchorEl(null);
//     };

//     const updateWeight = (value) => {
//         setSelectedWeight(value);
//         updateCart({ _id: item._id, weight: value });
//         setWeightAnchorEl(null);
//     };

//     const removeItem = async () => {
//         const res = await deleteData(`/api/cart/delete-cart-item/${item._id}`);
//         context.openAlertBox('success', res?.message);
//         context.getCartItems();
//     };

//     /* ---------------- UI ---------------- */
//     return (
//         <div className="cartItem w-full p-3 flex items-center gap-4 border-b">

//             <div className="img w-[15%] rounded-md overflow-hidden">
//                 <Link to={`/product/${item?.productId}`}>
//                     <img src={item?.image} className="w-full" />
//                 </Link>
//             </div>

//             <div className="info w-[85%] relative">
//                 <IoCloseCircleOutline
//                     onClick={removeItem}
//                     className="absolute top-0 right-0 text-[22px] cursor-pointer"
//                 />

//                 <span className="text-[13px]">{item?.brand}</span>

//                 <h3 className="text-[15px] pb-1">
//                     <Link className="link">{item?.productTitle}</Link>
//                 </h3>

//                 <Rating value={item?.rating} size="small" readOnly />

//                 {/* -------- OPTIONS -------- */}
//                 <div className="flex items-center gap-3 mt-2">

//                     {/* SIZE */}
//                     {productSizeData.length > 0 && selectedSize && (
//                         <>
//                             <span
//                                 onClick={(e) => setSizeAnchorEl(e.currentTarget)}
//                                 className="option-pill"
//                             >
//                                 Size: {selectedSize} <GoTriangleDown />
//                             </span>
//                             <Menu
//                                 anchorEl={sizeAnchorEl}
//                                 open={Boolean(sizeAnchorEl)}
//                                 onClose={() => setSizeAnchorEl(null)}
//                             >
//                                 {productSizeData.map((size) => (
//                                     <MenuItem
//                                         key={size._id}
//                                         onClick={() => updateSize(size.name)}
//                                     >
//                                         {size.name}
//                                     </MenuItem>
//                                 ))}

//                             </Menu>
//                         </>
//                     )}

//                     {/* RAM */}
//                     {productRamsData.length > 0 && selectedRam && (
//                         <>
//                             <span
//                                 onClick={(e) => setRamAnchorEl(e.currentTarget)}
//                                 className="option-pill"
//                             >
//                                 RAM: {selectedRam} <GoTriangleDown />
//                             </span>
//                             <Menu
//                                 anchorEl={ramAnchorEl}
//                                 open={Boolean(ramAnchorEl)}
//                                 onClose={() => setRamAnchorEl(null)}
//                             >
//                                 {productRamsData.map((ram) => (
//                                     <MenuItem
//                                         key={ram._id}
//                                         onClick={() => updateRam(ram.ram)}
//                                     >
//                                         {ram.ram}
//                                     </MenuItem>
//                                 ))}

//                             </Menu>
//                         </>
//                     )}

//                     {/* WEIGHT */}
//                     {productWeightData.length > 0 && selectedWeight && (
//                         <>
//                             <span
//                                 onClick={(e) => setWeightAnchorEl(e.currentTarget)}
//                                 className="option-pill"
//                             >
//                                 Weight: {selectedWeight} <GoTriangleDown />
//                             </span>
//                             <Menu
//                                 anchorEl={weightAnchorEl}
//                                 open={Boolean(weightAnchorEl)}
//                                 onClose={() => setWeightAnchorEl(null)}
//                             >
//                                 {productWeightData.map((weight) => (
//                                     <MenuItem
//                                         key={weight._id}
//                                         onClick={() => updateWeight(weight.weight)}
//                                     >
//                                         {weight.weight}
//                                     </MenuItem>
//                                 ))}

//                             </Menu>
//                         </>
//                     )}

//                     {/* QTY */}
//                     <span
//                         onClick={(e) => setQtyAnchorEl(e.currentTarget)}
//                         className="option-pill"
//                     >
//                         Qty: {selectedQty} <GoTriangleDown />
//                     </span>
//                     <Menu
//                         anchorEl={qtyAnchorEl}
//                         open={Boolean(qtyAnchorEl)}
//                         onClose={() => setQtyAnchorEl(null)}
//                     >
//                         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
//                             <MenuItem key={n} onClick={() => updateQty(n)}>
//                                 {n}
//                             </MenuItem>
//                         ))}
//                     </Menu>
//                 </div>

//                 {/* -------- PRICE -------- */}
//                 <div className="flex gap-4 mt-2">
//                     <span className="font-semibold">₹{item.price}</span>
//                     {item.oldPrice && (
//                         <span className="line-through text-gray-500">₹{item.oldPrice}</span>
//                     )}
//                     {item.discount && (
//                         <span className="text-[#ff5252]">{item.discount}% OFF</span>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartItems;
