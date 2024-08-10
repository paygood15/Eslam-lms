import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateLessonFile, getLessonFile } from "../../store/LessonFileSlice1";
import { fetchAllLessons } from "../../store/LessonSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFileLesson = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [lesson, setLesson] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, lessonFile } = useSelector((state) => state.lessonFilesSlice);
  const { lessons } = useSelector((state) => state.LessonSlice);

  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllLessons());
      dispatch(getLessonFile(id));
    }
  }, [dispatch, navigate, token, userRole, id]);

  useEffect(() => {
    if (lessonFile) {
      setTitle(lessonFile?.data?.title || "");
      setLesson(lessonFile?.data?.lesson || "");
    }
  }, [lessonFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (file) formData.append("file", file);
    formData.append("lesson", lesson);

    try {
      await dispatch(updateLessonFile({ id, updatedData: formData })).unwrap();
      toast.success("File updated successfully");
      setTitle("");
      setFile(null);
      setLesson("");
    } catch (error) {
      toast.error("Error updating file");
    }
  };

  return (
    <div className="ltr">
      <div className="main-title flex justify-between items-center p-5">
        <h3 className="text-[18px] font-bold">Edit File for Lesson</h3>
        <p className="text-[#67748E]">Pages / Edit File</p>
      </div>
      <div className="Edit-File-Lesson">
        <form onSubmit={handleSubmit}>
          <div className="grid p-5 gap-2 mb-1 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="File Title"
                required
              />
            </div>
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
            <div>
              <label htmlFor="file" className="block text-sm font-medium">File</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="bg-[#F1F5FF] border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
              />
            </div>
          </div>
          <button
            type="submit"
            className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
          >
            {loading ? "Loading..." : "Update File"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditFileLesson;
