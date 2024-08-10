import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../store/CaregorySlice1";
import Loading from "../../utils/Loading";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddClasses = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const [name, setname] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.CaategorySlice1);

  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    }
  }, [navigate, token, userRole]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addCategory({ name }))
      .then(() => {
        toast.success("Class added successfully");
        setname("");
      })
      .catch((error) => {
        toast.error("Error adding class");
      });
  };

  return (
    <>
      
        <div className="ltr">
          <div className="main-title flex justify-between items-center p-5">
            <h3 className="text-[18px] font-bold">Add Class</h3>
            <p className="text-[#67748E]">Pages / Add Class</p>
          </div>
          <div className="Add-Class">
            <form onSubmit={handleSubmit}>
              <div className="grid p-5 gap-2 mb-1 md:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                    placeholder="Class Title"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
              >
                {isLoading ? 'Loading...' : 'Add Class'}
              </button>
            </form>
          </div>
        </div>
      
    </>
  );
};

export default AddClasses;
