// import React, { useEffect, useState } from 'react';
// import AccountSidebar from '../../components/AccountSidebar';
// import Button from '@mui/material/Button';
// import { FaAngleUp } from "react-icons/fa6";
// import { FaAngleDown } from "react-icons/fa6";
// import Badge from '../../components/Badge';
// import { fetchDataFromApi } from '../../utils/api';
// const Orders = () => {
//     const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
//     const [orders, setOrders] = useState([])
//     const isShowOrderProduct = (index) => {
//         if (isOpenOrderProduct === index) {
//             setIsOpenOrderProduct(null);
//         } else {
//             setIsOpenOrderProduct(index);
//         }
//     }

//     useEffect(() => {
//         fetchDataFromApi("/api/order/order-list").then((res) => {
//             console.log(res?.data)
//             if (res?.error === false) {
//                 setOrders(res?.data)

//             }
//         })
//     }, [])

//     return (
//         <section className='py-10 w-full'>
//             <div className="container flex gap-5">
//                 <div className="col1 w-[20%]">
//                     <AccountSidebar />
//                 </div>
//                 <div className="col2 w-[80%]">
//                     <div className="shadow-md rounded-md bg-white">
//                         <div className="py-5 px-3  border-b border-[rgba(0,0,0,0.1)]">
//                             <h2 className='!font-bold'>My Orders</h2>
//                             <p className="mt-0">
//                                 There are <span className="font-bold text-[#ff5252]">{orders?.length}</span> orders
//                             </p>
//                             <div className="relative overflow-x-auto mt-5">
//                                 <table className="w-full text-sm text-left rtl:text-right text-gray-700">
//                                     <thead className="text-xs text-gray-900 uppercase bg-gray-100">
//                                         <tr>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 &nbsp;
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Order ID
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Payment ID
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Products
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Name
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Phone Number
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Address
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Pincode
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Total Amount
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Email
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 User ID
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Order Status
//                                             </th>
//                                             <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                 Date
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>

//                                         {
//                                             orders?.length !== 0 && orders?.map((order, index) => {
//                                                 {console.log(order)}
//                                                 return (
//                                                     <>
//                                                         <tr className="bg-white border-b border-gray-200">
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 <Button onClick={() => isShowOrderProduct(index)}
//                                                                     className='!w-[35px] !bg-[#f1f1f1] !rounded-full !min-w-[35px] !h-[35px]'>
//                                                                     {
//                                                                         isOpenOrderProduct === index ? <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' />
//                                                                             : <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
//                                                                     }

