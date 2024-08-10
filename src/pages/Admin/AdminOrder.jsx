import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllOrders, deleteOrder } from '../../store/OrederSlice';
import { toast } from 'react-toastify';
import Pagination from '../../utils/pagenation';
import 'react-toastify/dist/ReactToastify.css';
// import { UpdateOrderToDeliver, UpdateOrderToPaid, UpdateOrderToSeen } from '../../store/CreateOrder';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import Loading from '../../utils/Loading';

const AdminOrder = () => {
  // const { Orders, loading } = useSelector((state) => state.OrederSlice);
  const userToken = localStorage.getItem('userToken');
  const userRole = localStorage.getItem('userRole');
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const page = 0;

  const press = (page) => {
    dispatch(getAllOrders(page));
  };

  // useEffect(() => {
  //   if (userToken && userRole === 'admin') {
  //     dispatch(getAllOrders());
  //     dispatch(UpdateOrderToSeen());
  //   }
  // }, [dispatch, userToken, userRole]);

  useEffect(() => {
    i18n.language === 'ar' ? (document.body.dir = 'ltr') : (document.body.dir = 'ltr');
  }, [i18n.language]);

  if (!userToken || userRole !== 'admin') {
    window.location.href = '/';
    return null;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container my-12 mx-auto px-4 md:px-6 lg:px-12">
          <section className="mb-20 text-gray-800">
            <div className="block rounded-lg shadow-lg bg-white">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full mb-0">
                        <thead className="border-b bg-gray-50 rounded-t-lg">
                          <tr>
                            <th scope="col" className="rounded-tl-lg text-sm font-medium px-6 py-4">NAME</th>
                            <th scope="col" className="text-sm font-medium px-6 py-4">Address</th>
                            <th scope="col" className="text-sm font-medium px-6 py-4">Product</th>
                            <th scope="col" className="text-sm font-medium px-6 py-4">Count</th>
                            <th scope="col" className="text-sm font-medium px-6 py-4">Price</th>
                            <th scope="col" className="text-sm font-medium px-6 py-4">Total Order Price</th>
                            <th scope="col" className="text-sm font-medium px-6 py-4">Created At</th>
                            <th scope="col" className="text-sm font-medium px-6 py-4">Pay Status</th>
                            <th scope="col" className="text-sm font-medium px-6 py-4">Deliver Status</th>
                            <th scope="col" className="text-sm font-medium px-6 py-4">Delete Order</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Orders?.data?.map((order, index) => (
                            <tr className="border-b" key={index}>
                              <th scope="row" className="text-sm font-normal px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-row items-center">
                                  <div className="ml-4">
                                    <p className="mb-0.5 font-medium">{order.user?.name}</p>
                                    <p className="mb-0.5 text-gray-500">{order.user?.email}</p>
                                    <p className="mb-0.5 text-gray-500">{order.user?.phone}</p>
                                  </div>
                                </div>
                              </th>
                              <th scope="row" className="text-sm font-normal px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-row items-center">
                                  <div className="ml-4">
                                    <p className="mb-0.5 font-medium">{order.shippingAddress?.city}</p>
                                    <p className="mb-0.5 text-gray-500">{order.shippingAddress?.details}</p>
                                    <p className="mb-0.5 text-gray-500">{order.shippingAddress?.phone}</p>
                                  </div>
                                </div>
                              </th>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                {order.cartItems.map((one, idx) => (
                                  <p key={idx} className="mb-0.5 text-gray-500">
                                    {one?.product?.title || 'Unknown Title'}
                                  </p>
                                ))}
                              </td>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                {order.cartItems.map((one, idx) => (
                                  <p key={idx} className="mb-0.5 text-blue-800">{one?.count}</p>
                                ))}
                              </td>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                {order.cartItems.map((one, idx) => (
                                  <p key={idx} className="mb-0.5 text-black font-bold">
                                    {one?.price} {t('EGP')}
                                  </p>
                                ))}
                              </td>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <p className="mb-0.5 text-black font-bold">{order.totalOrderPrice} {t('EGP')}</p>
                              </td>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <p className="mb-0.5 text-gray-500">{order.createdAt}</p>
                              </td>
                              <td className="align-middle flex flex-col gap-3 text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span
                                  onClick={() => {
                                    dispatch(UpdateOrderToPaid(order._id))
                                      .then(() => {
                                        toast.success(
                                          `${order.isPaid ? 'تحويلها لعدم اتمام الدفع بنجاح' : 'تم تحويلها لتم الدفع بنجاح'}`
                                        );
                                        dispatch(getAllOrders());
                                      })
                                      .catch((error) => {
                                        toast.error('حدث خطأ أثناء معالجة الطلب');
                                      });
                                    dispatch(getAllOrders());
                                  }}
                                  className="text-xs p-3 cursor-pointer leading-none text-center whitespace-nowrap align-baseline font-medium bg-green-200 text-green-600 rounded-full"
                                >
                                  Change Pay Status
                                </span>
                                <span
                                  className={`${order.isPaid ? 'text-blue-500' : 'text-red-500'} text-xs p-3 leading-none text-center font-bold text-[15px] whitespace-nowrap align-baseline bg-green-200 rounded-full`}
                                >
                                  {order.isPaid ? 'isPaid' : 'not paid'}
                                </span>
                              </td>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <div className="flex flex-col gap-3">
                                  <span
                                    onClick={() => {
                                      dispatch(UpdateOrderToDeliver(order._id))
                                        .then(() => {
                                          toast.success(
                                            `${order.isDelivered ? 'تحويلها لعدم اتمام التسليم بنجاح' : 'تم تحويلها لتم التسليم بنجاح'}`
                                          );
                                          dispatch(getAllOrders());
                                        })
                                        .catch((error) => {
                                          toast.error('حدث خطأ أثناء معالجة الطلب');
                                        });
                                      dispatch(getAllOrders());
                                    }}
                                    className="text-xs p-3 cursor-pointer leading-none text-center whitespace-nowrap align-baseline font-medium bg-green-200 text-green-600 rounded-full"
                                  >
                                    Change Deliver Status
                                  </span>
                                  <span
                                    className={`${order.isDelivered ? 'text-blue-500' : 'text-red-500'} text-xs p-3 font-bold text-[15px] leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full`}
                                  >
                                    {order.isDelivered ? 'isDelivered' : 'not Delivered'}
                                  </span>
                                </div>
                              </td>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <button
                                  onClick={() => {
                                    dispatch(deleteOrder(order._id)).then(() => {
                                      toast.success('تم حذف المنتج بنجاح');
                                    });
                                    dispatch(getAllOrders());
                                  }}
                                  className="items-center justify-center flex w-full text-[24px] h-6 bg-[#BBF7D0] transition-all rounded-full hover:text-red-600"
                                >
                                  x
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {Orders?.paginationResult?.numberOfPages <= 1 ? (
              ''
            ) : (
              <Pagination numberOfPages={Orders?.paginationResult?.numberOfPages} currentPage={page} onPageChange={press} />
            )}
          </section>
        </div>
      )}
    </>
  );
};

export default AdminOrder;
