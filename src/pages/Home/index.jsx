import React from 'react';
import HomeSlider from '../../components/HomeSlider';
import HomeCatSlider from '../../components/CatSlider';
import { FaShippingFast } from "react-icons/fa";
import AdsBannerSlider from '../../components/AdsBannerSlider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from '../../components/ProductsSlider';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
import BlogItem from '../../components/BlogItem';
import HomeSliderV2 from '../../components/HomeSliderV2';
import BannerBoxV2 from '../../components/BannerBoxV2';
import AdsBannerSliderV2 from '../../components/AdsBannerSliderV2';
import { Link } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../App';
import ProductLoading from '../../components/ProductLoading';
import BannerLoading from '../../components/HomeSlider/BannerLoading';
const Home = () => {
  const [value, setValue] = React.useState(0);
  const [homeSlidesData, setHomeSlidesData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);
  const [allProductData, setAllProductData] = useState([]);
  const [bannerV1Data, setBannerV1Data] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [allFeaturedProductData, setAllFeaturedProductData] = useState([]);
  const context = useContext(MyContext);
  useEffect(() => {
    fetchDataFromApi("/api/homeSlides").then((res) => {
      setHomeSlidesData(res?.data)
    })
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      setAllProductData(res?.products)
    })
    fetchDataFromApi("/api/product/getAllFeaturedProducts").then((res) => {
      setAllFeaturedProductData(res?.products)
    })
    fetchDataFromApi("/api/bannerV1").then((res) => {
      setBannerV1Data(res?.data)
    });
    fetchDataFromApi("/api/blog").then((res) => {
      setBlogData(res?.blogs)
    });
    context?.getCartItems();
  }, [])

  // useEffect(()=>{
  //   window.scrollTo(0,0);
  // })

  useEffect(() => {
    if (!context?.catData?.length) return; // ⛔ STOP if empty

    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${context.catData[0]._id}`
    ).then((res) => {
      if (res?.error === false) {
        setPopularProductsData(res?.products);
      }
    });

  }, [context?.catData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const filterByCatId = (id) => {
    setPopularProductsData([])
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (res?.error === false) {
        setTimeout(() => {
          setPopularProductsData(res?.products)
        }, 2000)
      }
    })
  }
  return (
    <>
      <div className='min-h-max lg:min-h-[65vh] relative'>
        {
          homeSlidesData?.length !== 0 ?
            <HomeSlider data={homeSlidesData} />
            :
            <BannerLoading />
        }
      </div>
      {
        context?.catData?.length !== 0 && <HomeCatSlider data={context?.catData} />
      }

      <section className='bg-white !py-8'>
        <div className="container-fluid">
          <div className="flex items-center justify-between lg:flex-row flex-col ">
            <div className="leftSec w-full lg:w-[40%] !pl-8">
              <h2 className='sm:text-[14px] md:text-[16px] lg:text-[22px] font-[600]'>Popular Products</h2>
              <p className='sm:text-[10px] md:text-[12px] lg:text-[14px] font-[400] !mt-0 !mb-0'>Do not miss the current offers until the end of March.</p>
            </div>
            <div className="rightSec w-full lg:w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {
                  context?.catData?.length !== 0 && context?.catData?.map((cat, index) => {
                    return (
                      <Tab key={index} label={cat?.name} onClick={() => filterByCatId(cat?._id)} />
                    )
                  })
                }
                {/* <Tab label="Fashion" component={Link} to="/productListing" /> */}
              </Tabs>
            </div>
          </div>
          <div className="min-h-[60vh]">
            {
            popularProductsData?.length !== 0 ? <ProductsSlider items={6} data=
              {popularProductsData} />:
              <ProductLoading />
          }
          </div>
        </div>
      </section>

      <section className='py-0 lg:py-4 pt-0 lg:pt-8 bg-white'>
        <div className="container">
          <div className="freeShipping flex-col pb-0 lg:flex-row w-full md:w-[80%] m-auto py-4 p-4 border-2
           border-[#ff5252] flex items-center justify-center lg:justify-between rounded-md mb-7">
            <div className="col1 flex items-center gap-4 ">
              <FaShippingFast className='text-[30px] lg:text-[50px]' />
              <span className='text-[15px] lg:text-[20px] font-[600]  uppercase'>Free Shipping</span>
            </div>
            <div className="col2">
              <p className='mb-0 font-[500] text-center'>Free Delivery Now on Your First Order and over $200</p>
            </div>
            <p className='font-bold text-[20px] lg:text-[25px]'>-Only $200*</p>
          </div>
        </div>
        <div className="container-fluid">
          {
            bannerV1Data?.length !== 0 &&
            <AdsBannerSliderV2 items={3} data={bannerV1Data} />
          }
        </div>
      </section>
      <section className='py-6 '>
        <div className="container-fluid flex flex-col lg:flex-row gap-5">
          <div className="part1 w-full lg:w-[70%]">
            {
              allProductData?.length !== 0 && <HomeSliderV2 data={allProductData} />
            }
          </div>
          <div className="part2 scrollableBox w-full lg:w-[30%] flex gap-3
          items-center justify-betwee flex-row md:flex-col">
            {/* <BannerBoxV2 info="right" image={"https://serviceapi.spicezgold.com/download/1741664665391_1741497254110_New_Project_50.jpg"} />
            <BannerBoxV2 info="left" image={'https://serviceapi.spicezgold.com/download/1757183705017_1737020250515_New_Project_47.jpg'} /> */}

            <BannerBoxV2
              info={bannerV1Data[bannerV1Data?.length - 1]?.alignInfo}
              image={bannerV1Data[bannerV1Data?.length - 1]?.images[0]}
              item={bannerV1Data[bannerV1Data?.length - 1]}
            />

            <BannerBoxV2
              info={bannerV1Data[bannerV1Data?.length - 2]?.alignInfo}
              image={bannerV1Data[bannerV1Data?.length - 2]?.images[0]}
              item={bannerV1Data[bannerV1Data?.length - 2]}
            />
          </div>
        </div>
      </section>
      <section className='py-5 pl-10 pt-8 bg-white'>
        <div className="container-fluid">
          <h2 className='text-[22px] font-[600]'>Latest Products</h2>
          {
            allProductData?.length === 0 &&
            <div className="grid grid-cols-5 md:grid-cols-5 gap-4">
              <ProductLoading />
            </div>
          }
          {
            allProductData?.length !== 0 &&
            <ProductsSlider items={6} data={allProductData} />
          }
          {
            bannerV1Data?.length !== 0 &&
            <AdsBannerSlider items={3} data={bannerV1Data} />
          }

        </div>
      </section>

      <section className='py-2 lg:py-5 pl-10 pt-0 bg-white'>
        <div className="container-fluid">
          <h2 className='text-[22px] font-[600]'>Featured Products</h2>
          {
            allFeaturedProductData?.length === 0 && <ProductLoading />
          }
          {
            allFeaturedProductData?.length !== 0 &&
            <ProductsSlider items={6} data={allFeaturedProductData} />
          }
          <AdsBannerSliderV2 items={2} />
        </div>
      </section>
      {
        blogData?.length !== 0 && (
          <section className='py-5 pl-10 pt-0 bg-white blogSection'>
            <h2 className='text-[22px] font-[600] !mb-4'>From the Blogs</h2>
            <div className="container-fluid">
              <Swiper
                // slidesPerView={3}
                spaceBetween={30}
                navigation={context?.windowWidth < 992 ? false : true}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{
                          250: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                          },
                          330: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                          },
                          500: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                          },
                          768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                          },
                          1024: {
                            slidesPerView: 6,
                            spaceBetween: 30,
                          },
                        }}
                        autoplay={{
                          delay: 2000,
                          disableOnInteraction: false,
                        }}
                        loop={true}
                className="blogSlider"
              >
                {
                  blogData?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <BlogItem item={item} />
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>
          </section>
        )
      }

    </>
  );
};

export default Home;