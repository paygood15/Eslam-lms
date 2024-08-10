
import img1 from "../assets/client-logo.png"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';


// import required modules
import { Navigation } from 'swiper/modules';

const SwiperSecound = () => {
  return (
    <>
      <Swiper 
      
       breakpoints={{
        500: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        984: {
          slidesPerView: 4,
          spaceBetween: 10
        }
      }}
        loop={true}
        slidesPerView={3}
        spaceBetween={30}
        navigation={{
            nextEl: '.swiper-button-next', // Specify the element for the next button
            prevEl: '.swiper-button-prev', // Specify the element for the previous button
          }}
        pagination={{
            clickable: true,
          }}
        //   autoplay={{
        //     delay: 1000,
    
        //     disableOnInteraction: false,
        //   }}
           modules={[Pagination, Autoplay,Navigation]}

       className="mySwiper pt-12 pb-12  bg-black">
        <SwiperSlide className="flex justify-center items-center" >
          <img src={img1} alt="" />
        </SwiperSlide>
           <SwiperSlide className="flex justify-center items-center" >
          <img src={img1} alt="" />
        </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center" >
          <img src={img1} alt="" />
        </SwiperSlide>
           <SwiperSlide className="flex justify-center items-center" >
          <img src={img1} alt="" />
        </SwiperSlide>
         <SwiperSlide className="flex justify-center items-center" >
          <img src={img1} alt="" />
        </SwiperSlide>
           <SwiperSlide className="flex justify-center items-center" >
          <img src={img1} alt="" />
        </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center" >
          <img src={img1} alt="" />
        </SwiperSlide>
           <SwiperSlide className="flex justify-center items-center" >
          <img src={img1} alt="" />
        </SwiperSlide>
           <SwiperSlide className="flex justify-center items-center" >
          <img src={img1} alt="" />
        </SwiperSlide>
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
      </Swiper>
    </>
  );
}
export default SwiperSecound