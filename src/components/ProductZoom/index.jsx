import React, { useContext, useRef, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { MyContext } from '../../App';

const ProductZoom = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  }
  const context = useContext(MyContext)
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="slider w-full lg:w-[15%] order-2 lg:order-1">
          <Swiper
            ref={zoomSliderSml}
            spaceBetween={context?.windowWidth>992?0:10}
            direction={context?.windowWidth>992?'vertical':'horizontal'}
            navigation={context?.windowWidth>992?true:false}
            modules={[Navigation]}
            slidesPerView={4}
            className={`
              zoomProductSliderThumb !h-auto lg:!h-[500px]
               !overflow-hidden ${props?.images?.length > 5 && 'space'}
             zoomProductSliderThumb !h-[400px] !overflow-hidden`}>

            {
              props?.images?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className={`item rounded-md overflow-hidden cursor-pointer group h-[100%]
                     ${slideIndex === index ? 'opacity-100' : 'opacity-30'}`}
                      onClick={() => goto(index)}>
                      <img src={item} className='w-full transition-all group-hover:scale-105' />
                    </div>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
        <div className="zoomContainer w-full lg:w-[85%] 
        !h-auto lg:!h-[500px] !overflow-hidden rounded-md order-1 lg:order-2">
          <Swiper
            ref={zoomSliderBig}
            spaceBetween={0}
            navigation={false}
            slidesPerView={1}
          >
            {
              props?.images?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <InnerImageZoom zoomType="hover" zoomScale={1} src={item} />
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </div>
      </div>
    </>
  );
}
export default ProductZoom;