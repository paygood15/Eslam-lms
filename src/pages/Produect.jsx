import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cardCover from "../assets/line1.jpg";
import { fetchCourseById, fetchCourses, GetOrderByCourse } from "../store/CourseAdminSlice";
import { placeOrder } from "../store/OrderSlice1";
import Accordion from "../component/According";
import Facebook from "../component/Facebook";

const Product = () => {
  const navigate = useNavigate();
  const { course, status, courses, initCourse } = useSelector((state) => state.CourseAdminSlice);
  const { id } = useParams();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("Token");
  const courseData = initCourse?.data?.[0];
  console.log(courseData);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(GetOrderByCourse(id));
    dispatch(fetchCourseById(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAccessCodeChange = (e) => {
    setAccessCode(e.target.value);
  };

  const handlePlaceOrder = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const orderData = {
        subCategory: course.data._id,
        accessCode, // Adding access code from the input field
      };
      dispatch(placeOrder(orderData))
        .then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            toast.success("تم حجز الكورس بنجاح. برجاء انتظار التواصل");
          } else {
            toast.error("حدث خطأ أثناء حجز الكورس");
          }
        })
        .catch(() => {
          toast.error("حدث خطأ غير متوقع");
        });
    } else {
      toast.error("من فضلك قم بتسجيل الدخول أولا");
    }
  };

  const renderCourseDetails = () => {
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    // if (status === "failed") {
    //   return <p>Error loading course data.</p>;
    // }

    if (course) {
      return (
        <>
          <div className="One-Course flex p-[20px] gap-[20px] max-sm:flex-col-reverse max-sm:items-center">
            <div className="Data-Course">
              <div className="Img-Cover">
                <img src={cardCover} alt="Course Cover" />
                {/* course.data.image || */}
              </div>
              <div className="Content BoxShadwoCourse rounded-[9px] p-[15px] m-[15px]">
                <h1 className="text-black font-bold text-[28px] py-[20px]">
                  {course.data.title}
                </h1>
                <p className="py-[4px] text-[#868a91]">
                  {course.data.description}
                </p>
              </div>
            </div>
            <div className="Price-Course h-fit BoxShadwoBlue p-[13px] rounded-[16px] w-[60%] max-sm:w-[100%]">
              <div className="Cover-Img">
                <img src={cardCover} alt="Course Cover" />
                {/* course.data.image  */}
              </div>
              <div className="Content mt-[12px]">
                <div className="Price text-center">
                  <span className="text-white bg-[#2563EB] py-[4px] px-[28px] rounded-[25px] text-[19px] font-bold ml-[-21px]">
                    {course.data.price}
                  </span>
                  <span className="bg-[#ffce35] py-[4px] px-[21px] text-[19px] rounded-[25px] text-white">
                    جنيهًا
                  </span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="flex m-auto mt-[15px] bg-[#F43F5E] text-white py-[11px] px-[60px] rounded-[4px]"
                >
                  {courseData?.status || "اشترك الان"}
                </button>

                <button
                  onClick={toggleModal}
                  className="flex m-auto mt-[15px] bg-[#2563EB] text-white py-[11px] px-[60px] rounded-[4px]"
                >
                  كود الحصة
                </button>

                {isModalOpen && (
                  <div
                    id="popup-modal"
                    className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
                  >
                    <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow">
                      <button
                        type="button"
                        onClick={toggleModal}
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                      <div className="p-4 text-center">
                        <svg
                          className="mx-auto mb-4 text-gray-400 w-12 h-12"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">
                          الدخول عن طريق كود الحصة
                        </h3>
                        <div className="container-Login">
                          <input
                            placeholder="كود الحصة"
                            className="input bg-transparent focus:outline-none"
                            value={accessCode}
                            onChange={handleAccessCodeChange}
                            required
                          />
                        </div>

                        <button
                          onClick={handlePlaceOrder}
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                          دخول الحصة
                        </button>
                        <button
                          onClick={toggleModal}
                          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100"
                        >
                          الرجوع!
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="Last-Content flex flex-col gap-[15px] mt-[22px]">
                  <div className="Top border-b-[1px] border-solid border-b-[#D1D5DB] flex justify-between py-[10px]">
                    <div>المحتوى</div>
                    <div className="text-[#868a91]">
                      + {course.data?.totalHours} ساعة
                    </div>
                  </div>
                  <div className="Bottom flex justify-between">
                    <div>اجمالي الاسئلة</div>
                    <div className="text-[#868a91]">
                      + {course.data?.totalQuestions} سؤال
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Course-Content">
            <div className="p-1 bg-gray-200 rounded-lg">
              <div className="d">
                <span className="fancy gradinet-default text-[55px] max-sm:text-[40px] font-bold">
                  محتوى الكورس
                </span>
              </div>
              <Accordion courseOne={course.data.doors} />
            </div>
          </div>
        </>
      );
    }
  };

  return <>{renderCourseDetails()}</>;
};

export default Product;
