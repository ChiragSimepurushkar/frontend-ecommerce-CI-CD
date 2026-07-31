// import React, { useContext, useEffect, useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { LuBaggageClaim } from "react-icons/lu";
// import { MyContext } from '../../App.jsx'
// import { FaPlus } from 'react-icons/fa6';
// import Radio from '@mui/material/Radio';
// import { deleteData, fetchDataFromApi, postData } from '../../utils/api.js';
// import { BsFillBagCheckFill } from 'react-icons/bs';
// import axios from 'axios';

// const VITE_APP_RAZORPAY_KEY_ID = import.meta.env.VITE_APP_RAZORPAY_KEY_ID;
// const VITE_APP_RAZORPAY_KEY_SECRET = import.meta.env.VITE_APP_RAZORPAY_KEY_SECRET;
// const VITE_APP_PAYPAL_CLIENT_ID = import.meta.env.VITE_APP_PAYPAL_CLIENT_ID;
// const VITE_API_URL = import.meta.env.VITE_API_URL;

// const CheckOut = () => {
//     const [userData, setUserData] = useState(null);
//     const context = useContext(MyContext);
//     const [isChecked, setIsChecked] = useState(0);
//     const [selectedAddress, setSelectedAddress] = useState("");
//     const [totalAmount, setTotalAmount] = useState()

//     useEffect(()=>{
//     window.scrollTo(0,0);
//   })

//     useEffect(() => {
//         setTotalAmount(
//             context.cartData?.length !== 0 ?
//                 context.cartData?.map(item => parseInt(item.price) * item.quantity)
//                     .reduce((total, value) => total + value, 0) : 0
//                         ?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
//         );

//         localStorage.setItem("totalAmount", context.cartData?.length !== 0 ?
//             context.cartData?.map(item => parseInt(item.price) * item.quantity)
//                 .reduce((total, value) => total + value, 0) : 0
//                     ?.toLocaleString('en-US', { style: 'currency', currency: 'INR' }))

//     }, [context.cartData])

//     useEffect(() => {
//         context?.getUserDetails();
//     }, []);

//     useEffect(() => {
//           if (window.paypal) return; 
//         // Load the PayPal JavaScript SDK
//         const script = document.createElement("script");
//         script.src = `https://www.paypal.com/sdk/js?client-id=${VITE_APP_PAYPAL_CLIENT_ID}&disable-funding=card`;
//         script.async = true;

//         script.onload = () => {
//             window.paypal.Buttons({
//                 createOrder: async () => {
//                     // Fetch current exchange rate for INR to USD conversion
//                     const resp = await fetch(
//                         "https://v6.exchangerate-api.com/v6/8f85eea95dae9336b9ea3ce9/latest/INR"
//                     );

//                     const respData = await resp.json();
//                     var convertedAmount = 0;

//                     if (respData.result === "success") {
//                         const usdToInrRate = respData.conversion_rates.USD;
//                         convertedAmount = (totalAmount * usdToInrRate).toFixed(2);
//                     }

//                     const headers = {
//                         'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
//                         'Content-Type': 'application/json',
//                     };

//                     const data = {
//                         userId: context?.userData?._id,
//                         totalAmount: convertedAmount
//                     };

//                     // Create order on the server
//                     const response = await axios.get(
//                         VITE_API_URL + `/api/order/create-order-paypal?userId=${data?.userId}&totalAmount=${data?.totalAmount}`,
//                         { headers }
//                     );

//                     return response?.data?.id; // Return order ID to PayPal
//                 },
//                 onApprove: async (data) => {
//                     onApprovePayment(data);
//                 },
//                 onError: (err) => {
//                     console.error("PayPal Checkout onError:", err);
//                 }
//             }).render("#paypal-button-container");
//         };

//         document.body.appendChild(script);
//     }, [context?.cartData, context?.userData, selectedAddress]);

//     // useEffect(() => {
//     //     setUserData(context?.userData)
//     //     context?.getUserDetails()
//     //     setSelectedAddress(context?.userData?.address_details[0]?._id);
//     //     fetchDataFromApi(`/api/order/order-list`).then((res) => {
//     //         // console.log(res);
//     //     });

//     // }, [context?.userData])

