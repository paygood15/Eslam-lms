import img1 from "../assets/kalat-removebg-preview.png"

import { Swiper, SwiperSlide } from 'swiper/react';

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getAllCategories} from "../store/CategorySlice"
import { Link } from "react-router-dom";

import React, { useState } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import i18n from 'i18next'
import LoadingTwo from "../utils/LoadingTwo";
// import required modules
import { Navigation } from 'swiper/modules';

const CategortySwiper = () => {
  const [direction, setDirection] = useState('ltr');
    const dispatch = useDispatch();
    const { categories,loadingCategories } = useSelector((state) => state.CategorySlice);


useEffect(() => {
       dispatch(getAllCategories());  
  }, [dispatch]);

  return (
    <>
     <div dir={direction}>
     <Swiper 
      
      breakpoints={{
       200: {
         slidesPerView: 1,
         spaceBetween: 10
       },
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

      className="mySwiper bg-black">
   
        {categories?.data?.map((category,index)=> (
   <SwiperSlide key={index + 1 } >

  {loadingCategories? <LoadingTwo/>: <section className="text-white body-font ">
    <div  className="container px-5 py-12 mx-auto">
     <div className="flex flex-wrap -m-4 bg-black rounded-md">
      <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
        <Link to={`/OneCategory/${category._id}`} className="block relative h-48 rounded overflow-hidden">
        <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block"  src={category.image} />
        </Link>
    
       
       <div className="mt-4">
       <Link to={`/OneCategory/${category._id}`}>
          <h3 className="text-white text-xs tracking-widest text-center title-font mb-1">CATEGORY</h3>
          <h2 className="mb-2 title-font text-lg text-white  text-center font-medium">
          {i18n.language === 'ar'? category.nameAr:category.name}
            </h2>
          </Link>
       </div>
      </div>
     </div>
    </div>
  </section>}
   </SwiperSlide>
        ))}
  
       <div className="swiper-button-prev" />
   <div className="swiper-button-next" />
     </Swiper>
     </div>
    </>
  );
}
export default CategortySwiper