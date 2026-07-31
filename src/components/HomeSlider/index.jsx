import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
import { MyContext } from '../../App';
const HomeSlider = (props) => {
  const context = useContext(MyContext)

  return (
    <div className="homeSlider pt-2 pb-2 lg:pt-5 lg:pb-5 z-[99]">
      <div className="container-fluid">
        <Swiper
          spaceBetween={10}
          navigation={context?.windowWidth<992?false:true}
          modules={[Navigation, Autoplay]}
          loop
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="sliderHome"
        >

          {
            props?.data?.length !== 0 && props?.data?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="item rounded-[10px] !-ml-5 !mr-5 overflow-hidden">
                    <img src={item.images[0]} />
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    </div>
  );
}

export default HomeSlider;