//     const onApprovePayment = async (data) => {
//         const user = context?.userData;

//         // Prepare information for order capture
//         const info = {
//             userId: user?._id,
//             products: context?.cartData,
//             payment_status: "COMPLETE",
//             delivery_address: selectedAddress,
//             totalAmount: totalAmount,
//             date: new Date().toLocaleString("en-US", {
//                 month: "short",
//                 day: "2-digit",
//                 year: "numeric",
//             })
//         };

//         const headers = {
//             'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
//             'Content-Type': 'application/json',
//         };

//         // Send capture request to the server
//         const response = await axios.post(
//             VITE_API_URL + "/api/order/capture-order-paypal",
//             {
//                 ...info,
//                 paymentId: data.orderID
//             },
//             { headers }
//         ).then((res) => {
//             // Upon successful capture, empty the user's cart
//             context.openAlertBox("success", res?.data?.message);
//             deleteData(`/api/cart/emptyCart/${context?.userData?._id}`).then((res) => {
//                 context?.getCartItems();
//             })
//         });
//     };

//     useEffect(() => {
//         if (context?.userData) {
//             setUserData(context.userData);

//             if (context.userData.address_details?.length > 0) {
//                 setSelectedAddress(context.userData.address_details[0]._id);
//                 setIsChecked(0);
//             }
//             fetchDataFromApi(`/api/order/order-list`).then((res) => {
//                 // console.log(res);
//             });
//         }
//     }, [context?.userData]);


//     const editAddress = (id) => {
//         context?.setOpenAddressPanel(true);
//         context?.setAddressMode("edit")
//         context?.setAddressMode("edit")
//         context?.setAddressId(id)
//     };

//     const handleChange = (e, index) => {
//         if (e.target.checked) {
//             setIsChecked(index);
//             setSelectedAddress(e.target.value)
//         }
//     };

//     const checkout = (e) => {
//         e.preventDefault();

//         var options = {
//             key: VITE_APP_RAZORPAY_KEY_ID,
//             key_secret: VITE_APP_RAZORPAY_KEY_SECRET,
//             amount: parseInt(totalAmount * 100),
//             currency: "INR",
//             order_receipt: context?.userData?.name,
//             name: "Ecommerce Website (Chirag Simepurushkar)",
//             description: "for Educational, Development & testing purpose",
//             handler: function (response) {
//                 const paymentId = response.razorpay_payment_id;
//                 const user = context?.userData;

//                 const payLoad = {
//                     userId: user?._id,
//                     products: context?.cartData,
//                     paymentId: paymentId,
//                     payment_status: "COMPLETED",
//                     delivery_address: selectedAddress,
//                     totalAmt: totalAmount,
//                     date: new Date().toLocaleString("en-US", {
//                         month: "short",
//                         day: "2-digit",
//                         year: "numeric",
//                     })
//                 };

//                 postData(`/api/order/create`, payLoad).then((res) => {
//                     context.openAlertBox("success", res?.message);
//                     if (res?.error === false) {
//                         deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
//                             context?.getCartItems();
//                         })
//                         history("/");
//                     } else {
//                         context.openAlertBox("error", res?.message);
//                     }
//                 });

//             },
//             theme: {
//                 color: "#ff5252"
//             }
//         };
//         var pay = new window.Razorpay(options);
//         pay.open();
//     }

//     const cashOnDelivery = () => {
//         const user = context?.userData;

//         const payLoad = {
//             userId: user?._id,
//             products: context?.cartData,
//             paymentId: '',
//             payment_status: "CASH ON DELIVERY",
//             delivery_address: selectedAddress,
//             totalAmt: totalAmount,
//             date: new Date().toLocaleString("en-US", {
//                 month: "short",
//                 day: "2-digit",
//                 year: "numeric",
//             })
//         };

//         postData(`/api/order/create`, payLoad).then((res) => {
//             context.openAlertBox("success", res?.message);
//             if (res?.error === false) {
//                 deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
//                     context?.getCartItems();
//                 })
//                 history("/");
//             } else {
//                 context.openAlertBox("error", res?.message);
//             }
//         });
//     }
//     return (
//         < section className='py-10' >
//             <form onSubmit={checkout}>
//                 <div className='w-[70%] !m-auto flex gap-5'>
//                     <div className="leftCol w-[60%]">
//                         <div className="card bg-white shadow-md p-5 rounded-md w-full">


