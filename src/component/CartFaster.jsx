import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../assets/kalat-removebg-preview.png"
import { getCart, removeItemFromCart } from '../store/CartSlice';
import { toast } from 'react-toastify';
import { useTranslation  } from 'react-i18next';
import "react-toastify/dist/ReactToastify.css";
import i18n from 'i18next';
import Facebook from './Facebook';
const CartFaster = ({CartShow,setCartShow}) => {
  const notifyError = () => toast.error("not send product !" );
  const notifySucces = () => toast.success("Del produect Successful ");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { carts ,error} = useSelector((state) => state.CartSlice);
  const totalCartPrice = carts?.data?.totalCartPrice

const navigate = useNavigate()
useEffect(() => {
     dispatch(getCart());  
}, [dispatch]);

  return (
    <>
  <Facebook/>
<div className={`relative z-[60] ${CartShow ? 'CartShow' : 'hideCart '}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true"> 
   
  
  <div className={`fixed inset-0 ${CartShow ? 'CartShow' : 'hideCart'} bg-gray-500 bg-opacity-75 transition-opacity`}></div>

  <div className={`fixed ${CartShow ? 'CartShow' : 'hideCart'} inset-0 overflow-hidden`}>
    <div className={`${CartShow ? 'CartShow' : 'hideCart'} absolute inset-0 overflow-hidden`}>
      <div className={`${CartShow ? 'CartShow' : 'hideCart'} pointer-events-none fixed inset-y-0 right-0 flex max-w-full `}>
    
       
    
        <div className="pointer-events-auto w-screen max-w-md">
          <div className= {`"flex  h-full flex-col overflow-y-scroll bg-white shadow-xl ${CartShow ? 'CartShow' : 'hideCart'}`}>
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">{t("Shopping cart")}</h2>
                <div className="ml-3 flex h-7 items-center">
                  <button type="button" onClick={()=> {setCartShow(!CartShow)}}  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">

                  {carts?.data?.products?.map((OneCart,index)=> (
  <li className="flex py-6 gap-[7px]" key={index + 1 }>
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img src={`${REACT_APP_API_URL}/products/`+ OneCart?.product?.imageCover}  alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center"/>
    </div>
    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <a href="#">{OneCart.product ? (i18n.language === 'ar' ? OneCart.product.titleAr : OneCart.product.title) : 'Title Not Available'}</a>
          </h3>
          <p className="ml-4">{OneCart.price} {t("EGP")}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">{OneCart.product && OneCart.product.category && OneCart.product.category.name !== null ? (i18n.language === 'ar' && OneCart.product.category.nameAr ? OneCart.product.category.nameAr : OneCart.product.category.name) : 'No Category'}</p>
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">
        <p className="text-gray-500">{t("Qty")} {OneCart.count}</p>
        <div className="flex">
          <button 
            onClick={() => {
             
              dispatch(removeItemFromCart(OneCart._id)).then(() => {
                dispatch(getCart());
                if (error) {
                  notifyError();
                } else {
                  notifySucces();
                }
              });
            }}
            type="button" className="font-medium text-indigo-600 hover:text-indigo-500">{t("Remove")}</button>
        </div>
      </div>
    </div>
  </li>
))}

           
                  
                 

                    {/* <!-- More products... --> */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>{t("Subtotal")}</p>
                <p>{totalCartPrice} {t("EGP")}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">{t("Shipping and taxes calculated at checkout")}</p>
              <div className="mt-6">
                <Link to={"/ChackOut"} onClick={()=> {setCartShow(!CartShow),fbq('track', 'InitiateCheckout');
}} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">{t("Checkout")}</Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  {t("or")}
                  <button onClick={()=> {
                     navigate("/Cart"),
                   setCartShow(!CartShow)
                  }} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {t("go to cart")}
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div></>
  )
}

export default CartFaster