import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import Button from '@mui/material/Button';
import { MyContext } from '../../App';
const HomeSliderV2 = (props) => {
    const context = useContext(MyContext)
    return (
        <Swiper
            loop={true}
            spaceBetween={30}
            effect={'fade'}
            navigation={context?.windowWidth < 992 ? false : true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            className="homeSliderV2"
        >
            {
                props?.data?.map((item, index) => {
                    if (item?.isDisplayOnHomeBanner === true) {
                        return (
                            <SwiperSlide>
                                <div className="item w-full rounded-md overflow-hidden relative">
                                    <img src={item?.bannerimages[0]} className="w-full h-full object-cover" />
                                    <div className="info absolute z-50 p-8 top-0 -right-[100%] w-[50%] h-[100%]
                    flex items-center flex-col justify-center transition-all duration-700">
                                        <h4 className="text-[12px] lg:text-[18px] font-[500]
                                         w-full text-left mb-3 relative -right-[100%] opacity-0 hidden md:block">{item?.bannerTitlename}</h4>
                                        {
                                            context?.windowWidth < 992 &&
                                            <h2 className="text-[16px] sm:text-[20px] lg:text-[30px] font-[700] w-full relative -right-[100%] opacity-0">
                                                {item?.name?.length > 30 ? item?.name?.substr(0, 30) + '...' : item?.name}
                                            </h2>
                                        }
                                        {
                                            context?.windowWidth >= 992 &&
                                            <h2 className="sm:text-[15px] md:text-[25px] lg:text-[30px] font-[700] w-full relative -right-[100%] opacity-0">
                                                {item?.name?.length > 70 ? item?.name?.substr(0, 70) + '...' : item?.name}
                                            </h2>
                                        }


                                        <h3 className="relative -right-[100%] opacity-0 flex flex-col lg:flex-row items-center 
                                        gap-0 lg:gap-3 text-[12px] lg:text-[18px] font-[500] w-full text-left mt-3 md:mb-3 mb-0">
                                            <span className=' block md:inline w-full lg:w-max'>Starting At Only</span>
                                            <span className="text-[#ff5252] text-[18px] lg:text-[30px] block md:inline w-full lg:w-max
                                             font-[700]">{item?.price?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}</span>
                                        </h3>
                                        <div className="w-full  relative -right-[100%] opacity-0 btn_">
                                            <Button className='btn-org btn'>SHOP NOW</Button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }
                })
            }
        </Swiper>
    );
}

export default HomeSliderV2;