//                             {/* <h1>Billing Details</h1>
//                         <form className='w-full !mt-5'>
//                             <div className="flex items-center gap-5 pb-5">
//                                 <div className='col w-[50%]'>
//                                     <TextField
//                                         required
//                                         id="outlined-required"
//                                         className='w-full'
//                                         label="Full Name"
//                                         size="small"
//                                     />
//                                 </div>
//                                 <div className='col w-[50%]'>
//                                     <TextField
//                                         required
//                                         type="email"
//                                         id="outlined-required"
//                                         className='w-full'
//                                         label="Email ID"
//                                         size="small"
//                                     />
//                                 </div>
//                             </div>
//                             <h6 className='text-[14px] font-[500] !mb-3'>Street Address</h6>
//                             <div className="flex items-center gap-5 pb-5">
//                                 <div className='col w-[100%]'>
//                                     <TextField
//                                         required
//                                         id="outlined-required"
//                                         className='w-full'
//                                         label="House number and Street name"
//                                         size="small"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-5 pb-5">
//                                 <div className='col w-[100%]'>
//                                     <TextField
//                                         id="outlined-required"
//                                         className='w-full'
//                                         label="Apatment,suite, unit, etc. (optional)"
//                                         size="small"
//                                     />
//                                 </div>
//                             </div>
//                             <h6 className='text-[14px] font-[500] !mb-3'>Town/City</h6>
//                             <div className="flex items-center gap-5 pb-5">
//                                 <div className='col w-[100%]'>
//                                     <TextField
//                                         required
//                                         id="outlined-required"
//                                         className='w-full'
//                                         label="City"
//                                         size="small"
//                                     />
//                                 </div>
//                             </div>
//                             <h6 className='text-[14px] font-[500] !mb-3'>State/Country</h6>
//                             <div className="flex items-center gap-5 pb-5">
//                                 <div className='col w-[100%]'>
//                                     <TextField
//                                         required
//                                         id="outlined-required"
//                                         className='w-full'
//                                         label="State"
//                                         size="small"
//                                     />
//                                 </div>
//                             </div>
//                             <h6 className='text-[14px] font-[500] !mb-3'>Pincode/ZIP</h6>
//                             <div className="flex items-center gap-5 pb-5">
//                                 <div className='col w-[100%]'>
//                                     <TextField
//                                         required
//                                         id="outlined-required"
//                                         className='w-full'
//                                         label="ZIP Code"
//                                         size="small"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-5 pb-5">
//                                 <div className='col w-[50%]'>
//                                     <TextField
//                                         required
//                                         id="outlined-required"
//                                         className='w-full'
//                                         label="Phone Number"
//                                         size="small"
//                                     />
//                                 </div>
//                                 <div className='col w-[50%]'>
//                                     <TextField
//                                         required
//                                         id="outlined-required"
//                                         className='w-full'
//                                         label="Email Address"
//                                         size="small"
//                                     />
//                                 </div>
//                             </div>
//                         </form> */}
//                             <div className="flex items-center justify-between">
//                                 <h2>Select Delivery Address</h2>
//                                 <Button className='btn-org flex gap-4'
//                                     onClick={() => {
//                                         context?.setOpenAddressPanel(true);
//                                         context?.setAddressMode("add");
//                                     }}
//                                 >
//                                     <FaPlus />
//                                     ADD NEW ADDRESS
//                                 </Button>
//                             </div>
//                             <br />
//                             <div className="flex flex-col gap-4">
//                                 {
//                                     userData?.address_details?.length !== 0
//                                         ?
//                                         userData?.
//                                             address_details?.map((address, index) => {
//                                                 return (
//                                                     <label
//                                                         className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${isChecked === index && 'bg-[#fff2f2]'}`} key={index}>

