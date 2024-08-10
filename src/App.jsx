import React, { useEffect } from "react";
import CoverLms from "./assets/newCleanCover.jpeg";
import Cover2 from "./assets/coverlms.jpg"
import Cover3 from "./assets/newcover.jpeg"
import bannerhome from "./assets/newbanner.jpeg";
import cardCover from "./assets/coverlms.jpg";
import Ani from "./component/Animation"
import can from "./assets/can.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "./store/CourseAdminSlice";
import { fetchAllSections } from "./store/SectionSlice"

import "./index.css";
import { NavLink } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const { status,courses } = useSelector((state) => state.CourseAdminSlice);
  const { sections } = useSelector((state) => state.SectionSlice);
  console.log(sections.sections);
  console.log(courses);
console.log(status);
  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchAllSections())
    window.scrollTo(0, 0);
  }, [dispatch]);
  return (
    <>
      <div className="One-Section max-sm:flex-col Container py-7 px-3 Lmsback  flex justify-between">
        <div className="OverLay max-sm:top-[25px] lg:h-[580px] md:h-[420px]  sm:h-[420px] max-sm:left-[4px]">

        </div>
        <div className="Right-Section max-sm:text-center flex flex-col justify-center p-3 z-10 ">
          <h4 className="text-[#bdefcf] text-[16px] font-bold  ">
          <span className="text-white text-[24px]">د/ إسلام فؤاد </span> هو دكتور صيدلي من الأساس ، خريج صيدلة القاهرة عام ٢٠١٧ 
          </h4>
          <h1 className="text-white text-[20px]  font-bold  "> صاحب خبرة كبيرة في التدريس الأكاديمي تصل ل ٨ سنوات </h1>
          <h4 className="text-[#bdefcf] md:w-[438px] max-sm:text-center text-[16px] font-bold">
          قدر يأهل عدد كبير جداً من طلبة الثانوية العامة وطلبة كلية الصيدلة علي مستوي جامعات مختلفة انهم يكونوا perfect جداً في مادة ال Chemistry بكل فروعها نظراً لطريقته المختلفة والجذابة في شرح المادة العلمية
          </h4>
          <h2 className="text-[#bdefcf] md:w-[365px] max-sm:text-center text-[16px] font-bold">ومن ضمن أسباب نجاحه انه بيمتلك تيم مادة علمية علي أعلي مستوي من دكاترة صيادلة هيكونوا معاك وفي ضهرك دايماً رداً علي كل استفساراتك</h2>
          <div className="Inputs-Section mt-3 flex gap-3 max-sm:justify-center">
      {token ? (
        userRole === "admin" ? (
          <button onClick={()=> {
            navigate("/Admin/AllStatic")
          }}  className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2">
            <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">
              لوحة التحكم
            </span>
            <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
            <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
          </button>
        ) : (
          <button onClick={()=> {
            navigate("/UserMe")
          }} className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2">
            <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">
              كورساتي
            </span>
            <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
            <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
          </button>
        )
      ) : (
        <>
          <button onClick={()=> {
            navigate("/Register")
          }}  className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2">
            <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">
              انشئ حسابك !
            </span>
            <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
            <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
          </button>

          <button onClick={()=> {
            navigate("/Login")
          }} className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">
            الدخول !
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
              {" "}
              اهلا بك !
            </span>
          </button>
        </>
      )}
    </div>
        </div>
        <div className="Center-Section max-sm:flex max-sm:m-auto w-1/2 z-10">
          <div className="Img-Cover">
            
            <img
              className="w-full  h-full rounded-full"
              src={CoverLms}
              alt="Fo3sh"
            />
          </div>
  
        </div>
        {/* <div className="Left-Section  flex flex-col justify-center p-3">
       <div className="Text-Top flex flex-col justify-center items-center">
        <h5 className="text-[#37B7C3] text-[22px] font-bold">سنوات الخبرة</h5>
        <h4 className="text-white text-[22px] font-bold">5+</h4>
       </div>
       <div className="Text-Bottom flex flex-col justify-center items-center">
        <h5 className="text-[#37B7C3] text-[22px] font-bold">عدد الطلاب</h5>
        <h4 className="text-white text-[22px] font-bold">3,000+</h4>
       </div>
      </div> */}
   
      </div>
      <div className="Two-Section">
        <div class="containerss line">
          <h1 className="text-[18px] max-sm:text-[15px] text-center font-bold my-3 text-[#37B7C3]">
          منصة متخصصة في الكيمستري لكل مراحل الثانوية العامة ( الصف الاول والثاني والثالث الثانوي )
          </h1>
          <h1 className="text-[25px] font-bold">الكمياء مع اسلام فؤاد</h1>
        </div>

        <div className="Cover-Img">
          <img src={bannerhome} alt="bannerhome" />
        </div>
      </div>
      {/*  */}
      <div className="Info-section">
      <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
   
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
       ٌقدرنا نسكب ثقه 5000 طالبه وطالبه
      </h1>
      <p class="mb-8 leading-relaxed"> ضمن أسباب نجاحنا اننا بنمتلك تيم مادة علمية علي أعلي مستوي من دكاترة صيادلة هيكونوا معاك وفي ضهرك دايماً رداً علي كل استفساراتك</p>
  
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img className="object-cover object-center rounded-[18px]" alt="hero" src={can}/>
    </div>
  </div>
</section>
      </div>
      <div>
      {sections.sections?.map((section) => (
        <div key={section._id} className="ThiredSection p-[20px]">
          <span className="fancy gradinet-default text-[55px] max-sm:text-[40px] font-bold">
            {section.name}
          </span>
          <div className="Card py-5 grid gap-6 grid-cols-2 max-sm:grid-cols-1">
            {section.subCategories?.map((course) => (
              <NavLink to={`/Course/${course._id}`} key={course._id}>
                <div className="Content hover:scale-100">
                  <img className="rounded-xl" src={cardCover} alt="cardCover" />
                  <div className="Card-Content flex-col bg-white relative w-[90%] py-3 px-5 shadow-2xl rounded-xl flex right-[26px] max-sm:right-[15px] bottom-[38px] z-10">
                    <div className="FirstTopCard flex gap-[10px]">
                      <div className="RightCard flex flex-col gap-2">
                        <h1 className="text-black text-[21px] font-bold">{course.title}</h1>
                        <div className="w-full h-[3px] bg-[#2DD4BF] rounded-lg smooth "></div>
                        <p className="text-[#6B7280]">{course.description}</p>
                      </div>
                      <div className="LeftCard flex justify-center flex-col w-[60%] gap-[6px]">
                        <button className="hover:bg-[#2DD4BF] hover:text-white duration-300 border-[2px] p-[1px] border-solid border-[#2DD4BF] text-[15px] rounded-xl">
                          الدخول للكورس
                        </button>
                        <button className="border-[1px] Gradient-Button-Card-Bg p-[1px] border-solid border-[#2DD4BF] text-[15px] rounded-xl">
                          اشترك الآن !
                        </button>
                      </div>
                    </div>
                    <div className="SecondBottonCard p-3">
                      <div className="w-full h-[1px] bg-[#6b728054] rounded-lg smooth "></div>
                      <div className="ContentLast py-[10px] flex justify-between items-center">
                        <div className="RightCard flex justify-center items-center gap-[6px] bg-[#2DD4BF] text-[15px] rounded-lg py-[3px] px-[11px] text-white ">
                          <span className="bg-white rounded-xl text-black px-[7px] py-[0px] text-[13px] font-bold ">
                            {course.price} جنيهًا
                          </span>
                        </div>
                        <div className="LeftCard flex flex-col">
                          <h5 className="text-[#6B7280]">التاريخ: {new Date(course.createdAt).toLocaleDateString('ar-EG')}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </div>

      {/* <div className="AnimationSection">
        <Ani />
      </div> */}
    </>
  );
};

export default App;
