import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaShoppingBag } from "react-icons/fa";
import CartItems from './CartItems';
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';

const CartPage = () => {
    const context = useContext(MyContext);

    const [productSizeData, setProductSizeData] = useState([]);
    const [productRamsData, setProductRamsData] = useState([]);
    const [productWeightData, setProductWeightData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch all available sizes from database
        fetchDataFromApi('/api/product/productSize').then((res) => {
            if (res?.error === false) {
                setProductSizeData(res.data);
            }
        });

        // Fetch all available RAMs from database
        fetchDataFromApi('/api/product/productRAMS').then((res) => {
            if (res?.error === false) {
                setProductRamsData(res.data);
            }
        });

        // Fetch all available weights from database
        fetchDataFromApi('/api/product/productWeight').then((res) => {
            if (res?.error === false) {
                setProductWeightData(res.data);
            }
        });

    }, []);

    return (
        <section className="section py-4 lg:py-8 pb-10">
            <div className="container w-full lg:w-[80%] max-w-[80%] flex gap-5 flex-col lg:flex-row">

                {/* LEFT CART */}
                <div className="leftPart  w-full lg:w-[70%]">
                    <div className="shadow-md rounded-md bg-white">
                        <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h2 className='!font-bold'>Your Cart</h2>
                            <p className="mt-0">
                                There are{' '}
                                <span className="font-bold text-[#ff5252]">
                                    {context?.cartData?.length}
                                </span>{' '}
                                products in your cart
                            </p>
                        </div>

                        {context?.cartData?.length > 0 ?
                            context.cartData.map((item) => (
                                <CartItems
                                    key={item._id}
                                    item={item}
                                    qty={item.quantity}
                                    productSizeData={productSizeData}
                                    productRamsData={productRamsData}
                                    productWeightData={productWeightData}
                                />
                            )) :

                            <>
                                <div className="flex items-center justify-center flex-col pt-5 pb-10 gap-5">
                                    <img src="/shopping.png" className='w-[280px]' />
                                    <h4 className='font-[800]'>Your Cart is currently empty</h4>
                                    <Link to={'/'}>
                                        <Button className='btn-org '>
                                            Continue Shopping</Button>
                                    </Link>
                                </div>
                            </>
                        }
                    </div>
                </div>

                {/* RIGHT SUMMARY */}
                <div className="rightPart  w-full lg:w-[30%]">
                    <div className="shadow-md rounded-md bg-white p-5">
                        <h3 className="pb-3">Cart Totals</h3>
                        <hr />

                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Subtotal</span>
                            <span className="text-[#ff5252] font-bold">
                                ₹{context?.cartData
                                    ?.reduce((sum, item) => sum + item.subTotal, 0)
                                    ?.toLocaleString()}
                            </span>
                        </p>

                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Shipping</span>
                            <span className="font-bold">Free</span>
                        </p>

                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Estimate for</span>
                            <span className="text-[#ff5252] font-bold">United Kingdom</span>
                        </p>

                        <p className="flex items-center justify-between">
                            <span className="text-[14px] font-[500]">Total</span>
                            <span className="text-[#ff5252] font-bold">
                                ₹{context?.cartData
                                    ?.reduce((sum, item) => sum + item.subTotal, 0)
                                    ?.toLocaleString()}
                            </span>
                        </p>

                        <br />
                        <Link to={"/checkout"}>
                            <Button className='btn-org btn-lg w-full flex gap-2'>
                                <FaShoppingBag className='text-[20px]' />
                                Checkout
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CartPage;


// {last edit }-----
// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import { FaShoppingBag } from "react-icons/fa";
// import CartItems from './CartItems';
// import { MyContext } from '../../App';
// const CartPage = () => {
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     })
//     const context = useContext(MyContext)
//     return (
//         <section className="section !py-10 !pb-10">
//             <div className="container w-[80%] max-w-[80%] flex gap-5">
//                 <div className="leftPart w-[70%]">
//                     <div className="shadow-md rounded-md bg-white p-5">
//                         <div className="py-2 px-3  border-b border-[rgba(0,0,0,0.1)]">
//                             <h2 className='!font-bold'>Your Cart</h2>
//                             <p className="mt-0">
//                                 There are <span className="font-bold text-[#ff5252]">{context?.cartData?.length}</span> products in your cart
//                             </p>
//                         </div>
//                         {
//                             context?.cartData?.length !== 0 ?
//                             context?.cartData?.map((item, index) => {
//                                 return (
//                                     <CartItems key={index._id} qty={item?.quantity} item={item} />
//                                 )
//                             })
//                             :
//                         <>
//                             <div className="flex items-center justify-center flex-col pt-5 pb-10 gap-5">
//                                 <img src="/shopping.png" className='w-[280px]' />
//                                 <h4 className='font-[800]'>Your Cart is currently empty</h4>
//                                 <Link to={'/'}>
//                                     <Button className='btn-org btn-md'>
//                                         Continue Shopping</Button>
//                                 </Link>
//                             </div>
//                         </>
//                         }

