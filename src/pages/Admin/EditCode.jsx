import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAccessCodeById, updateAccessCode } from "../../store/CodeCourse";
import { fetchCourses } from "../../store/CourseAdminSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to convert ISO date to yyyy-MM-dd format with proper year padding
const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const year = String(date.getFullYear()).padStart(4, "0"); // Ensure year is 4 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditCode = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const [code, setCode] = useState("");
  const [course, setCourse] = useState("");
  const [discount, setDiscount] = useState(0);
  const [maxUses, setMaxUses] = useState(1);
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, accessCode } = useSelector((state) => state.CodeCourse);
  const { courses } = useSelector((state) => state.CourseAdminSlice);

  console.log(accessCode);

  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAccessCodeById(id));
      dispatch(fetchCourses());
    }
  }, [navigate, token, userRole, dispatch, id]);

  useEffect(() => {
    if (accessCode) {
      setCode(accessCode?.code || "");
      setCourse(accessCode?.course || "");
      setDiscount(accessCode?.discount || 0);
      setMaxUses(accessCode?.maxUses || 1);
      // Use formatDate to ensure the correct format for the date input
      setValidFrom(formatDate(accessCode?.validFrom));
      setValidTo(formatDate(accessCode?.validTo));
    }
  }, [accessCode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const accessCodeData = {
      code,
      course,
      discount,
      maxUses,
      validFrom,
      validTo,
    };

    dispatch(updateAccessCode({ id, accessCodeData }))
      .then(() => {
        toast.success("Access code updated successfully");
        setCode("");
        setCourse("");
        setDiscount(0);
        setMaxUses(1);
        setValidFrom("");
        setValidTo("");
        navigate("/access-codes"); // Redirect to the list of access codes after success
      })
      .catch((error) => {
        toast.error("Error updating access code");
        console.error("Error updating access code:", error);
      });
  };

  return (
    <div className="ltr">
      <div className="main-title flex justify-between items-center p-5">
        <h3 className="text-[18px] font-bold">Edit Access Code</h3>
        <p className="text-[#67748E]">Pages / Edit Access Code</p>
      </div>
      <div className="Add-Code">
        <form onSubmit={handleSubmit}>
          <div className="grid p-5 gap-2 mb-1 md:grid-cols-2">
            <div>
              <label htmlFor="code" className="block text-sm font-medium">
                Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Access Code"
                required
              />
            </div>
            <div>
              <label htmlFor="course" className="block text-sm font-medium">
                Course
              </label>
              <select
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a Course
                </option>
                {courses.data?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="discount" className="block text-sm font-medium">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Discount (%)"
                required
              />
            </div>
            <div>
              <label htmlFor="maxUses" className="block text-sm font-medium">
                Max Uses
              </label>
              <input
                type="number"
                id="maxUses"
                value={maxUses}
                onChange={(e) => setMaxUses(Number(e.target.value))}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Max Uses"
                required
              />
            </div>
            <div>
              <label htmlFor="validFrom" className="block text-sm font-medium">
                Valid From
              </label>
              <input
                type="date"
                id="validFrom"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="validTo" className="block text-sm font-medium">
                Valid To
              </label>
              <input
                type="date"
                id="validTo"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
          >
            {loading ? "Loading..." : "Update Access Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCode;
