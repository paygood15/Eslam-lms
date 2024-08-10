import img1 from "../assets/kalat-removebg-preview.png"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';


// import required modules
import { Navigation } from 'swiper/modules';

const 
swiperfirst = () => {
  return (
    <>
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
        <SwiperSlide>
        <section className="text-white body-font">
         <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 bg-black rounded-md">
           <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
             <a className="block relative h-48 rounded overflow-hidden">
             <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block" src={img1}/>
             </a>
            <div className="mt-4">
               <h3 className="text-white text-xs tracking-widest title-font mb-1">CATEGORY</h3>
               <h2 className="mb-2 title-font text-lg text-white font-medium">The Catalyzer</h2>
               <div className="flex justify-between items-center ">
               <p className="mt-1 text-white ">$16.00</p>
               <button className='inline-flex hover:scale-105 rounded-custom-dansha text-white bg-gradient-to-r from-blue-500 to-purple-500 border-0 py-2 px-3 focus:outline-none  text-lg  hover:bg-black hover:from-gray-600 transition-all'>add to cart</button>
               </div>
            </div>
           </div>
          </div>
         </div>
       </section>
        </SwiperSlide>
        <SwiperSlide>
        <section className="text-white body-font">
         <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 bg-black rounded-md">
           <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
             <a className="block relative h-48 rounded overflow-hidden">
               <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block" src={img1}/>
             </a>
            <div className="mt-4">
               <h3 className="text-white text-xs tracking-widest title-font mb-1">CATEGORY</h3>
               <h2 className="mb-2 title-font text-lg text-white font-medium">The Catalyzer</h2>
               <div className="flex justify-between items-center ">
               <p className="mt-1 text-white ">$16.00</p>
               <button className='inline-flex hover:scale-105 rounded-custom-dansha text-white bg-gradient-to-r from-blue-500 to-purple-500 border-0 py-2 px-3 focus:outline-none  text-lg  hover:bg-black hover:from-gray-600 transition-all'>add to cart</button>
               </div>
            </div>
           </div>
          </div>
         </div>
       </section>
        </SwiperSlide>
        <SwiperSlide>
        <section className="text-white body-font">
         <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 bg-black rounded-md">
           <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
             <a className="block relative h-48 rounded overflow-hidden">
               <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block" src={img1}/>
             </a>
            <div className="mt-4">
               <h3 className="text-white text-xs tracking-widest title-font mb-1">CATEGORY</h3>
               <h2 className="mb-2 title-font text-lg text-white font-medium">The Catalyzer</h2>
               <div className="flex justify-between items-center ">
               <p className="mt-1 text-white ">$16.00</p>
               <button className='inline-flex hover:scale-105 rounded-custom-dansha text-white bg-gradient-to-r from-blue-500 to-purple-500 border-0 py-2 px-3 focus:outline-none  text-lg  hover:bg-black hover:from-gray-600 transition-all'>add to cart</button>
               </div>
            </div>
           </div>
          </div>
         </div>
       </section>
        </SwiperSlide>
        <SwiperSlide>
        <section className="text-white body-font">
         <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 bg-black rounded-md">
           <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
             <a className="block relative h-48 rounded overflow-hidden">
               <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block" src={img1}/>
             </a>
            <div className="mt-4">
               <h3 className="text-white text-xs tracking-widest title-font mb-1">CATEGORY</h3>
               <h2 className="mb-2 title-font text-lg text-white font-medium">The Catalyzer</h2>
               <div className="flex justify-between items-center ">
               <p className="mt-1 text-white ">$16.00</p>
               <button className='inline-flex hover:scale-105 rounded-custom-dansha text-white bg-gradient-to-r from-blue-500 to-purple-500 border-0 py-2 px-3 focus:outline-none  text-lg  hover:bg-black hover:from-gray-600 transition-all'>add to cart</button>
               </div>
            </div>
           </div>
          </div>
         </div>
       </section>
        </SwiperSlide>
        <SwiperSlide>
        <section className="text-white body-font">
         <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 bg-black rounded-md">
           <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
             <a className="block relative h-48 rounded overflow-hidden">
               <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block" src={img1}/>
             </a>
            <div className="mt-4">
               <h3 className="text-white text-xs tracking-widest title-font mb-1">CATEGORY</h3>
               <h2 className="mb-2 title-font text-lg text-white font-medium">The Catalyzer</h2>
               <div className="flex justify-between items-center ">
               <p className="mt-1 text-white ">$16.00</p>
               <button className='inline-flex hover:scale-105 rounded-custom-dansha text-white bg-gradient-to-r from-blue-500 to-purple-500 border-0 py-2 px-3 focus:outline-none  text-lg  hover:bg-black hover:from-gray-600 transition-all'>add to cart</button>
               </div>
            </div>
           </div>
          </div>
         </div>
       </section>
        </SwiperSlide>
        <SwiperSlide>
        <section className="text-white body-font">
         <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 bg-black rounded-md">
           <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
             <a className="block relative h-48 rounded overflow-hidden">
               <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block" src={img1}/>
             </a>
            <div className="mt-4">
               <h3 className="text-white text-xs tracking-widest title-font mb-1">CATEGORY</h3>
               <h2 className="mb-2 title-font text-lg text-white font-medium">The Catalyzer</h2>
               <div className="flex justify-between items-center ">
               <p className="mt-1 text-white ">$16.00</p>
               <button className='inline-flex hover:scale-105 rounded-custom-dansha text-white bg-gradient-to-r from-blue-500 to-purple-500 border-0 py-2 px-3 focus:outline-none  text-lg  hover:bg-black hover:from-gray-600 transition-all'>add to cart</button>
               </div>
            </div>
           </div>
          </div>
         </div>
       </section>
        </SwiperSlide>
        <SwiperSlide>
        <section className="text-white body-font">
         <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 bg-black rounded-md">
           <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
             <a className="block relative h-48 rounded overflow-hidden">
               <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block" src={img1}/>
             </a>
            <div className="mt-4">
               <h3 className="text-white text-xs tracking-widest title-font mb-1">CATEGORY</h3>
               <h2 className="mb-2 title-font text-lg text-white font-medium">The Catalyzer</h2>
               <div className="flex justify-between items-center ">
               <p className="mt-1 text-white ">$16.00</p>
               <button className='inline-flex hover:scale-105 rounded-custom-dansha text-white bg-gradient-to-r from-blue-500 to-purple-500 border-0 py-2 px-3 focus:outline-none  text-lg  hover:bg-black hover:from-gray-600 transition-all'>add to cart</button>
               </div>
            </div>
           </div>
          </div>
         </div>
       </section>
        </SwiperSlide>
        <SwiperSlide>
        <section className="text-white body-font">
         <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 bg-black rounded-md">
           <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
             <a className="block relative h-48 rounded overflow-hidden">
               <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block" src={img1}/>
             </a>
            <div className="mt-4">
               <h3 className="text-white text-xs tracking-widest title-font mb-1">CATEGORY</h3>
               <h2 className="mb-2 title-font text-lg text-white font-medium">The Catalyzer</h2>
               <div className="flex justify-between items-center ">
               <p className="mt-1 text-white ">$16.00</p>
               <button className='inline-flex hover:scale-105 rounded-custom-dansha text-white bg-gradient-to-r from-blue-500 to-purple-500 border-0 py-2 px-3 focus:outline-none  text-lg  hover:bg-black hover:from-gray-600 transition-all'>add to cart</button>
               </div>
            </div>
           </div>
          </div>
         </div>
       </section>
        </SwiperSlide>
        <SwiperSlide>
        <section className="text-white body-font">
         <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 bg-black rounded-md">
           <div className="lg:w-full	md:w-full  p-4 w-full border-solid	 border rounded-xl border-b-blue-500 border-l-blue-500 border-r-purple-500 border-t-purple-500 bg-148 ">
             <a className="block relative h-48 rounded overflow-hidden">
               <img alt="ecommerce" className="object-contain max-sm:object-contain object-center w-full h-full block" src={img1}/>
             </a>
            <div className="mt-4">
               <h3 className="text-white text-xs tracking-widest title-font mb-1">CATEGORY</h3>
               <h2 className="mb-2 title-font text-lg text-white font-medium">The Catalyzer</h2>
               <div className="flex justify-between items-center ">
               <p className="mt-1 text-white ">$18.00</p>
               <button className='inline-flex hover:scale-105 rounded-custom-dansha text-white bg-gradient-to-r from-blue-500 to-purple-500 border-0 py-2 px-3 focus:outline-none  text-lg  hover:bg-black hover:from-gray-600 transition-all'>add to cart</button>
               </div>
            </div>
           </div>
          </div>
         </div>
       </section>
        </SwiperSlide>
        <div className="swiper-button-prev" />
    <div className="swiper-button-next" />
      </Swiper>
    </>
  );
}
export default swiperfirst