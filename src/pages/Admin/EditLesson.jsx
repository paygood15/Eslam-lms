import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessonById, updateLesson } from "../../store/LessonSlice";
import { fetchDoors } from "../../store/DoorSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const EditLesson = () => {
  const { id } = useParams(); // Get the lesson ID from the URL
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [door, setDoor] = useState("");
  const [price, setPrice] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, lesson } = useSelector((state) => state.LessonSlice);
  const { doors } = useSelector((state) => state.DoorSlice);
console.log(lesson);
  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchDoors());
      dispatch(fetchLessonById(id));
    }
  }, [dispatch, id, navigate, token, userRole]);

  useEffect(() => {
    if (lesson) {
      setTitle(lesson?.data?.title || "");
      setDescription(lesson?.data?.description || "");
      setDoor(lesson?.data?.door || "");
      setPrice(lesson?.data?.price || "");
      setVideoLink(lesson?.data?.videoLink || "");
    }
  }, [lesson]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateLesson({ id, lessonData: { title, description, door, price, videoLink } })
      ).unwrap();

      toast.success("Lesson updated successfully");
      setTitle("");
      setDescription("");
      setDoor("");
      setPrice("");
      setVideoLink("");
    } catch (error) {
      toast.error("Error updating lesson");
    }
  };

  return (
    <div className="ltr">
      <div className="main-title flex justify-between items-center p-5">
        <h3 className="text-[18px] font-bold">Edit Lesson</h3>
        <p className="text-[#67748E]">Pages / Edit Lesson</p>
      </div>
      <div className="Edit-Lesson">
        <form onSubmit={handleSubmit}>
          <div className="grid p-5 gap-2 mb-1 md:grid-cols-2">
            <div>
              <label htmlFor="lessonTitle" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="lessonTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Lesson Title"
                required
              />
            </div>
            <div>
              <label htmlFor="lessonDescription" className="block text-sm font-medium">
                Description
              </label>
              <input
                type="text"
                id="lessonDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Lesson Description"
                required
              />
            </div>
            <div>
              <label htmlFor="lessonDoor" className="block mb-1 text-sm font-medium">
                Door
              </label>
              <select
                id="lessonDoor"
                className="bg-[#F1F5FF] focus:bg-white shadowSelect border rounded-3xl text-black focus:border-[#4fcb8d] outline-none text-sm w-full py-[15px] px-[20px]"
                value={door}
                onChange={(e) => setDoor(e.target.value)}
                required
              >
                <option value="" disabled>
                  اختر الباب
                </option>
                {doors?.data?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="lessonPrice" className="block text-sm font-medium">
                Price
              </label>
              <input
                type="text"
                id="lessonPrice"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Price"
                required
              />
            </div>
            <div>
              <label htmlFor="lessonVideoLink" className="block text-sm font-medium">
                Video Link
              </label>
              <input
                type="text"
                id="lessonVideoLink"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Video Link"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
          >
            {loading ? "Loading..." : "Edit Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLesson;
