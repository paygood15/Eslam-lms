import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSection, updateSection } from "../../store/SectionSlice";
import { fetchCategories } from "../../store/CaregorySlice1";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditSection = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, section } = useSelector((state) => state.SectionSlice);
  const { categories } = useSelector((state) => state.CaategorySlice1);

  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchCategories());
      dispatch(fetchSection(id));
    }
  }, [navigate, token, userRole, id, dispatch]);

  useEffect(() => {
    if (section) {
      setName(section?.name || "");
      setDescription(section?.description || "");
      setCategoryId(section?.category?._id || ""); // Use category ID
    }
  }, [section]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateSection({ id, sectionData: { name, description, categoryId } })).unwrap();
      toast.success("Section updated successfully");
      setName("");
      setDescription("");
      setCategoryId("");
    } catch (error) {
      toast.error("Error updating section");
    }
  };

  return (
    <div className="ltr">
      <div className="main-title flex justify-between items-center p-5">
        <h3 className="text-[18px] font-bold">Edit Section</h3>
        <p className="text-[#67748E]">Pages / Edit Section</p>
      </div>
      <div className="Add-Class">
        <form onSubmit={handleSubmit}>
          <div className="grid p-5 gap-2 mb-1 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Class Title"
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
                placeholder="Class Description"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-1 text-sm font-medium">
                Class
              </label>
              <select
                id="categories"
                className="bg-[#F1F5FF] focus:bg-white shadowSelect border rounded-3xl text-black focus:border-[#4fcb8d] outline-none text-sm w-full py-[15px] px-[20px]"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                <option value="" disabled>
                  اختر الصف
                </option>
                {categories.data?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
          >
            {loading ? "Loading..." : "Edit Section"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSection;
