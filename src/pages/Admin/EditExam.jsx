import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateExam, getSingleExamAdmin } from "../../store/ExamSlice1";
import { fetchAllLessons } from "../../store/LessonSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditExam = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // State Variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState(null);
  const [lesson, setLesson] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Selectors to access state from Redux store
  const { loading, examAdmin } = useSelector((state) => state.ExamSlice1);
  const { lessons } = useSelector((state) => state.LessonSlice);
console.log(examAdmin);
  // Fetch data on component mount
  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllLessons());
      dispatch(getSingleExamAdmin(id));
    }
  }, [dispatch, navigate, token, userRole, id]);

  // Populate form fields with existing exam data
  useEffect(() => {
    if (examAdmin) {
      setTitle(examAdmin?.title || "");  // Corrected setname to setTitle
      setDescription(examAdmin?.description || "");
      setDuration(examAdmin?.duration || "");
      setLesson(examAdmin?.lesson || "");
    }
  }, [examAdmin]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("duration", duration);
    if (image) formData.append("image", image);  // Append image if it exists
    formData.append("lesson", lesson);

    dispatch(updateExam({ id, examData:formData }))
      .then(() => {
        toast.success("Exam updated successfully");
        // navigate("/exams"); // Redirect to the exams list page
      })
      .catch((error) => {
        toast.error("Error updating exam");
        console.error("Error updating exam:", error);
      });
  };

  return (
    <div className="ltr">
      <div className="main-title flex justify-between items-center p-5">
        <h3 className="text-[18px] font-bold">Edit Exam</h3>
        <p className="text-[#67748E]">Pages / Edit Exam</p>
      </div>
      <div className="Add-Exam">
        <form onSubmit={handleSubmit}>
          <div className="grid p-5 gap-2 mb-1 md:grid-cols-2">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Exam Title"
                required
              />
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Exam Description"
                required
              />
            </div>

            {/* Duration Field */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium">Duration</label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Exam Duration (minutes)"
                required
              />
            </div>

            {/* Lesson Selector */}
            <div>
              <label htmlFor="lesson" className="block text-sm font-medium">Lesson</label>
              <select
                id="lesson"
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white shadowSelect border rounded-3xl text-black focus:border-[#4fcb8d] outline-none text-sm w-full py-[15px] px-[20px]"
                required
              >
                <option value="" disabled>Select Lesson</option>
                {lessons.data?.map((lesson) => (
                  <option key={lesson._id} value={lesson._id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium">Image</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="bg-[#F1F5FF] border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
          >
            {loading ? "Loading..." : "Update Exam"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExam;
