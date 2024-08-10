import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateDoor, fetchDoorById } from "../../store/DoorSlice";
import { fetchCourses } from "../../store/CourseAdminSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditDoors = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loading, door } = useSelector((state) => state.DoorSlice);
  const { courses } = useSelector((state) => state.CourseAdminSlice);
console.log(door);
  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchCourses());
      dispatch(fetchDoorById(id));
    }
  }, [dispatch, id, navigate, token, userRole]);

  useEffect(() => {
    if (door) {
      setTitle(door?.data?.title || ""); // Use correct field names
      setDescription(door?.data?.description || ""); // Correct field names
      setSubCategory(door?.data?.subCategory || ""); // Correct field names
    }
  }, [door]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateDoor({ id,updatedData: { title, description, subCategory }  })).unwrap();
      toast.success("Door updated successfully");
      setTitle("");
      setDescription("");
      setSubCategory("");
    } catch (error) {
      toast.error("Error updating door");
    }
  };

  return (
    <div className="ltr">
      <div className="main-title flex justify-between items-center p-5">
        <h3 className="text-[18px] font-bold">Edit Door</h3>
        <p className="text-[#67748E]">Pages / Edit Door</p>
      </div>
      <div className="Add-Class">
        <form onSubmit={handleSubmit}>
          <div className="grid p-5 gap-2 mb-1 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Door Title"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Door Description"
                required
              />
            </div>
            <div>
              <label htmlFor="subCategory" className="block mb-1 text-sm font-medium">
                Course
              </label>
              <select
                id="subCategory"
                className="bg-[#F1F5FF] focus:bg-white shadowSelect border rounded-3xl text-black focus:border-[#4fcb8d] outline-none text-sm w-full py-[15px] px-[20px]"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  اختر الكورس
                </option>
                {courses?.data?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
          >
            {loading ? "Loading..." : "Edit Door"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDoors;
