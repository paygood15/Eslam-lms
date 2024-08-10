import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDoor } from "../../store/DoorSlice";
import {fetchCourses} from "../../store/CourseAdminSlice"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddDoors = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
  
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [subCategory, setsubCategory] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.DoorSlice);
    const { courses } = useSelector((state) => state.CourseAdminSlice);
    console.log(courses);
    useEffect(() => {
      if (!token || userRole !== "admin") {
        navigate("/");
    } else {
      dispatch(fetchCourses());
      }
    }, [navigate, token, userRole]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      dispatch(addDoor({ title,description,subCategory }))
        .then(() => {
          toast.success("Section added successfully");
          settitle("");
          setdescription("");
          setsubCategory("");
        })
        .catch((error) => {
          toast.error("Error adding class");
        });
    };
  return (
    <div className="ltr">
    <div className="main-title flex justify-between items-center p-5">
      <h3 className="text-[18px] font-bold">Add Door</h3>
      <p className="text-[#67748E]">Pages / Add Door</p>
    </div>
    <div className="Add-Class">
      <form onSubmit={handleSubmit}>
        <div className="grid p-5 gap-2 mb-1 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
              placeholder="Class Title"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium">description</label>
            <input
              type="text"
              id="title"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
              placeholder="description "
              required
            />
          </div>
          <div>
          <label htmlFor="category" className="block mb-1 text-sm font-medium">Course</label>
                  <select
                    id="categories"
                    className="bg-[#F1F5FF] focus:bg-white shadowSelect border rounded-3xl text-black focus:border-[#4fcb8d] outline-none text-sm w-full py-[15px] px-[20px] "
                    value={subCategory}
                    onChange={(e) => setsubCategory(e.target.value)}
                    required
                >
                    <option value="" disabled selected>اختر الكورس</option>
                    {courses.data?.map((cat) => (
                        <option key={cat._id
                        } value={cat._id
                        }>
                            {cat.title}
                        </option>
                    ))}
                </select>
          </div>
        </div>
        <button
          type="submit"
          className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
        >
          {loading ? 'Loading...' : 'Add Section'}
        </button>
      </form>
    </div>
  </div>
  )
}

export default AddDoors