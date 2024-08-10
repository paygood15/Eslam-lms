import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseDetails } from "../store/CourseStdSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VidioCourse = () => {
  const navigate = useNavigate();
  const courseDetails = useSelector((state) => state.CourseStdSlice.courseDetails);  
  const { id } = useParams();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("Token");

  const [currentVideo, setCurrentVideo] = useState("");

  console.log(courseDetails);

  useEffect(() => {
    dispatch(fetchCourseDetails(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  useEffect(() => {
    // التأكد من أن الدروس موجودة قبل محاولة الوصول إليها
    if (courseDetails?.doors?.length > 0 && courseDetails.doors[0].lessons?.length > 0) {
      setCurrentVideo(courseDetails.doors[0].lessons[0].videoLink); // عرض أول فيديو افتراضيًا
    }
  }, [courseDetails]);

  const handleVideoChange = (videoLink) => {
    setCurrentVideo(videoLink);
    console.log(videoLink);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen relative">
      <div className="flex-1 lg:flex-grow-[6] p-4 min-h-screen">
        <div className="relative w-full h-full">
        {/* <iframe
            // src="https://iframe.mediadelivery.net/play/264964/2e621e94-a7e7-43f0-a5ae-cf41980dcdf5"
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe> */}
          <iframe
            src={currentVideo}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="flex-1 lg:flex-grow-[4] max-sm:flex-grow-10 p-4 bg-gray-100">
        {/* <button className="bg-pink-500 text-white py-2 px-4 rounded mb-4">اكمل واستمر للاتي</button> */}
        <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-2">Course Overview-1</h3>
          <h2 className="text-xl font-bold mb-4">{courseDetails?.title}</h2>
        
          <ul>
            {courseDetails?.doors?.map((door, index) => (
              door.lessons?.map((lesson, lessonIndex) => (
                <li key={`${index}-${lessonIndex}`} className="mb-2">
                  <button 
                    className="text-blue-500"
                    onClick={() => handleVideoChange(lesson.videoLink)}
                  >
                    {lesson.title}
                  </button>
                </li>
              ))
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VidioCourse;