//                                                                 </Button>
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 <span className='text-[#ff5252]'>{order?._id}</span>
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 <span className='text-[#ff5252]'>{order?.paymentId ? order?.paymentId : "CASH ON DELIVERY"}</span>
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 {order?.userId?.name}
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500] whitespace-nowrap" >
//                                                                 {order?.userId?.mobile}
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 <span className='block w-[400px]'>{order?.userId?.name}</span>
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 {order?.delivery_address?.address_line1 + " " +
//                                                                     order?.delivery_address?.landmark + " " +
//                                                                     order?.delivery_address?.city + " " +
//                                                                     order?.delivery_address?.state + " " + "pincode: " +
//                                                                     order?.delivery_address?.pincode + " " +
//                                                                     order?.delivery_address?.country}
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 {order?.totalAmt}
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 {order?.userId?.email}
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 {order?.userId?._id}
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 <span className='text-[#ff5252]'>dhdhdhdh</span>
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 <Badge status={order?.order_status} />
//                                                             </td>
//                                                             <td className="px-6 py-4 font-[500]" >
//                                                                 {order?.createdAt?.split('T')[0]}
//                                                             </td>
//                                                         </tr>
//                                                         {
//                                                             isOpenOrderProduct === index &&
//                                                             (<tr>
//                                                                 <td className="pl-20" colSpan="6">
//                                                                     <div className="relative overflow-x-auto">
//                                                                         <table className="w-full text-sm text-left rtl:text-right text-gray-700">
//                                                                             <thead className="text-xs text-gray-900 uppercase bg-gray-100">
//                                                                                 <tr>
//                                                                                     <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                                                         Product ID
//                                                                                     </th>
//                                                                                     <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                                                         Product Title
//                                                                                     </th>
//                                                                                     <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                                                         Image
//                                                                                     </th>
//                                                                                     <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                                                         Quantity
//                                                                                     </th>
//                                                                                     <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                                                         Price
//                                                                                     </th>
//                                                                                     <th scope="col" className="px-6 py-3 whitespace-nowrap">
//                                                                                         Sub Total
//                                                                                     </th>
//                                                                                 </tr>
//                                                                             </thead>
//                                                                             <tbody>
//                                                                                 {order.products.map((product, i) => (
//                                                                                     <>
//                                                                                         <tr key={i} className="bg-white border-b border-gray-200">
//                                                                                             <td className="px-6 py-4"> <span className='text-green-700'>{product.productId}</span></td>
//                                                                                             <td className="px-6 py-4"><span className='text-[#ff5252]'>{product.productTitle}</span></td>
//                                                                                             <td className="px-6 py-4 font-[500]">
//                                                                                                 <img
//                                                                                                     src={product.image}
//                                                                                                     className="w-[40px] h-[40px] object-cover rounded-md"
//                                                                                                 />
//                                                                                             </td>
//                                                                                             <td className="px-6 py-4">{product.quantity}</td>
//                                                                                             <td className="px-6 py-4  whitespace-nowrap">{product.price}</td>
//                                                                                             <td className="px-6 py-4">
//                                                                                                 <span className='block w-[400px]'>{product.quantity * product.price}</span>
//                                                                                             </td>
//                                                                                         </tr>
//                                                                                         <tr>
//                                                                                             <td className="bg-[#f1f1f1]" colSpan="12">
//                                                                                             </td>
//                                                                                         </tr>
//                                                                                     </>
//                                                                                 ))}

//                                                                                 <tr className="bg-white border-b border-gray-200">
//                                                                                     <td className="px-6 py-4 font-[500]" >
//                                                                                         <span className='text-green-700'>64646646</span>
//                                                                                     </td>
//                                                                                     <td className="px-6 py-4 font-[500]" >
//                                                                                         <span className='text-[#ff5252]'>64646646</span>
//                                                                                     </td>
//                                                                                     <td className="px-6 py-4 font-[500]" >
//                                                                                         <img src="https://tse3.mm.bing.net/th/id/OIP.PTZAREFwU9IbPy6MkUo_MAHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
//                                                                                             className='w-[40px] h-[40px] object-cover rounded-md' />
//                                                                                     </td>
//                                                                                     <td className="px-6 py-4 font-[500]" >
//                                                                                         dhhdgdg
//                                                                                     </td>
//                                                                                     <td className="px-6 py-4 font-[500] whitespace-nowrap" >
//                                                                                         dhhdgdg
//                                                                                     </td>
//                                                                                     <td className="px-6 py-4 font-[500]" >
//                                                                                         <span className='block w-[400px]'>House wgsggdss sggsgs sgsgsg sgggsg sgsg</span>
//                                                                                     </td>
//                                                                                 </tr>

//                                                                             </tbody>
//                                                                         </table>
//                                                                     </div>
//                                                                 </td>
//                                                             </tr>
//                                                             )}
//                                                     </>
//                                                 )
//                                             })
//                                         }


//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Orders;




import React, { useEffect, useState } from 'react';
import AccountSidebar from '../../components/AccountSidebar';
import Button from '@mui/material/Button';
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import Badge from '../../components/Badge';
import { fetchDataFromApi } from '../../utils/api';

const Orders = () => {
    const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
    const [orders, setOrders] = useState([]);

    const isShowOrderProduct = (index) => {
        setIsOpenOrderProduct(isOpenOrderProduct === index ? null : index);
    }

    useEffect(() => {
        fetchDataFromApi("/api/order/order-list").then((res) => {
            if (res?.error === false) {
                setOrders(res?.data);
            }
        }).catch((error) => {
            console.error("Error fetching orders:", error);
        });
    }, []);

    return (
        <section className='lg:py-10 py-4 w-full'>
            <div className="container flex flex-col lg:flex-row gap-5">
                <div className="col1 w-[20%] hidden lg:block">
                    <AccountSidebar />
                </div>
                <div className="col2 w-full lg:w-[80%]">
                    <div className="shadow-md rounded-md bg-white">
                        <div className="py-5 px-3 border-b border-[rgba(0,0,0,0.1)]">
                            <h2 className='!font-bold'>My Orders</h2>
                            <p className="mt-0">
                                There are <span className="font-bold text-[#ff5252]">{orders?.length}</span> orders
                            </p>
                            <div className="relative overflow-x-auto mt-5">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                    <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">&nbsp;</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Order ID</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Payment ID</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Phone Number</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Address</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Pincode</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Status</th>
                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.length !== 0 && orders?.map((order, index) => (
                                            <React.Fragment key={order._id}>
                                                <tr className="bg-white border-b border-gray-200">
                                                    <td className="px-6 py-4 font-[500]">
                                                        <Button 
                                                            onClick={() => isShowOrderProduct(index)}
                                                            className='!w-[35px] !bg-[#f1f1f1] !rounded-full !min-w-[35px] !h-[35px]'>
                                                            {isOpenOrderProduct === index ? 
                                                                <FaAngleUp className='text-[16px] text-[rgba(0,0,0,0.7)]' /> :
                                                                <FaAngleDown className='text-[16px] text-[rgba(0,0,0,0.7)]' />
                                                            }
                                                        </Button>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        <span className='text-[#ff5252]'>{order?._id}</span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        <span className='text-[#ff5252]'>
                                                            {order?.paymentId || "CASH ON DELIVERY"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        {order?.userId?.name || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                        +{order?.userId?.mobile || 'N/A'}
                                                    </td>
                                                    <td className=" py-4 font-[500] max-w-[180px] whitespace-normal leading-tight">
                                                        {order?.delivery_address ? (
                                                            <>
                                                                {order.delivery_address.address_line1}{' '}
                                                                {order.delivery_address.landmark}{' '}
                                                                {order.delivery_address.city}{' '}
                                                                {order.delivery_address.state}{' '}
                                                                {order.delivery_address.country}
                                                            </>
                                                        ) : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        {order?.delivery_address?.pincode || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        ₹{order?.totalAmt?.toFixed(2) || '0.00'}
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        {order?.userId?.email || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 font-[500]">
                                                        <Badge status={order?.order_status} />
                                                    </td>
                                                    <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                                        {order?.createdAt?.split('T')[0]}
                                                    </td>
                                                </tr>
                                                
                                                {isOpenOrderProduct === index && (
                                                    <tr>
                                                        <td colSpan="11" className="pl-20">
                                                            <div className="relative overflow-x-auto">
                                                                <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                                                    <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                                                                        <tr>
                                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Product ID</th>
                                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Product Title</th>
                                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Image</th>
                                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Quantity</th>
                                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Price</th>
                                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">Sub Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {order?.products?.map((product, i) => (
                                                                            <tr key={i} className="bg-white border-b border-gray-200">
                                                                                <td className="px-6 py-4">
                                                                                    <span className='text-green-700'>{product.productId}</span>
                                                                                </td>
                                                                                <td className="px-6 py-4">
                                                                                    <span className='text-[#ff5252]'>{product.productTitle}</span>
                                                                                </td>
                                                                                <td className="px-6 py-4 font-[500]">
                                                                                    <img
                                                                                        src={product.image}
                                                                                        alt={product.productTitle}
                                                                                        className="w-[40px] h-[40px] object-cover rounded-md"
                                                                                    />
                                                                                </td>
                                                                                <td className="px-6 py-4">{product.quantity}</td>
                                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                                    ₹{product.price?.toFixed(2)}
                                                                                </td>
                                                                                <td className="px-6 py-4">
                                                                                    ₹{(product.quantity * product.price).toFixed(2)}
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Orders;