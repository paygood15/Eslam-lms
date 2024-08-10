import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createLesson } from "../../store/LessonSlice";
import {fetchDoors} from "../../store/DoorSlice"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddLesson = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
  
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [door, setdoor] = useState("");
    const [price, setprice] = useState("");
    const [videoLink, setvideoLink] = useState("");


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.LessonSlice);
    const { doors } = useSelector((state) => state.DoorSlice);
    console.log(doors);
    useEffect(() => {
      if (!token || userRole !== "admin") {
        navigate("/");
    } else {
      dispatch(fetchDoors());
      }
    }, [navigate, token, userRole]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      dispatch(createLesson({ title,description,door,price, videoLink}))
        .then(() => {
          toast.success("Section added successfully");
          settitle("");
          setdescription("");
          setdoor("");
          setprice("");
          setvideoLink("");
        })
        .catch((error) => {
          toast.error("Error adding class");
        });
    };
  return (
<div className="ltr">
    <div className="main-title flex justify-between items-center p-5">
      <h3 className="text-[18px] font-bold">Add Lesson</h3>
      <p className="text-[#67748E]">Pages / Add Lesson</p>
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
          <label htmlFor="category" className="block mb-1 text-sm font-medium">Door</label>
                  <select
                    id="categories"
                    className="bg-[#F1F5FF] focus:bg-white shadowSelect border rounded-3xl text-black focus:border-[#4fcb8d] outline-none text-sm w-full py-[15px] px-[20px] "
                    value={door}
                    onChange={(e) => setdoor(e.target.value)}
                    required
                >
                    <option value="" disabled selected>اختر الباب</option>
                    {doors.data?.map((cat) => (
                        <option key={cat._id
                        } value={cat._id
                        }>
                            {cat.title}
                        </option>
                    ))}
                </select>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium">price</label>
            <input
              type="text"
              id="title"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
              placeholder="price "
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium">videoLink</label>
            <input
              type="text"
              id="title"
              value={videoLink}
              onChange={(e) => setvideoLink(e.target.value)}
              className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
              placeholder="videoLink "
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
        >
          {loading ? 'Loading...' : 'Add Lesson'}
        </button>
      </form>
    </div>
  </div>
  )
}

export default AddLesson