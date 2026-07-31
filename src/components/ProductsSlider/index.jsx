import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Productitem from '../Productitem';
import { Autoplay, Navigation } from 'swiper/modules';
import { MyContext } from '../../App';
const ProductsSlider = (props) => {
  const context = useContext(MyContext)

  return (
    <div className="productsSlider py-0 lg:py-3">
      <Swiper slidesPerView={props.items}
        spaceBetween={10}
        navigation={context?.windowWidth < 992 ? false : true}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          250: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          330: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper">
        {
          props?.data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Productitem item={item} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  );
}

export default ProductsSlider;