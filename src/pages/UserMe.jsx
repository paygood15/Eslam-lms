import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getStudentExamStatistics,getStudentExamHistory } from "../store/ExamSlice1";
import  {getLoggedUserData} from "../store/UserSliceAdmin"
import {fetchLoggedUserCourses} from "../store/CourseStdSlice"
import  {fetchStudentLessonStatistics} from "../store/LessonSlice"
import { fetchCourseDetails } from "../store/CourseStdSlice";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import ApexCharts1 from "../component/ApexCharts1";
import { Link } from "react-router-dom";
import Pagination from "../utils/pagenation";
import { useState } from "react";

import cardCover from "../assets/del100.jpg"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DataTAble1 from "../component/DataTAble1"
import usercover from "../assets/carduser.svg"
const UserMe = () => {

  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.UserSliceAdmin);
  const { statistics,studentExams} = useSelector((state) => state.ExamSlice1);
  const { studentStatistics } = useSelector((state) => state.LessonSlice);
  const courseDetails = useSelector((state) => state.CourseStdSlice.courseDetails);
  const { courses } = useSelector((state) => state.CourseStdSlice);
console.log(courses);
console.log(statistics?.averageScore);
console.log(statistics);
console.log(user);
console.log(studentStatistics?.statistics);
console.log(studentExams);
console.log(courseDetails);
  useEffect(() => {
    dispatch(getStudentExamStatistics());
    dispatch(getLoggedUserData());
    dispatch(fetchStudentLessonStatistics());
    dispatch(getStudentExamHistory());
    dispatch(fetchCourseDetails());
    dispatch(fetchLoggedUserCourses());
    

  }, [dispatch]);
  {
    document.body.style.backgroundColor = '#F3F4F6';
  }

  return (
    <>
    <div className="Body-user p-[20px] good-shadwo m-[20px] bg-white rounded-[12px]">
    <div className="Price flex items-center sssadwo w-fit m-auto rounded-[10px] good-shadwotext-center">
            <div className="text-white text-[32px] bg-[#2563EB] py-[4px] px-[28px] rounded-[25px] font-bold ml-[-21px]">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--carbon" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="none" d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5"></path><path fill="currentColor" d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.9 13.9 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3q.418.457.87.87q.14.124.28.242q.48.415.99.782c.044.03.084.069.128.1v-.012a13.9 13.9 0 0 0 16 0v.012c.044-.031.083-.07.128-.1q.51-.368.99-.782q.14-.119.28-.242q.451-.413.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0"></path></svg>
            </div> 
            
            <span className="bg-white py-[4px] px-[21px] text-[19px] rounded-[25px] text-black">ملف المستخدم</span>
            
          </div>
       <div className="ContaonerTab">
       <Tabs className="flex gap-[40px] my-[25px] mx-[5px] md:flex-row sm:flex-col max-sm:flex-col ">
    <TabList className="flex gap-[9px] flex-col">
      <Tab className="border-none py-[7px] px-[33px] rounded-[5px] user-Shadwo cursor-pointer">ملف المستخدم</Tab>
      <Tab className="border-none py-[7px] px-[33px] rounded-[5px] user-Shadwo cursor-pointer">كورساتي</Tab>
      <Tab className="border-none py-[7px] px-[33px] rounded-[5px] user-Shadwo cursor-pointer">الآمان و تاريخ تسجيل الدخول</Tab>
      <Tab className="border-none py-[7px] px-[33px] rounded-[5px] user-Shadwo cursor-pointer">نتائج الامتحانات</Tab>
    </TabList>

    <TabPanel>
     <div className="First-Section lg:flex-row md:flex-col sm:flex-col flex gap-[15px] max-sm:flex-col sm:items-center max-sm:items-center">
       <div className="cover-img">
      <img className="w-[150px]" src={usercover} alt="usercover" />
       </div>
       <div className="content">
        <h3 className="text-[34px]">{user?.data?.name}</h3>
        <div className="w-[450px] mt-[11px] h-[3px] bg-[#6b728054] rounded-lg smooth max-sm:w-full "></div>
        <div className="ph mt-[30px] flex items-center gap-1">
        <span class="flex-center-both trasnform text-cyan-500 -translate-y-px"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ant-design" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" fill-opacity=".15" d="M721.7 184.9L610.9 295.8l120.8 120.7l-8 21.6A481.29 481.29 0 0 1 438 723.9l-21.6 8l-.9-.9l-119.8-120l-110.8 110.9l104.5 104.5c10.8 10.7 26 15.7 40.8 13.2c117.9-19.5 235.4-82.9 330.9-178.4s158.9-213.1 178.4-331c2.5-14.8-2.5-30-13.3-40.8z"></path><path fill="currentColor" d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9c0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.5 405.5 0 0 1-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 0 0-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9c0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9c6.5 0 12.8-.5 19.2-1.6c132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4m-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9L295.7 611l119.8 120l.9.9l21.6-8a481.29 481.29 0 0 0 285.7-285.8l8-21.6l-120.8-120.7l110.8-110.9l104.5 104.5c10.8 10.8 15.8 26 13.3 40.8"></path></svg></span>
        <p>{user?.data?.phone}</p>
        </div>
  <div className="Em flex items-center gap-1">
  <svg className="text-yellow-400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="text-yellow-400 iconify iconify--ic" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8s8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47c.65.89 1.77 1.47 2.96 1.47c1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10m0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3"></path></svg>
  <p>{user?.data?.email}</p>
  </div>
      
       </div>
    
     </div>
     <div className="PartTwo ">
     <div className="Analysis mt-[30px]">
       <div className="m-auto w-[500px] mt-[11px] h-[5px]  max-sm:w-full bg-[#B4E9F2] rounded-lg smooth "></div>

        <div className="mt-[20px] Head flex items-center justify-center">
        <span class="flex-center-both text-[40px] trasnform font-big text-cyan-500 -translate-y-px"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--arcticons" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m6.255 14.724l10.12-.333L23.62 2.28l1.551-.042l-5.53 16.198l-9.156.019Zm4.155 22.727l2.719-9.755L3.75 17.153l.425-1.493l13.793 10.135l-2.73 8.74Zm21.918 3.319l-8.585-5.372l-12.768 6.006l-1.311-.83l13.628-10.356l7.609 5.094ZM41.8 20.15l-7.653 6.632l1.997 13.97l-1.178 1.01l-5.903-16.067l7.101-5.78ZM26.323 4.635l3.585 9.471l13.8 2.943l.542 1.454H27.135l-2.977-8.659Z"></path></svg></span>
        <h2 className="text-[30px] text-center">احصائيات <span className="text-[#FB7185] text-[30px] mt-[10px]">كورساتك</span></h2>
        <span class="flex-center-both text-[40px] trasnform font-big text-cyan-500 -translate-y-px"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--arcticons" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m6.255 14.724l10.12-.333L23.62 2.28l1.551-.042l-5.53 16.198l-9.156.019Zm4.155 22.727l2.719-9.755L3.75 17.153l.425-1.493l13.793 10.135l-2.73 8.74Zm21.918 3.319l-8.585-5.372l-12.768 6.006l-1.311-.83l13.628-10.356l7.609 5.094ZM41.8 20.15l-7.653 6.632l1.997 13.97l-1.178 1.01l-5.903-16.067l7.101-5.78ZM26.323 4.635l3.585 9.471l13.8 2.943l.542 1.454H27.135l-2.977-8.659Z"></path></svg></span>
        </div>
       </div>
     </div>
      <div className="Count flex lg:flex-row md:flex-col sm:flex-col max-sm:flex-col" >
    <div className="one flex items-center justify-center flex-col">
    <ApexCharts1 color='#F43F5E'  label="الفيديوهات" width="250" series={studentStatistics?.statistics?.percentageSeen}/>
    <div className="text-bold">عدد الفيديوهات شوفتها</div>
    <div className="py-[2px] rounded-[18px] pl-[12px] mt-[4px] border-[3px] border-solid border-[#F43F5E]"><span className="bg-[#F43F5E] font-bold py-[6px] px-[13px] rounded-[15px] text-white">{studentStatistics?.statistics?.seenLessonsCount}</span>من <span className="font-bold">{studentStatistics?.statistics?.totalLessonsCount}</span></div>
    </div>
    <div className="one flex items-center justify-center flex-col">
      <ApexCharts1 color='#06B6D4' label="الاختبارات" width="250" series={statistics?.percentageFinished}/>
      <div className="text-bold">عدد الاختبارات اللي خلصتها</div>
    <div className="py-[2px] rounded-[18px] pl-[12px] mt-[4px] border-[3px] border-solid border-[#06B6D4]"><span className="bg-[#06B6D4] font-bold py-[6px] px-[13px] rounded-[15px] text-white">{statistics?.totalFinished}</span>من <span className="font-bold">{statistics?.totalExams}</span></div>
      </div>
      <div className="one flex items-center justify-center flex-col">
      <ApexCharts1 color='#A855F7'  label="النتائج" width="250" series={statistics?.averageScore}/>
      <div className="text-bold">متوسط النتائج اللي جبتها</div>
      </div>
      </div>
      <div className="lastContent mt-[35px]">
      <div className="m-auto w-[500px] mt-[11px] h-[5px] bg-[#B4E9F2]  max-sm:w-full rounded-lg smooth "></div>

<div className="mt-[20px] Head flex items-center justify-center">
<span class="flex-center-both text-[40px] trasnform font-big text-cyan-500 -translate-y-px"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--arcticons" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m6.255 14.724l10.12-.333L23.62 2.28l1.551-.042l-5.53 16.198l-9.156.019Zm4.155 22.727l2.719-9.755L3.75 17.153l.425-1.493l13.793 10.135l-2.73 8.74Zm21.918 3.319l-8.585-5.372l-12.768 6.006l-1.311-.83l13.628-10.356l7.609 5.094ZM41.8 20.15l-7.653 6.632l1.997 13.97l-1.178 1.01l-5.903-16.067l7.101-5.78ZM26.323 4.635l3.585 9.471l13.8 2.943l.542 1.454H27.135l-2.977-8.659Z"></path></svg></span>
<h2 className="text-[30px] text-center">احصائياتك علي <span className="text-[#FB7185] text-[30px] mt-[10px]">المنصة</span></h2>
<span class="flex-center-both text-[40px] trasnform font-big text-cyan-500 -translate-y-px"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--arcticons" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m6.255 14.724l10.12-.333L23.62 2.28l1.551-.042l-5.53 16.198l-9.156.019Zm4.155 22.727l2.719-9.755L3.75 17.153l.425-1.493l13.793 10.135l-2.73 8.74Zm21.918 3.319l-8.585-5.372l-12.768 6.006l-1.311-.83l13.628-10.356l7.609 5.094ZM41.8 20.15l-7.653 6.632l1.997 13.97l-1.178 1.01l-5.903-16.067l7.101-5.78ZM26.323 4.635l3.585 9.471l13.8 2.943l.542 1.454H27.135l-2.977-8.659Z"></path></svg></span>
</div>
 <div className="Data flex flex-col ">
  <div className="OneData flex items-center justify-around mt-[20px]">
    <h3 className="text-[22px] font-bold ">إجمالي نسبة فتح المحاضرات علي الموقع</h3>
    <span className="border-[4px] py-[4px] px-[7px] border-[#F43F5E] border-solid rounded-[58px]">{studentStatistics?.statistics?.percentageSeen}</span>
  </div>
  <div className="w-[450px] m-auto mt-[15px] h-[3px] bg-[#F3F4F6] rounded-lg smooth max-sm:w-full "></div>

  <div className="OneData flex items-center justify-around mt-[20px]">
    <h3 className="text-[22px] font-bold "> عدد مرات مشاهدة الفيديوهات علي الموقع</h3>
    <span className="border-[4px] py-[4px] px-[7px] border-[#EAB308] border-solid rounded-[58px]">{studentStatistics?.statistics?.seenLessonsCount}</span>

  </div>
  <div className="w-[450px] m-auto mt-[15px] h-[3px] bg-[#F3F4F6] rounded-lg smooth max-sm:w-full "></div>
  <div className="w-[450px] m-auto mt-[15px] h-[3px] bg-[#F3F4F6] rounded-lg smooth max-sm:w-full "></div>

  <div className="OneData flex items-center justify-around mt-[20px]">
    <h3 className="text-[22px] font-bold ">اجمالي عدد مرات فتح الاختبار</h3>
    <span className="border-[4px] py-[4px] px-[7px] border-[#06B6D4] border-solid rounded-[58px]">{statistics?.totalAttempts}</span>
  </div>
  <div className="w-[450px] m-auto mt-[15px] h-[3px] bg-[#F3F4F6] rounded-lg smooth max-sm:w-full "></div>

  <div className="OneData flex items-center justify-around mt-[20px]">
    <h3 className="text-[22px] font-bold ">اجمالي عدد مرات إنهاء الاختبارات</h3>
    <span className="border-[4px] py-[4px] px-[7px] border-[#A855F7] border-solid rounded-[58px]">{statistics?.totalFinished}</span>

  </div>
  <div className="w-[450px] m-auto mt-[15px] h-[3px] bg-[#F3F4F6] rounded-lg smooth max-sm:w-full "></div>
  <div className="w-[450px] m-auto mt-[15px] h-[3px] bg-[#F3F4F6] rounded-lg smooth max-sm:w-full "></div>

 </div>
      </div>
    </TabPanel>
    <TabPanel className="Content flexImportant w-[85%]" >
      <div className="Content ">
      <div className="Card py-5 grid gap-6 grid-cols-2 max-sm:grid-cols-1">
            {courses?.data?.courses.map((course) => (
              <NavLink to={`/Course/${course._id}`} className={"w-[300px]"} key={course._id}>
                <div className="Content hover:scale-100">
                  <img className="rounded-xl" src={cardCover} alt="cardCover" />
                  <div className="Card-Content flex-col bg-white relative w-[90%] py-3 px-5 shadow-2xl rounded-xl flex right-[14px] bottom-[38px] z-10">
                    <div className="FirstTopCard flex gap-[10px]">
                      <div className="RightCard flex flex-col gap-2">
                        <h1 className="text-black text-[21px] font-bold">{course.title}</h1>
                        <div className="w-full h-[3px] bg-[#2DD4BF] rounded-lg smooth "></div>
                        <p className="text-[#6B7280]">{course.title}</p>
                      </div>
                      <div className="LeftCard flex justify-center flex-col w-[60%] gap-[6px]">
                        <button className="hover:bg-[#2DD4BF] hover:text-white duration-300 border-[2px] p-[1px] border-solid border-[#2DD4BF] text-[15px] rounded-xl">
                          الدخول للكورس
                        </button>
                     
                      </div>
                    </div>
                    <div className="SecondBottonCard p-3">
                      <div className="w-full h-[1px] bg-[#6b728054] rounded-lg smooth "></div>
                     
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
      </div>
     </TabPanel>
    <TabPanel className="w-[75%] flex max-sm:flex max-sm:w-full max-sm:text-center max-sm:justify-center">
     <div className="Content  text-center">
    {/* <div className="First flex flex-col items-center justify-center">
    <div className="first flex flex-col gap-[10px]">
        <h3>عدد مرات تسجيل الخروج خلال اليوم</h3>
        <h3 className="bg-[#F43F5E] p-[5px] rounded-[13px]">لم يتم تسجيل الخروج بواسطة المستخدم اليوم</h3>
      </div>
      <div className="Secound flex flex-col gap-[10px] mt-[12px]">
        <h3>عدد مرات تسجيل الخروج خلال الاسبوع</h3>
        <h3 className="bg-[#F43F5E] p-[6px] rounded-[13px]">لم يتم تسجيل الخروج بواسطة المستخدم هذا الاسبوع</h3>
      </div>
    </div> */}
      <div className="cen ">
      <div className="ltr mt-[18px] overflow-x-auto p-[7px] border border-[#E2E8F0] rounded-[14px]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left text-[#4A5568]">Name</th>
              <th className="p-2 text-left text-[#4A5568]">Email</th>
              <th className="p-2 text-left text-[#4A5568]">Governorate</th>
              <th className="p-2 text-left text-[#4A5568]">Phone</th>
              <th className="p-2 text-left text-[#4A5568]">Parent Phone</th>
              <th className="p-2 text-left text-[#4A5568]">Role</th>
              <th className="p-2 text-left text-[#4A5568]">Login Attempts</th>
              <th className="p-2 text-left text-[#4A5568]">Logout Attempts</th>
             
              <th className="p-2 text-left text-[#4A5568]">Created At</th>
            </tr>
          </thead>
          <tbody>
       
              <tr
            
              >
                <td className="border-t border-b p-2 text-[#4A5568]">{user?.data?.name}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user?.data?.email}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user?.data?.governorate}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user?.data?.phone}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user?.data?.parentPhone}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user?.data?.loginAttempts}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user?.data?.logoutAttempts}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {new Date(user?.data?.logoutAttempts).toLocaleDateString()}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {new Date(user?.data?.createdAt).toLocaleDateString()}
                </td>
              </tr>
          
          </tbody>
        </table>
      </div>
      </div>
     </div>
    </TabPanel>
    <TabPanel className="w-[70%] flex max-sm:flex max-sm:w-full max-sm:text-center max-sm:justify-center">
    <div className="cen">
    <div className="ltr p-4">
    
 <div className="overflow-x-auto p-[7px] border border-[#E2E8F0] rounded-[14px]">
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="p-2 text-left text-[#4A5568]">Exam Title</th>
        <th className="p-2 text-left text-[#4A5568]">Attempt Number</th>
        <th className="p-2 text-left text-[#4A5568]">Duration (minutes)</th>
        <th className="p-2 text-left text-[#4A5568]">Start Time</th>
        <th className="p-2 text-left text-[#4A5568]">End Time</th>
        <th className="p-2 text-left text-[#4A5568]">Score</th>
        <th className="p-2 text-left text-[#4A5568]">Percentage</th>
      </tr>
    </thead>
    <tbody>
      {studentExams?.exams?.map((exam, examIndex) => (
        exam?.attempts?.length > 0 ? (
          exam.attempts.map((attempt, attemptIndex) => (
            <tr
              key={`${exam.examId}-${attemptIndex}`}
              className={`${
                examIndex % 2 === 0 ? "bg-[#E6FFFA]" : "bg-[#FFFFFF]"
              } hover:bg-[#81E6D9] focus:bg-[#81E6D9]`}
            >
              <td className="border-t border-b p-2 text-[#4A5568]">
                {attemptIndex === 0 ? exam?.title : ""}
              </td>
              <td className="border-t border-b p-2 text-[#4A5568]">
                {attempt?.attemptNumber}
              </td>
              <td className="border-t border-b p-2 text-[#4A5568]">
                {attempt?.duration}
              </td>
              <td className="border-t border-b p-2 text-[#4A5568]">
                {new Date(attempt?.startTime).toLocaleString()}
              </td>
              <td className="border-t border-b p-2 text-[#4A5568]">
                {new Date(attempt?.endTime).toLocaleString()}
              </td>
              <td className="border-t border-b p-2 text-[#4A5568]">
                {attempt?.score}
              </td>
              <td className="border-t border-b p-2 text-[#4A5568]">
                {attempt?.percentage}%
              </td>
            </tr>
          ))
        ) : (
          <tr
            key={exam?.examId}
            className={`${
              examIndex % 2 === 0 ? "bg-[#E6FFFA]" : "bg-[#FFFFFF]"
            } hover:bg-[#81E6D9] focus:bg-[#81E6D9]`}
          >
            <td className="border-t border-b p-2 text-[#4A5568]">
              {exam?.title}
            </td>
            <td className="border-t border-b p-2 text-[#4A5568]" colSpan="6">
              No attempts available
            </td>
          </tr>
        )
      ))}
    </tbody>
  </table>
</div>


       </div>
      </div>
    </TabPanel>

  </Tabs>
       </div>

    </div>
   
    </>
  );
};

export default UserMe;
