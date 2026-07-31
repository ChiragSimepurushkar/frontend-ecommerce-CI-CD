import Button from '@mui/material/Button';
import React, { useContext, useEffect, useState } from 'react';
import QtyBox from '../QtyBox';
import { FaShoppingCart } from "react-icons/fa";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";
import Rating from '@mui/material/Rating';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteData, postData } from '../../utils/api';
import { TiTickOutline } from "react-icons/ti";
const ProductDetailsComponent = (props) => {
    const [productActionIndex, setProductActionIndex] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedTabName, setSelectedTabName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tabError, setTabError] = useState(false);
    const [isInMyList, setIsInMyList] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const context = useContext(MyContext)

    // useEffect(() => {
    //     if (!context?.cartData || !props?.item?._id) return;

    //     const exists = context.cartData.some((item) => {
    //         if (item.productId?._id !== props.item._id) return false;

    //         // match variants
    //         if (props?.item?.productRam?.length) {
    //             return item.rams === selectedTabName;
    //         }
    //         if (props?.item?.size?.length) {
    //             return item.size === selectedTabName;
    //         }
    //         if (props?.item?.productWeight?.length) {
    //             return item.weight === selectedTabName;
    //         }

    //         // no variants product
    //         return true;
    //     });

    //     setIsInCart(exists);
    // }, [context.cartData, props.item?._id, selectedTabName]);

    // useEffect(() => {
    //     if (!context?.cartData || !props?.item?._id) return;

    //     const cartItem = context.cartData.find(
    //         (item) => item.productId?._id === props.item._id
    //     );

    //     if (!cartItem) return;

    //     if (cartItem.rams) {
    //         setSelectedTabName(cartItem.rams);
    //     } else if (cartItem.size) {
    //         setSelectedTabName(cartItem.size);
    //     } else if (cartItem.weight) {
    //         setSelectedTabName(cartItem.weight);
    //     }
    // }, [context.cartData, props.item?._id]);

    useEffect(() => {
        if (!context?.cartData || !props?.item?._id) return;

        const exists = context.cartData.some(
            (item) => item.productId?._id === props.item._id
        );

        setIsInCart(exists);
    }, [context?.cartData, props?.item?._id]);




    const handleSelectQty = (qty) => {
        setQuantity(qty);
    };

    const addToCart = (product, userId, quantity) => {
        if (userId === undefined) {
            openAlertBox("error", "you are not login, Please login first");
            return false;
        }

        const productItem = {
            _id: product?._id,
            productTitle: product?.name,
            image: product?.images?.[0],
            rating: product?.rating,
            price: product?.price,
            quantity: quantity,
            subTotal: parseInt(product?.price * quantity),
            productId: product?._id,
            countInStock: product?.countInStock,
            brand: product?.brand,
            oldPrice: product?.oldPrice,
            discount: product?.discount,
            size: props?.item?.size?.length !== 0 ? selectedTabName : null,
            weight: props?.item?.productWeight?.length !== 0 ? selectedTabName : null,
            rams: props?.item?.productRam?.length !== 0 ? selectedTabName : null,
        }
        if (props?.item?.size?.length !== 0 || props?.item?.productWeight?.length !== 0
            || props?.item?.productRam?.length !== 0
        ) {

            if (selectedTabName !== null) {
                setIsLoading(true)
                postData("/api/cart/add", productItem).then((res) => {
                    if (res?.error === false) {
                        context?.openAlertBox("success", res?.message);
                        context?.getCartItems();
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500);
                    } else {
                        context?.openAlertBox("error", res?.message)
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 500);

                    }
                })
            } else {
                setTabError(true);
            }
        } else {
            setIsLoading(true)
            postData("/api/cart/add", productItem).then((res) => {
                if (res?.error === false) {
                    context?.openAlertBox("success", res?.message);
                    context?.getCartItems();
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                } else {
                    context?.openAlertBox("error", res?.message)
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);

                }
            })
        }

    }

    useEffect(() => {
        if (!context?.myListData || !props?.item?._id) return;

        const exists = context.myListData.some(
            (item) => item.productId === props.item._id
        );

        setIsInMyList(exists);
    }, [context?.myListData, props?.item?._id]);


    const handleWishlist = () => {
        if (!context?.userData) {
            context.openAlertBox("error", "Please login first");
            return;
        }

        if (isInMyList) {
            const listItem = context.myListData.find(
                (item) => item.productId === props.item._id
            );

            deleteData(`/api/myList/${listItem._id}`).then((res) => {
                context.openAlertBox("success", res?.message);
                context.getMyListData();
            });
        } else {
            postData("/api/myList/add", {
                productId: props.item._id,
                productTitle: props.item.name,
                image: props.item.images[0],
                rating: props.item.rating,
                price: props.item.price,
                oldPrice: props.item.oldPrice,
                brand: props.item.brand,
                discount: props.item.discount
            }).then((res) => {
                context.openAlertBox("success", res?.message);
                context.getMyListData();

            });
        }
    };

    const handleCartToggle = () => {
        if (!context?.userData) {
            context.openAlertBox("error", "Please login first");
            return;
        }

        if (isInCart) {
            // REMOVE
            const cartItem = context.cartData.find(
                (item) => item.productId?._id === props.item._id
            );
            console.log(cartItem)
            deleteData(`/api/cart/delete-cart-item/${cartItem?._id}`).then((res) => {
                context.openAlertBox("success", res?.message);
                context.getCartItems();
            });
        } else {
            // ADD
            addToCart(props.item, context.userData._id, quantity);
        }
    };



    const handleClickActiveTab = (index, name) => {
        console.log(name)
        setProductActionIndex(index)
        setSelectedTabName(name)
    }

    return (
        <>
            <h1 className='text-[18px] sm:text-[24px] font-[600] !mb-2'>{props?.item?.name}</h1>
            <div className="flex items-start sm:items-center flex-col sm:flex-row md:flex-row lg:flex-row gap-3">
                <span className='text-gray-400 text-[13px]'>Brands :
                    <span className='font-[500] opacity-75 text-black'>{props?.item?.brand}
                    </span></span>
                <Rating name="size-small" defaultValue={2} size="small" readOnly />
                <span className='text-[13px] cursor-pointer '
                    onClick={props?.goToReviews}>Review ({props?.reviewCount})</span>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row 
            !items-start sm:!items-center gap-4 !mt-4">
                <div className="flex items-center gap-4">
                    <span className='oldPrice line-through text-gray-500 font-[500] text-[20px]'>&#x20b9;{props?.item?.oldPrice}</span>
                    <span className='price text-[#ff5252] text-[20px] font-[600]'>&#x20b9;{props?.item?.price}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className='text-[14px]'>Available In Stock:
                        <span className='font-bold text-[14px] text-green-600'>{props?.item?.countInStock}
                            Items</span>
                    </span>
                </div>
            </div>
            <p className='!mt-3 pr-10 !mb-5'>
                {props?.item?.description}
            </p>
            {
                props?.item?.productRam?.length !== 0 &&
                <div className="flex gap-3 items-center">
                    <span className='text-[16px]'>RAM: </span>
                    <div className="flex items-center gap-1 actions">
                        {
                            props?.item?.productRam?.map((item, index) => {
                                return (
                                    <Button key={index} className=
                                        {`${productActionIndex === index ? '!bg-[#ff5252] !text-white' : ''}
                                ${tabError === true && 'error'}`} onClick={() => handleClickActiveTab(index, item)}
                                    >{item}</Button>
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                props?.item?.size?.length !== 0 &&
                <div className="flex gap-3 items-center">
                    <span className='text-[16px]'>SIZE: </span>
                    <div className="flex items-center gap-1 actions">
                        {
                            props?.item?.size?.map((item, index) => {
                                return (
                                    <Button className=
                                        {`${productActionIndex === index ? '!bg-[#ff5252] !text-white' : ''}
                            ${tabError === true && 'error'}  `} onClick={() => handleClickActiveTab(index, item)}>{item}</Button>
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                props?.item?.productWeight?.length !== 0 &&
                <div className="flex gap-3 items-center">
                    <span className='text-[16px]'>WEIGHT: </span>
                    <div className="flex items-center gap-1 actions">
                        {
                            props?.item?.productWeight?.map((item, index) => {
                                return (
                                    <Button className=
                                        {`${productActionIndex === index ? '!bg-[#ff5252] !text-white' : ''}
                          ${tabError === true && 'error'}  `} onClick={() => handleClickActiveTab(index, item)}
                                    >{item}</Button>
                                )
                            })
                        }
                    </div>
                </div>
            }
            <p className='text-[14px]  !mt-5 !mb-2 text-[#000]'>Free Shipping (Est. Delivery Time 2-3 Days)</p>
            <div className='flex items-center gap-4 py-4'>
                <div className="qtyBoxWrapper w-[70px]">
                    <QtyBox handleSelectQty={handleSelectQty} />
                </div>
                <Button
                    onClick={handleCartToggle}
                    className='btn-org flex gap-2 !min-w-[150px]'
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : isInCart ? (
                        <>
                            <TiTickOutline />ADDED
                        </>
                    ) : (
                        <>
                            <FaShoppingCart className='text-[22px]' />
                            Add to Cart
                        </>
                    )}

                </Button>
            </div>
            <div className="flex items-center gap-4 !mt-4">
                <span
                    onClick={handleWishlist}
                    className='flex items-center gap-2 text-[14px] sm:text-[15px] link cursor-pointer font-[500]'
                >
                    {isInMyList ? (
                        <IoMdHeart className='text-[18px] text-[#ff5252]' />
                    ) : (
                        <IoMdHeartEmpty className='text-[18px]' />
                    )}
                    {isInMyList ? "Remove from Wishlist" : "Add to Wishlist"}
                </span>

                <span className='flex items-center gap-2 text-[14px] sm:text-[15px] link cursor-pointer font-[500]'>
                    <IoIosGitCompare className='text-[18px]' />Add to Compare</span>
            </div>
        </>
    );
}

export default ProductDetailsComponent;