//                     </div>
//                 </div>
//                 <div className="rightPart w-[30%]">
//                     <div className="shadow-md rounded-md bg-white p-5 sticky top-[200px] z-[90]">
//                         <h3 className="pb-3">Cart Totals</h3>
//                         <hr />
//                         <p className="flex items-center justify-between">
//                             <span className="text-[14px] font-[500]">Subtotal</span>
//                             <span className="text-[#ff5252] font-bold">{context.cartData?.length !== 0
//                                 ? context.cartData
//                                     ?.map((item) => parseInt(item.price) * item.quantity)
//                                     .reduce((total, value) => total + value, 0)
//                                     ?.toLocaleString("en-US", {
//                                         style: "currency",
//                                         currency: "INR",
//                                     })
//                                 : 0}</span>
//                         </p>
//                         <p className="flex items-center justify-between">
//                             <span className="text-[14px] font-[500]">Shipping</span>
//                             <span className="font-bold">Free</span>
//                         </p>
//                         <p className="flex items-center justify-between">
//                             <span className="text-[14px] font-[500]">Estimate for</span>
//                             <span className="text-[#ff5252] font-bold">United Kingdom</span>
//                         </p>
//                         <p className="flex items-center justify-between">
//                             <span className="text-[14px] font-[500]">Total</span>
//                             <span className="text-[#ff5252] font-bold">{context.cartData?.length !== 0
//                                 ? context.cartData
//                                     ?.map((item) => parseInt(item.price) * item.quantity)
//                                     .reduce((total, value) => total + value, 0)
//                                     ?.toLocaleString("en-US", {
//                                         style: "currency",
//                                         currency: "INR",
//                                     })
//                                 : 0}</span>
//                         </p><br />
//                         <Button className='btn-org btn-lg w-full flex gap-2'><FaShoppingBag className='text-[20px]' />Checkout</Button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default CartPage;




// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import { FaShoppingBag } from "react-icons/fa";
// import CartItems from './CartItems';
// import { MyContext } from '../../App';
// import { fetchDataFromApi } from '../../utils/api';

// const CartPage = () => {
//     const context = useContext(MyContext);

//     const [productSizeData, setProductSizeData] = useState([]);
//     const [productRamsData, setProductRamsData] = useState([]);
//     const [productWeightData, setProductWeightData] = useState([]);

//     useEffect(() => {
//         window.scrollTo(0, 0);

//         fetchDataFromApi('/api/product/productSize').then((res) => {
//             if (res?.error === false) {
//                 setProductSizeData(res.data);
//             }
//         });

//         fetchDataFromApi('/api/product/productRAMS').then((res) => {
//             if (res?.error === false) {
//                 setProductRamsData(res.data);
//             }
//         });

//         fetchDataFromApi('/api/product/productWeight').then((res) => {
//             if (res?.error === false) {
//                 setProductWeightData(res.data);
//             }
//         });

//     }, []);

//     // 🔹 Decide which selected value to show
//     const selectedVariant = (item) => {
//         if (item?.size) return item.size;
//         if (item?.weight) return item.weight;
//         if (item?.rams) return item.rams;
//         return null;
//     };

//     return (
//         <section className="section py-10 pb-10">
//             <div className="container w-[80%] max-w-[80%] flex gap-5">

//                 {/* LEFT CART */}
//                 <div className="leftPart w-[70%]">
//                     <div className="shadow-md rounded-md bg-white">
//                         <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
//                             <h2 className='!font-bold'>Your Cart</h2>
//                             <p className="mt-0">
//                                 There are{' '}
//                                 <span className="font-bold text-[#ff5252]">
//                                     {context?.cartData?.length}
//                                 </span>{' '}
//                                 products in your cart
//                             </p>
//                         </div>

//                         {context?.cartData?.length > 0 &&
//                             context.cartData.map((item) => (
//                                 <CartItems
//                                     key={item._id}
//                                     item={item}
//                                     qty={item.quantity}
//                                     selectedValue={selectedVariant(item)}
//                                     productSizeData={productSizeData}
//                                     productRamsData={productRamsData}
//                                     productWeightData={productWeightData}
//                                 />
//                             ))}
//                     </div>
//                 </div>

//                 {/* RIGHT SUMMARY */}
//                 <div className="rightPart w-[30%]">
//                     <div className="shadow-md rounded-md bg-white p-5">
//                         <h3 className="pb-3">Cart Totals</h3>
//                         <hr />

//                         <p className="flex items-center justify-between">
//                             <span className="text-[14px] font-[500]">Subtotal</span>
//                             <span className="text-[#ff5252] font-bold">
//                                 ₹{context?.cartData
//                                     ?.reduce((sum, item) => sum + item.subTotal, 0)
//                                     ?.toLocaleString()}
//                             </span>
//                         </p>

//                         <p className="flex items-center justify-between">
//                             <span className="text-[14px] font-[500]">Shipping</span>
//                             <span className="font-bold">Free</span>
//                         </p>

//                         <p className="flex items-center justify-between">
//                             <span className="text-[14px] font-[500]">Total</span>
//                             <span className="text-[#ff5252] font-bold">
//                                 ₹{context?.cartData
//                                     ?.reduce((sum, item) => sum + item.subTotal, 0)
//                                     ?.toLocaleString()}
//                             </span>
//                         </p>

//                         <br />

//                         <Button className='btn-org btn-lg w-full flex gap-2'>
//                             <FaShoppingBag className='text-[20px]' />
//                             Checkout
//                         </Button>
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default CartPage;
