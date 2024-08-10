import React from 'react'
import { Link } from 'react-router-dom'
// import {getAllCategories} from "../store/CategorySlice"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import OneCategory from '../pages/OneCategory';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
const Footer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const { categories } = useSelector((state) => state.CategorySlice);

// const LastFourItems = categories?.data;



// useEffect(() => {
//      dispatch(getAllCategories());  
// }, [dispatch]);
  return (
   <>
     <footer className="bg-black cssgo  body-font">
   <div className=" px-5 py-5 text-center ">
     <h3 className='text-white'>تم صنع هذه المنصة بهدف تهيئة الطالب لـ كامل جوانب الثانوية العامة و ما بعدها
</h3>
<h3 className='text-white'>
Developed By
Webix
All Copy Rights Reserved @2024
</h3>
   </div>
   <div className="bg-black  text-white">
     <div className="container mx-auto py-4 px-5 flex gap-2 justify-center items-center">
       <p className=" text-purple-500 text-sm text-center ">© 2020 Fo2sh —
         <Link to={"https://www.facebook.com/WebixDevelops"} className="text-blue-500" href="https://twitter.com/knyttneve" rel="noopener noreferrer"  target="_blank">@build by webix</Link>
       </p>
       <span className="inline-flex justify-center ">
         <Link to={"https://www.facebook.com"} className="text-blue-500">
           <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
             <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
           </svg>
         </Link>
    
       </span>
     </div>
   </div>
 </footer>
   </>
  )
}

export default Footer
