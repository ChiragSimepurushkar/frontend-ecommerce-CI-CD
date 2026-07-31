import React, { useEffect, useRef, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ProductZoom from '../../components/ProductZoom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ProductsSlider from '../../components/ProductsSlider';
import ProductDetailsComponent from '../../components/ProductDetailsComponent';
import { fetchDataFromApi } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { Reviews } from './reviews';
const ProductDetails = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [productData, setProductData] = useState();
    const [relatedProductData, setRelatedProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const reviewsSec = useRef();

    const { id } = useParams();
    useEffect(() => {
        fetchDataFromApi(`/api/user/getReviews?productId=${id}`).then((res) => {
            if (res?.error === false) {
                setReviewCount(res?.reviews?.length);
            }
        });
    }, [id]);

    useEffect(() => {
        if (!productData?.subCatId) return;

        fetchDataFromApi(
            `/api/product/getAllProductsBySubCatId/${productData.subCatId}`
        ).then((res) => {
            if (res?.error === false) {
                const filtered = res.products.filter(
                    (item) => item._id !== productData._id
                );
                setRelatedProductData(filtered);
            }
        });
    }, [productData]);


    useEffect(() => {
        setIsLoading(true);
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.product);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            }
        });
        window.scrollTo(0, 0);
    }, [id]);

    const goToReviews = () => {
        window.scrollTo({
            top: reviewsSec?.current.offsetTop - 210,
            behavior: 'smooth',
        })
        setActiveTab(1)
    }

    return (
        <>
            <div className='py-5'>
                {/* <div className="container">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link className="link transition !text-[14px]" underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                            className='link transition !text-[14px]'
                        >
                            Fashion
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            className='link transition !text-[14px]'
                        >
                            Cropped Satin Bomber Jacket
                        </Link>
                    </Breadcrumbs>
                </div> */}
            </div>
            <section className="bg-white py-5">
                {isLoading === true ? (
                    <div className="flex items-center justify-center min-h-[300px]">
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <div className="container flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                            <div className="productZoomContainer w-full lg:w-[40%]">
                                <ProductZoom images={productData?.images} />
                            </div>
                            <div className="productContent w-full lg:w-[60%] pr-10 pl-10">
                                <ProductDetailsComponent goToReviews={goToReviews} item={productData} reviewCount={reviewCount} />
                            </div>
                        </div>
                        <div className="container !pt-10 ">
                            <div className="flex items-center gap-8 !mb-5">
                                <span
                                    className={`link font-[500] text-[17px] cursor-pointer ${activeTab === 0 && 'text-[#ff5252]'}`}
                                    onClick={() => setActiveTab(0)}>Description</span>
                                {/* <span className={`link font-[500] text-[17px] cursor-pointer ${activeTab === 1 && 'text-[#ff5252]'}`} onClick={() => setActiveTab(1)}>Product Details </span> */}
                                <span className={`link font-[500] text-[17px] cursor-pointer
                                     ${activeTab === 1 && 'text-[#ff5252]'}`}
                                    onClick={() => setActiveTab(1)} ref={reviewsSec}>Reviews ({reviewCount})
                                </span>
                            </div>
                            {
                                activeTab === 0 && (
                                    <div className="shadow-md w-full py-5 px-8 rounded-md">
                                        {productData?.description}
                                    </div>)
                            }
                            {/* {
                                activeTab === 1 && (
                                    <div className="shadow-md w-full py-5 px-8 rounded-md">
                                        <div class="relative overflow-x-auto">
                                            <table class="w-full text-sm text-left rtl:text-right text-gray-700">
                                                <thead class="text-xs text-gray-900 uppercase bg-gray-100">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3">
                                                            Stand Up
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Folded(w/o wheels)
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Folded(w/wheels)
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Door Pass Through
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="bg-white border-b border-gray-200">
                                                        <td class="px-6 py-4 font-[500]" >
                                                            35*Lx 24*Wx37-45*H(front to back wheel)
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            24
                                                        </td>
                                                    </tr>
                                                    <tr class="bg-white border-b border-gray-200">
                                                        <td class="px-6 py-4 font-[500]" >
                                                            35*Lx 24*Wx37-45*H(front to back wheel)
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            24
                                                        </td>
                                                    </tr>
                                                    <tr class="bg-white border-b border-gray-200">
                                                        <td class="px-6 py-4 font-[500]" >
                                                            35*Lx 24*Wx37-45*H(front to back wheel)
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            24
                                                        </td>
                                                    </tr>
                                                    <tr class="bg-white border-b border-gray-200">
                                                        <td class="px-6 py-4 font-[500]" >
                                                            35*Lx 24*Wx37-45*H(front to back wheel)
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            24
                                                        </td>
                                                    </tr>
                                                    <tr class="bg-white border-b border-gray-200">
                                                        <td class="px-6 py-4 font-[500]" >
                                                            35*Lx 24*Wx37-45*H(front to back wheel)
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            32.5LX18.5H
                                                        </td>
                                                        <td class="px-6 py-4 font-[500]">
                                                            24
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            } */}
                            {
                                activeTab === 1 && (
                                    <div className="shadow-none lg:shadow-md  w-full sm:w-[80%] py-0 lg:py-5 px-0 lg:px-8 rounded-md">
                                        {
                                            productData?.length !== 0 && <Reviews productId={productData?._id}
                                                setReviewCount={setReviewCount} />
                                        }
                                    </div>
                                )
                            }
                        </div>
                        {
                            relatedProductData?.length !== 0 &&
                            <div className="container pt-8">
                                <h2 className='text-[22px] font-[600]'>Related Products</h2>
                                <ProductsSlider items={6} data={relatedProductData} />
                            </div>
                        }
                    </>
                )}
            </section>
        </>
    );
}

export default ProductDetails;