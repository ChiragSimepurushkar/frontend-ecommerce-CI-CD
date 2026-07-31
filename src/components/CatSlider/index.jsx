import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import '../../index.css';
import { useContext } from 'react';
import { MyContext } from '../../App';
const HomeCatSlider = (props) => {
    const context = useContext(MyContext)

    return (
        <div className="homeCatSlider pt-0 py-4 lg:py-8 lg:pt-4">
            <div className="container-fluid">
                <Swiper
                    // slidesPerView={5}
                    spaceBetween={10}
                    navigation={context?.windowWidth < 992 ? false : true}
                    modules={[Navigation, Autoplay]}
                    breakpoints={{
                        0: {
                            slidesPerView: 3,
                            spaceBetween: 5,
                        },
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 5,
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 5,
                        },
                        1024: {
                            slidesPerView: 8,
                            spaceBetween: 5,
                        },
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="mySwiper"
                >
                    {
                        props?.data?.map((cat, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link to="/">
                                        <div className="item py-4 lg:py-7 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col ">
                                            <img src={cat?.images[0]}
                                             className='w-[40px] lg:w-[60px]' />
                                            <h3 className='text-[12px] lg:text-[15px] font-[600] mt-3'>{cat?.name}</h3>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
}

export default HomeCatSlider;