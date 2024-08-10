import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/Loading";
import { getLoggedUserData } from "../../store/UserSliceAdmin";
import { addCourse } from "../../store/CourseAdminSlice";
import { fetchCategories } from "../../store/CaregorySlice1";
import {fetchAllSections} from "../../store/SectionSlice"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddCourse = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // Set to null initially
  const [price, setPrice] = useState("");
  const [section, setSection] = useState("");
  const [totalHours, setTotalHours] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.CourseAdminSlice);
  const { user } = useSelector((state) => state.UserSliceAdmin);
  const { categories,status } = useSelector((state) => state.CaategorySlice1);
  const { sections } = useSelector((state) => state.SectionSlice);
  
console.log(sections);
  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(getLoggedUserData());
      dispatch(fetchCategories());
      dispatch(fetchAllSections());
      
    }
  }, [dispatch, navigate, token, userRole]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (image) formData.append('image', image);
    formData.append('price', price);
    formData.append('section', section);
    formData.append('totalHours', totalHours);

    dispatch(addCourse(formData))
      .then(() => {
        toast.success("Course added successfully");
        // Optionally reset form or redirect
        setTitle("");
        setDescription("");
        setCategory("");
        setImage(null);
        setPrice("");
        setSection("");
        setTotalHours("");
      })
      .catch((error) => {
        toast.error("Error adding course");
      });
  };

  return (
    <>
      {  
        <div className="ltr">
          <div className="main-title flex justify-between items-center p-5">
            <h3 className="text-[18px] font-bold">Add Course</h3>
            <p className="text-[#67748E]">Pages / Add Course</p>
          </div>
          <div className="Add-Course">
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
                    placeholder="Course Title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block mb-1 text-sm font-medium">Description</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                    placeholder="Course Description"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block mb-1 text-sm font-medium">Category</label>
                  <select
                    id="categories"
                    className="bg-[#F1F5FF] focus:bg-white shadowSelect border rounded-3xl text-black focus:border-[#4fcb8d] outline-none text-sm w-full py-[15px] px-[20px] "
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="" disabled selected>اختر الصف</option>
                    {categories.data?.map((cat) => (
                        <option key={cat._id
                        } value={cat._id
                        }>
                            {cat.name}
                        </option>
                    ))}
                </select>
                </div>
                <div>
                <label htmlFor="section" className="block mb-1 text-sm font-medium">Section</label>
                  <select
                    id="categories"
                    className="bg-[#F1F5FF] focus:bg-white shadowSelect border rounded-3xl text-black focus:border-[#4fcb8d] outline-none text-sm w-full py-[15px] px-[20px] "
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    required
                >
                    <option value="" disabled selected>اسم السكشن</option>
                    {sections.sections?.map((cat) => (
                        <option key={cat._id
                        } value={cat._id
                        }>
                            {cat.name}
                        </option>
                    ))}
                </select>
                </div>
                <div>
                  <label htmlFor="price" className="block mb-1 text-sm font-medium">Price</label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                    placeholder="Course Price"
                    required
                  />
                </div>
                <div>
                 
                <label htmlFor="image" className="block mb-1 text-sm font-medium">Image</label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="bg-[#F1F5FF] border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="totalHours" className="block mb-1 text-sm font-medium">Total Hours</label>
                  <input
                    type="number"
                    id="totalHours"
                    value={totalHours}
                    onChange={(e) => setTotalHours(e.target.value)}
                    className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                    placeholder="Total Hours"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
              >
              {isLoading ? 'loading Add...' : 'Add Course'}
              </button>
            </form>
          </div>
        </div>
      }
    </>
  );
}

export default AddCourse;