//                                                         <div>
//                                                             <Radio value={address?._id} checked={isChecked === index} onChange={(e) => handleChange(e, index)} size="small" />
//                                                         </div>
//                                                         <div className="info">
//                                                             <span className="!mb-1 inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md">{address?.addressType}</span>
//                                                             <h3>{userData?.name}</h3>
//                                                             <p className="mt-0 mb-0">{address.address_line1}, {address.city = " "}{address.state} - {address.pincode + " "}{address.country + " "}
//                                                                 {address.landmark}
//                                                             </p>
//                                                             <p className="mt-0 mb-0 font-[500]">+{address?.mobile}</p>
//                                                         </div>

//                                                         <Button
//                                                             onClick={() => editAddress(address?._id)}
//                                                             variant="text" className="!absolute top-[15px] right-[15px]" size="small">EDIT</Button>
//                                                     </label>
//                                                 )
//                                             })

//                                         :
//                                         <div className="flex items-center justify-between flex-col p-5 !mt-2">
//                                             <img src="/address.png" width="170" className='!mb-4' />
//                                             <h2 className="text-center">No Addresses found in your account!</h2>
//                                             <p className='!mt-0'>Add a delivery address.</p>
//                                             <Button className="btn-org btn-lg">ADD ADDRESS</Button>
//                                         </div>
//                                 }
//                             </div>
//                         </div>

//                     </div>
//                     <div className="rightCol w-[40%]">
//                         <div className="card shadow-md bg-white p-5 rounded-md">
//                             <h2 className="mb-4">Your Order</h2>
//                             <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]">
//                                 <span className="text-[14px] font-[600]">Product</span>
//                                 <span className="text-[14px] font-[600]">Subtotal</span>
//                             </div>
//                             <div className="!mb-5 scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2">
//                                 {
//                                     context?.cartData?.length !== 0 && context?.cartData?.map((item, index) => {
//                                         return (
//                                             <div key={index} className="flex items-center justify-between py-2">
//                                                 <div className="part1 flex items-center gap-3">
//                                                     <div className="cursor-pointer img w-[50px] h[50px] object-cover overflow-hidden rounded-md group">
//                                                         <img
//                                                             src={item?.image}
//                                                             className='w-full transition-all group-hover:scale-105' />
//                                                     </div>
//                                                     <div className="info">
//                                                         <h4 className="text-[14px]" title={item?.productTitle}>
//                                                             {item?.productTitle?.substr(0, 15) + "..."}</h4>
//                                                         <span className="text-[13px]">Qty : {item?.quantity}</span>
//                                                     </div>

//                                                 </div>
//                                                 <span className="text-[14px] font-[500]">{(item?.quantity * item?.price).toLocaleString("en-US", {
//                                                     style: "currency",
//                                                     currency: "INR",
//                                                 })}</span>
//                                             </div>
//                                         )
//                                     })
//                                 }


//                             </div>
//                             <div className="flex flex-col items-center ga[-3 mb-2">
//                                 <Button type='submit' className='btn-org btn-lg w-full flex gap-3 items-center'>
//                                     <LuBaggageClaim className='text-[20px]' />
//                                     Checkout
//                                 </Button>
//                                 <div id="paypal-button-container"></div>
//                                 <Button type="button" className="!mt-4 btn-dark btn-lg w-full flex gap-2 items-center"
//                                     onClick={cashOnDelivery}>
//                                     <BsFillBagCheckFill className="text-[20px]" />
//                                     Cash on Delivery
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </section >
//     );
// }

// export default CheckOut;



