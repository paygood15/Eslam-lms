import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllStatic } from "../../store/StaticSlice";
import static1 from "../../assets/static1.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrendStatic1 from "../../component/TrendStatic/TrendStatic1";
import TrendStatic2 from "../../component/TrendStatic/TrendStatic2";
import TrendStatic3 from "../../component/TrendStatic/TrendStatic3";
import TrendStatic4 from "../../component/TrendStatic/TrendStatic4";
import TrendStatic5 from "../../component/TrendStatic/TrendStatic5";
import GroupStatic1 from "../../component/GroupStatic1";
import ApexorderStatus from "../../component/ApexorderStatus";
import ApexRevenueAnalysis from "../../component/ApexRevenueAnalysis";
const AllStatic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Static } = useSelector((state) => state.StaticSlice);
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  console.log(Static);
  console.log(Static.data?.timeAnalysis?.dailyNewUsers);
  // Redirect non-admin users
  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(GetAllStatic());
    }
  }, [dispatch, navigate, token, userRole]);
  return (
    <div className="ltr p-[20px]">
      <div className="Main pb-[14px]">
        <span className="fancy gradinet-default text-[18px] max-sm:text-[40px] font-bold">
          total Counts Analysis
        </span>
      </div>
      <div className="Box-1 flex flex-col gap-6">
        <div className="Section-one max-sm:flex-col gap-[12px] flex justify-center">
          <div className="Card hover:shadow-2xl hover:duration-500 duration-500 flex flex-col items-center py-[20px] px-[70px] rounded-[12px] border border-[#cad6f2] hover:border-transparent">
            <h3 className="text-[#67748e]">ActiveUsers</h3>
            <span className="font-bold mt-[5px] text-[21px]">
              {Static.data?.totalCounts?.activeUsers}
            </span>
            <div className="bgStatic  p-[20px] rounded-[18px] shadow">
              <img src={static1} alt="" />
            </div>
          </div>
          <div className="Card hover:shadow-2xl hover:duration-500 duration-500 flex flex-col items-center py-[20px] px-[70px] rounded-[12px] border border-[#cad6f2] hover:border-transparent">
            <h3 className="text-[#67748e]">categories</h3>
            <span className="font-bold mt-[5px] text-[21px]">
              {Static.data?.totalCounts?.categories}
            </span>
            <div className="bgStatic  p-[20px] rounded-[18px] shadow">
              <img src={static1} alt="" />
            </div>
          </div>
          <div className="Card hover:shadow-2xl hover:duration-500 duration-500 flex flex-col items-center py-[20px] px-[70px] rounded-[12px] border border-[#cad6f2] hover:border-transparent">
            <h3 className="text-[#67748e]">doors</h3>
            <span className="font-bold mt-[5px] text-[21px]">
              {Static.data?.totalCounts?.doors}
            </span>
            <div className="bgStatic  p-[20px] rounded-[18px] shadow">
              <img src={static1} alt="" />
            </div>
          </div>
          <div className="Card hover:shadow-2xl hover:duration-500 duration-500 flex flex-col items-center py-[20px] px-[70px] rounded-[12px] border border-[#cad6f2] hover:border-transparent">
            <h3 className="text-[#67748e]">lessons</h3>
            <span className="font-bold mt-[5px] text-[21px]">
              {Static.data?.totalCounts?.lessons}
            </span>
            <div className="bgStatic  p-[20px] rounded-[18px] shadow">
              <img src={static1} alt="" />
            </div>
          </div>
        </div>
        <div className="Section-Two  max-sm:flex-col gap-[12px] flex justify-center">
          <div className="Card hover:shadow-2xl hover:duration-500 duration-500 flex flex-col items-center py-[20px] px-[70px] rounded-[12px] border border-[#cad6f2] hover:border-transparent">
            <h3 className="text-[#67748e]">orders</h3>
            <span className="font-bold mt-[5px] text-[21px]">
              {Static.data?.totalCounts?.orders}
            </span>
            <div className="bgStatic  p-[20px] rounded-[18px] shadow">
              <img src={static1} alt="" />
            </div>
          </div>
          <div className="Card hover:shadow-2xl hover:duration-500 duration-500 flex flex-col items-center py-[20px] px-[70px] rounded-[12px] border border-[#cad6f2] hover:border-transparent">
            <h3 className="text-[#67748e]">studentCourses</h3>
            <span className="font-bold mt-[5px] text-[21px]">
              {Static.data?.totalCounts?.studentCourses}
            </span>
            <div className="bgStatic  p-[20px] rounded-[18px] shadow">
              <img src={static1} alt="" />
            </div>
          </div>
          <div className="Card hover:shadow-2xl hover:duration-500 duration-500 flex flex-col items-center py-[20px] px-[70px] rounded-[12px] border border-[#cad6f2] hover:border-transparent">
            <h3 className="text-[#67748e]">subCategories</h3>
            <span className="font-bold mt-[5px] text-[21px]">
              {Static.data?.totalCounts?.subCategories}
            </span>
            <div className="bgStatic  p-[20px] rounded-[18px] shadow">
              <img src={static1} alt="" />
            </div>
          </div>
          <div className="Card hover:shadow-2xl hover:duration-500 duration-500 flex flex-col items-center py-[20px] px-[70px] rounded-[12px] border border-[#cad6f2] hover:border-transparent">
            <h3 className="text-[#67748e]">users</h3>
            <span className="font-bold mt-[5px] text-[21px]">
              {Static.data?.totalCounts?.users}
            </span>
            <div className="bgStatic  p-[20px] rounded-[18px] shadow">
              <img src={static1} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="Box2  mt-[50px]">
        <div className="Main ">
          <span className="fancy gradinet-default text-[18px] max-sm:text-[40px] font-bold">
            Time Analysis
          </span>
        </div>
        <div className="Data1 max-sm:flex-col justify-center flex gap-[20px]">
          <TrendStatic1
            chartTitle="dailyNewUsers"
            dailyNewUsers={Static.data?.timeAnalysis?.dailyNewUsers || []}
          />
          <TrendStatic2
            chartTitle="dailyOrders"
            dailyNewUsers={Static.data?.timeAnalysis?.dailyOrders || []}
          />
          <TrendStatic3
            chartTitle="dailyRevenue"
            dailyNewUsers={Static.data?.timeAnalysis?.dailyRevenue || []}
          />
        </div>
        <div className="Data1 max-sm:flex-col flex justify-center gap-[20px]">
          <TrendStatic4
            chartTitle="dailyUsers"
            dailyNewUsers={Static.data?.timeAnalysis?.dailyUsers || []}
          />
          <TrendStatic5
            chartTitle="monthlyCompletedLessons"
            dailyNewUsers={
              Static.data?.timeAnalysis?.monthlyCompletedLessons || []
            }
          />
        </div>
        <div className="Data1 w-full max-sm:flex-col   gap-[20px]">
          {/* <GroupStatic1 /> */}
          <div className="Main ">
            <span className="fancy gradinet-default text-[18px] max-sm:text-[40px] font-bold">
              orderStatusCounts
            </span>
          </div>
          <ApexorderStatus    chartTitle="orderStatusCounts"
            orderStatusCounts={
              Static.data?.orderStatusCounts || []
            }/>
        </div>
        <div className="Data1 w-full max-sm:flex-col   gap-[20px]">
          <div className="Main ">
            <span className="fancy gradinet-default text-[18px] max-sm:text-[40px] font-bold">
            CoursePrice

            </span>
          </div>

          <ApexRevenueAnalysis  profitPercentage={Static.data?.revenueAnalysis?.profitPercentage}
  totalCoursePrice={Static.data?.revenueAnalysis?.totalCoursePrice}
  totalRevenue={Static.data?.revenueAnalysis?.totalRevenue}  />
        </div>
        <div className="Data1 w-full max-sm:flex-col ">
          <div className="Main ">
            <span className="fancy gradinet-default text-[18px] max-sm:text-[40px] font-bold">
            Percentage

            </span>
          </div>
     <GroupStatic1    profitPercentage={Static.data?.revenueAnalysis?.profitPercentage}
  monthlyCompletedLessonChange={Static.data?.timeAnalysis?.monthlyCompletedLessonChange}
  monthlyNewUserChange={Static.data?.timeAnalysis?.monthlyNewUserChange}
  monthlyOrderChange={Static.data?.timeAnalysis?.monthlyOrderChange}
  yearlyUserChange={Static.data?.timeAnalysis?.yearlyUserChange}/>
    
        </div>
      </div>
    </div>
  );
};

export default AllStatic;
