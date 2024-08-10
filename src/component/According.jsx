import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../store/CourseStdSlice";
import { startStudentExam } from "../store/ExamSlice1";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const NestedAccordion = ({ title, content }) => {
  const [accordionOpen, setAccordionOpen] = React.useState(false);

  return (
    <div className="py-2 bg-[#F3F4F6] rounded-[12px] my-[10px]">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className={`${
          accordionOpen ? "bg-[#FFE4E6]" : "bg-white"
        } flex justify-between items-center p-[20px] rounded-[12px] font-bold w-[98%] mr-[10px] max-sm:w-[97%] max-sm:mr-[4px]`}
      >
        <span>{title}</span>
        <svg
          className="fill-[#F43F5E] shrink-0 "
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-black rounded-[12px] w-[90%] max-sm:w-[95%] mr-[45px] max-sm:mr-[12px] mt-[10px] bg-white text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] max-sm:p-[7px] p-[20px] opacity-100"
            : "grid-rows-[0fr] p-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden">{content}</div>
      </div>
    </div>
  );
};

const Accordion = ({ courseOne }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const courseDetails = useSelector((state) => state.CourseStdSlice.courseDetails);
  const [usingCourseDetails, setUsingCourseDetails] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCourseDetails(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  // Determine which data to use
  useEffect(() => {
    if (courseDetails.doors && courseDetails.doors.length > 0) {
      setUsingCourseDetails(true);
    } else {
      setUsingCourseDetails(false);
    }
  }, [courseDetails]);

  const dataToRender = courseDetails.doors?.length > 0 ? courseDetails.doors : courseOne;
 
  if (!dataToRender || !Array.isArray(dataToRender)) {
    return <p>No courses available.</p>;
  }

  const handleVideoClick = (courseId) => {
    if (usingCourseDetails) {
      navigate(`/vidioCourse/${courseId}`);
    } else {
      toast.error("قم بالاشتراك في الكورس أولاً");
    }
  };

  const handleExamClick = (examId) => {
    if (!localStorage.getItem("token")) {
      toast.error("يرجى إنشاء حساب أولاً.");
      return;
    }
    dispatch(startStudentExam(examId))
      .unwrap()
      .then(() => {
        if (usingCourseDetails) {
          navigate(`/Exam/${examId}`);
        } else {
          toast.error("قم بالاشتراك في الكورس أولاً");
        }
      })
      .catch((error) => {
        toast.error("قم بالاشتراك في الكورس أولاً");
        console.error(error);
      });
  };

  const handleFileClick = (fileUrl) => {
    if (usingCourseDetails) {
      window.open(fileUrl, "_blank");
    } else {
      toast.error("قم بالاشتراك في الكورس أولاً");
    }
  };

  return (
    <div className="p-4 max-sm:p-1 bg-gray-200 rounded-lg">
      {dataToRender.map((course) => (
        <NestedAccordion
          key={course._id}
          title={course.title}
          content={
            <>
              {course.lessons?.map((lesson, index) => (
                <NestedAccordion
                  key={index}
                  title={lesson.title}
                  content={
                    <>
                      <NestedAccordion
                        title={"فيديو " + lesson.title}
                        content={
                          <div className="flex items-center justify-between">
                            <h2>فيديو الفصل الأول</h2>
                            <button
                              onClick={() => handleVideoClick(course._id)}
                              className="border-[1px] border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white hover:text-black py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
                            >
                              مشاهدة الفيديو
                            </button>
                          </div>
                        }
                      />
                      {lesson.exams?.length > 0 ? (
                        lesson.exams.map((exam, examIndex) => (
                          <NestedAccordion
                            key={examIndex}
                            title={exam.title}
                            content={
                              <div className="flex items-center justify-between">
                                <h2>{exam.title}</h2>
                                <button
                                  onClick={() => handleExamClick(exam._id)}
                                  className="border-[1px] border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white hover:text-black py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
                                >
                                  بدء الامتحان
                                </button>
                              </div>
                            }
                          />
                        ))
                      ) : (
                        <NestedAccordion title="لا يوجد امتحانات" />
                      )}

                      {lesson.files?.length > 0 ? (
                        lesson.files.map((file, fileIndex) => (
                          <NestedAccordion
                            key={fileIndex}
                            title={file.title}
                            content={
                              <div className="flex items-center justify-between">
                                <h2>{file.title}</h2>
                                <button
                                  onClick={() => handleFileClick(file.file)}
                                  className="border-[1px] border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white hover:text-black py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
                                >
                                  فتح الملف
                                </button>
                              </div>
                            }
                          />
                        ))
                      ) : (
                        <NestedAccordion title="لا يوجد ملفات" />
                      )}
                    </>
                  }
                />
              ))}
            </>
          }
        />
      ))}
    </div>
  );
};

export default Accordion;