import React, { useContext, useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { LuBaggageClaim } from "react-icons/lu";
import { MyContext } from '../../App.jsx'
import { FaPlus } from 'react-icons/fa6';
import Radio from '@mui/material/Radio';
import { deleteData, fetchDataFromApi, postData } from '../../utils/api.js';
import { BsFillBagCheckFill } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VITE_APP_RAZORPAY_KEY_ID = import.meta.env.VITE_APP_RAZORPAY_KEY_ID;
const VITE_APP_RAZORPAY_KEY_SECRET = import.meta.env.VITE_APP_RAZORPAY_KEY_SECRET;
const VITE_APP_PAYPAL_CLIENT_ID = import.meta.env.VITE_APP_PAYPAL_CLIENT_ID;
const VITE_API_URL = import.meta.env.VITE_API_URL;

const CheckOut = () => {
    const [userData, setUserData] = useState(null);
    const context = useContext(MyContext);
    const [isChecked, setIsChecked] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountNumeric, setTotalAmountNumeric] = useState(0);
    const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);
    const history = useNavigate();
    // Use refs to store current values that PayPal button can access
    const selectedAddressRef = useRef(selectedAddress);
    const totalAmountRef = useRef(totalAmountNumeric);
    const paypalButtonRendered = useRef(false);

    // Update refs whenever values change
    useEffect(() => {
        selectedAddressRef.current = selectedAddress;
    }, [selectedAddress]);

    useEffect(() => {
        totalAmountRef.current = totalAmountNumeric;
    }, [totalAmountNumeric]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const amount = context.cartData?.length !== 0
            ? context.cartData
                .map(item => parseInt(item.price) * item.quantity)
                .reduce((total, value) => total + value, 0)
            : 0;

        setTotalAmountNumeric(amount);
        setTotalAmount(
            amount.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
        );

        localStorage.setItem("totalAmount", amount);
    }, [context.cartData]);

    useEffect(() => {
        context?.getUserDetails();
    }, []);

    // Load PayPal SDK only once
    useEffect(() => {
        if (window.paypal) {
            setIsPayPalLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${VITE_APP_PAYPAL_CLIENT_ID}&disable-funding=card`;
        script.async = true;

        script.onload = () => {
            setIsPayPalLoaded(true);
        };

        script.onerror = () => {
            console.error("Failed to load PayPal SDK");
            context?.openAlertBox("error", "Failed to load PayPal. Please refresh the page.");
        };

        document.body.appendChild(script);

        return () => {
            // Only remove script on component unmount, not on re-renders
            const existingScript = document.querySelector(`script[src*="paypal.com/sdk"]`);
            if (existingScript && !window.paypal) {
                existingScript.remove();
            }
        };
    }, []);

    // Render PayPal button when SDK is loaded and user data is available
    useEffect(() => {
        if (!isPayPalLoaded || !context?.userData?._id || paypalButtonRendered.current) {
            return;
        }

        const container = document.getElementById("paypal-button-container");
        if (!container) return;

        // Clear existing buttons
        container.innerHTML = '';

        try {
            window.paypal.Buttons({
                createOrder: async () => {
                    try {
                        // Validate address selection using ref
                        if (!selectedAddressRef.current) {
                            context.openAlertBox("error", "Please select a delivery address");
                            throw new Error("No address selected");
                        }

                        // Fetch current exchange rate for INR to USD conversion
                        const resp = await fetch(
                            "https://v6.exchangerate-api.com/v6/8f85eea95dae9336b9ea3ce9/latest/INR"
                        );

                        const respData = await resp.json();
                        let convertedAmount = 0;

                        if (respData.result === "success") {
                            const usdToInrRate = respData.conversion_rates.USD;
                            convertedAmount = (totalAmountRef.current * usdToInrRate).toFixed(2);
                        } else {
                            throw new Error("Failed to fetch exchange rate");
                        }

                        const headers = {
                            'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                            'Content-Type': 'application/json',
                        };

                        // Create order on the server
                        const response = await axios.get(
                            `${VITE_API_URL}/api/order/create-order-paypal?userId=${context?.userData?._id}&totalAmount=${convertedAmount}`,
                            { headers }
                        );

                        if (response?.data?.error) {
                            throw new Error(response.data.message || "Failed to create order");
                        }

                        return response?.data?.id;
                    } catch (error) {

                        console.error("Error creating PayPal order:", error);
                        context.openAlertBox("error", error.message || "Failed to create PayPal order");
                        throw error;
                    }
                },
                onApprove: async (data) => {
                    await onApprovePayment(data);
                },
                onError: (err) => {
                    history("/order/failed")
                    console.error("PayPal Checkout onError:", err);
                    context.openAlertBox("error", "PayPal payment failed. Please try again.");
                }
            }).render("#paypal-button-container");

            paypalButtonRendered.current = true;
        } catch (error) {
            console.error("Error rendering PayPal button:", error);
        }
    }, [isPayPalLoaded, context?.userData?._id]);

    const onApprovePayment = async (data) => {
        try {
            const user = context?.userData;

            // Use ref to get current address
            if (!selectedAddressRef.current) {
                context.openAlertBox("error", "Please select a delivery address");
                return;
            }

            const info = {
                userId: user?._id,
                products: context?.cartData,
                payment_status: "COMPLETED",
                delivery_address: selectedAddressRef.current,
                totalAmount: totalAmountRef.current,
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                })
            };

            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post(
                `${VITE_API_URL}/api/order/capture-order-paypal`,
                {
                    ...info,
                    paymentId: data.orderID
                },
                { headers }
            );

            if (response?.data?.error) {
                throw new Error(response.data.message || "Failed to capture payment");
            }

            context.openAlertBox("success", response?.data?.message);

            await deleteData(`/api/cart/emptyCart/${context?.userData?._id}`);
            context?.getCartItems();
            history("/order/success")
            // Redirect to orders page or home
            // window.location.href = "/orders";
        } catch (error) {
            history("/order/failed")
            console.error("Payment approval error:", error);
            context.openAlertBox("error", error.message || "Failed to complete payment");
        }
    };

    useEffect(() => {
        if (context?.userData) {
            setUserData(context.userData);

            if (context.userData.address_details?.length > 0) {
                setSelectedAddress(context.userData.address_details[0]._id);
                setIsChecked(0);
            }

            fetchDataFromApi(`/api/order/order-list`).then((res) => {
                // Handle order list if needed
            });
        }
    }, [context?.userData]);

    const editAddress = (id) => {
        context?.setOpenAddressPanel(true);
        context?.setAddressMode("edit");
        context?.setAddressId(id);
    };

    const handleChange = (e, index) => {
        if (e.target.checked) {
            setIsChecked(index);
            setSelectedAddress(e.target.value);
            console.log("Address selected:", e.target.value);
        }
    };

    const checkout = (e) => {
        e.preventDefault();

        if (!selectedAddress) {
            context.openAlertBox("error", "Please select a delivery address");
            return;
        }

        const options = {
            key: VITE_APP_RAZORPAY_KEY_ID,
            key_secret: VITE_APP_RAZORPAY_KEY_SECRET,
            amount: parseInt(totalAmountNumeric * 100),
            currency: "INR",
            order_receipt: context?.userData?.name,
            name: "Ecommerce Website",
            description: "for Educational, Development & testing purpose",
            handler: function (response) {
                const paymentId = response.razorpay_payment_id;
                const user = context?.userData;

                const payLoad = {
                    userId: user?._id,
                    products: context?.cartData,
                    paymentId: paymentId,
                    payment_status: "COMPLETED",
                    delivery_address: selectedAddress,
                    totalAmt: totalAmountNumeric,
                    date: new Date().toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    })
                };

                postData(`/api/order/create`, payLoad).then((res) => {
                    context.openAlertBox("success", res?.message);
                    if (res?.error === false) {
                        deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
                            context?.getCartItems();
                        });
                        history("/order/success")


                    } else {
                        history("/order/failed")
                        context.openAlertBox("error", res?.message);
                    }
                });
            },
            theme: {
                color: "#ff5252"
            }
        };

        const pay = new window.Razorpay(options);
        pay.open();
    };

    const cashOnDelivery = () => {
        if (!selectedAddress) {
            context.openAlertBox("error", "Please select a delivery address");
            return;
        }

        const user = context?.userData;

        const payLoad = {
            userId: user?._id,
            products: context?.cartData,
            paymentId: '',
            payment_status: "CASH ON DELIVERY",
            delivery_address: selectedAddress,
            totalAmt: totalAmountNumeric,
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })
        };

        postData(`/api/order/create`, payLoad).then((res) => {
            context.openAlertBox("success", res?.message);
            if (res?.error === false) {
                deleteData(`/api/cart/emptyCart/${user?._id}`).then((res) => {
                    context?.getCartItems();
                });
                history("/order/success")

            } else {
                context.openAlertBox("error", res?.message);
            }
        });
    };

    return (
        <section className='py-3 lg:py-10 px-3'>
            <form onSubmit={checkout}>
                <div className=' w-full md:w-[70%] !m-auto flex flex-col md:flex-row gap-5'>
                    <div className="leftCol w-full md:w-[60%]">
                        <div className="card bg-white shadow-md p-5 rounded-md w-full">
                            <div className="flex items-center justify-between">
                                <h2>Select Delivery Address</h2>
                                <Button
                                    className='btn-org flex gap-4'
                                    onClick={() => {
                                        context?.setOpenAddressPanel(true);
                                        context?.setAddressMode("add");
                                    }}
                                >
                                    <FaPlus />
                                    ADD {context?.windowWidth>992?' NEW ADDRESS':''}
                                </Button>
                            </div>
                            <br />
                            <div className="flex flex-col gap-4">
                                {userData?.address_details?.length !== 0 ? (
                                    userData?.address_details?.map((address, index) => (
                                        <label
                                            className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${isChecked === index && 'bg-[#fff2f2]'}`}
                                            key={index}
                                        >
                                            <div>
                                                <Radio
                                                    value={address?._id}
                                                    checked={isChecked === index}
                                                    onChange={(e) => handleChange(e, index)}
                                                    size="small"
                                                />
                                            </div>
                                            <div className="info">
                                                <span className="!mb-1 inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md">
                                                    {address?.addressType}
                                                </span>
                                                <h3>{userData?.name}</h3>
                                                <p className="mt-0 mb-0">
                                                    {address.address_line1}, {address.city} {address.state} - {address.pincode} {address.country} {address.landmark}
                                                </p>
                                                <p className="mt-0 mb-0 font-[500]">+{address?.mobile}</p>
                                            </div>
                                            <Button
                                                onClick={() => editAddress(address?._id)}
                                                variant="text"
                                                className="!absolute top-[15px] right-[15px]"
                                                size="small"
                                            >
                                                EDIT
                                            </Button>
                                        </label>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-between flex-col p-5 !mt-2">
                                        <img src="/address.png" width="170" className='!mb-4' alt="No address" />
                                        <h2 className="text-center">No Addresses found in your account!</h2>
                                        <p className='!mt-0'>Add a delivery address.</p>
                                        <Button
                                            className="btn-org btn-lg"
                                            onClick={() => {
                                                context?.setOpenAddressPanel(true);
                                                context?.setAddressMode("add");
                                            }}
                                        >
                                            ADD ADDRESS
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="rightCol w-full md:w-[40%]">
                        <div className="card shadow-md bg-white p-5 rounded-md">
                            <h2 className="mb-4">Your Order</h2>
                            <div className="flex items-center justify-between py-3 border-t border-b border-[rgba(0,0,0,0.1)]">
                                <span className="text-[14px] font-[600]">Product</span>
                                <span className="text-[14px] font-[600]">Subtotal</span>
                            </div>
                            <div className="!mb-5 scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2">
                                {context?.cartData?.length !== 0 && context?.cartData?.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between py-2">
                                        <div className="part1 flex items-center gap-3">
                                            <div className="cursor-pointer img w-[50px] h[50px] object-cover overflow-hidden rounded-md group">
                                                <img
                                                    src={item?.image}
                                                    className='w-full transition-all group-hover:scale-105'
                                                    alt={item?.productTitle}
                                                />
                                            </div>
                                            <div className="info">
                                                <h4 className="text-[14px]" title={item?.productTitle}>
                                                    {item?.productTitle?.substr(0, 15) + "..."}
                                                </h4>
                                                <span className="text-[13px]">Qty : {item?.quantity}</span>
                                            </div>
                                        </div>
                                        <span className="text-[14px] font-[500]">
                                            {(item?.quantity * item?.price).toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "INR",
                                            })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-center gap-3 mb-2">
                                <Button type='submit' className='btn-org btn-lg w-full flex gap-3 items-center'>
                                    <LuBaggageClaim className='text-[20px]' />
                                    Checkout with Razorpay
                                </Button>
                                <div id="paypal-button-container" className={`w-full ${selectedAddressRef.current?'':'pointer-events-none opacity-50' }`}></div>
                                <Button
                                    type="button"
                                    className="btn-dark btn-lg w-full flex gap-2 items-center"
                                    onClick={cashOnDelivery}
                                >
                                    <BsFillBagCheckFill className="text-[20px]" />
                                    Cash on Delivery
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default CheckOut;