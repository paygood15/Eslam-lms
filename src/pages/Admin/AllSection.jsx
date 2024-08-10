import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllSections, deleteSection } from "../../store/SectionSlice";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sections } = useSelector((state) => state.SectionSlice); // Assuming the redux slice is named 'SectionSlice'
  const [searchTerm, setSearchTerm] = useState("");
  const [hideComplete, setHideComplete] = useState(false);
  console.log(sections);
  // New states for managing the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Redirect non-admin users
  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllSections());
    }
  }, [dispatch, navigate, token, userRole]);

  // Search filter logic
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Open confirmation popup
  const handleDeleteClick = (section) => {
    setSectionToDelete(section); // Set the selected section
    setIsPopupOpen(true); // Show the popup
  };

  // Confirm deletion
  const handleDeleteConfirm = () => {
    if (sectionToDelete) {
      dispatch(deleteSection(sectionToDelete._id)).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Section deleted successfully!");
          setIsPopupOpen(false);
          setSectionToDelete(null);
          dispatch(fetchAllSections()); // Fetch sections again after deletion
        } else {
          toast.error("Failed to delete section. Please try again.");
        }
      });
    }
  };

  // Cancel deletion
  const handleDeleteCancel = () => {
    setIsPopupOpen(false);
    setSectionToDelete(null);
  };

  // Filtered sections based on search and hide complete status
  const filteredSections = sections.sections?.filter((section) => {
    // Match search term
    const matchesSearch =
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.slug.toLowerCase().includes(searchTerm.toLowerCase());

    // Hide all sections when `hideComplete` is true
    if (hideComplete) {
      console.log(`Hiding all sections because hideComplete is ${hideComplete}`);
      return false; // Hide all sections
    }

    // Return true if search matches, otherwise false
    return matchesSearch;
  });

  return (
    <div className="ltr p-4">
       <div className="main-title flex justify-between items-center p-2">
            <h3 className="text-[18px] font-bold">All Sections</h3>
            <p className="text-[#67748E]">Pages / All Sections</p>
          </div>
      <div className="flex flex-col mb-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button className="bg-teal-500 text-white px-4 py-2 rounded">
          Features?
        </button>
        <input
          type="text"
          placeholder="Search Section"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded px-4 py-2 flex-grow"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={hideComplete}
            onChange={() => {
              setHideComplete(!hideComplete);
              console.log(`Hide Complete toggled: ${!hideComplete}`);
            }}
          />
          Hide All
        </label>
        <button
          onClick={() => setSearchTerm("")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Search
        </button>
      </div>
      <div className="overflow-x-auto p-[7px] border border-[#E2E8F0] rounded-[14px]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left text-[#4A5568]">Name</th>
              <th className="p-2 text-left text-[#4A5568]">Category</th>
              <th className="p-2 text-left text-[#4A5568]">Subcategories</th>
              <th className="p-2 text-left text-[#4A5568]">Created At</th>
              <th className="p-2 text-left text-[#4A5568]">Updated At</th>
              <th className="p-2 text-left text-[#4A5568]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSections?.map((section, index) => (
              <tr
                key={section._id}
                className={`${
                  index % 2 === 0 ? "bg-[#E6FFFA]" : "bg-[#FFFFFF]"
                } hover:bg-[#81E6D9] focus:bg-[#81E6D9]`}
              >
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {section.name}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {section.category?.name}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {section.subCategories?.map((subcategory, subIndex) => (
                    <div key={subIndex}>
                      {subcategory.title} {/* Replace 'title' with the correct property */}
                    </div>
                  ))}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {new Date(section.createdAt).toLocaleDateString()}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {new Date(section.updatedAt).toLocaleDateString()}
                </td>
                <td className="border-t border-b p-2 flex gap-[12px] items-center justify-evenly">
                  <FaEdit onClick={()=> {
                    navigate(`/Admin/EditSection/${section._id}`)
                  }} className="text-teal-500 cursor-pointer text-[25px]" />
                  <MdDeleteForever
                    onClick={() => handleDeleteClick(section)}
                    className="text-red-600 cursor-pointer text-[25px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-between items-center mt-4">
        <button className="text-teal-500">&lt;</button>
        <div>1</div>
        <button className="text-teal-500">&gt;</button>
      </div> */}

      {/* Confirmation Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-bold mb-4 text-center">
              Confirm Deletion
            </h3>
            <p className="text-center mb-6">
              Are you sure you want to delete the section{" "}
              <strong>{sectionToDelete?.name}</strong>?
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSection;
