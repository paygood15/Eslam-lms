import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../store/UserSliceAdmin";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.UserSliceAdmin);
  const [searchTerm, setSearchTerm] = useState("");
  const [hideComplete, setHideComplete] = useState(false);

  // New states for managing the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Redirect non-admin users
  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(getAllUsers());
    }
  }, [dispatch, navigate, token, userRole]);

  // Search filter logic
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Open confirmation popup
  const handleDeleteClick = (user) => {
    setUserToDelete(user); // Set the selected user
    setIsPopupOpen(true); // Show the popup
  };

  // Confirm deletion
  const handleDeleteConfirm = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete._id)).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("User deleted successfully!");
          setIsPopupOpen(false);
          setUserToDelete(null);
          dispatch(getAllUsers()); // Reload the data
        } else {
          toast.error("Failed to delete user. Please try again.");
        }
      });
    }
  };

  // Cancel deletion
  const handleDeleteCancel = () => {
    setIsPopupOpen(false);
    setUserToDelete(null);
  };

  // Filtered users based on search term
  const filteredUsers = users?.data?.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="ltr p-4">
       <div className="main-title flex justify-between items-center p-2">
            <h3 className="text-[18px] font-bold">All Users</h3>
            <p className="text-[#67748E]">Pages / All Users</p>
          </div>
      <div className="flex flex-col mb-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button className="bg-teal-500 text-white px-4 py-2 rounded">
          Features?
        </button>
        <input
          type="text"
          placeholder="Search User"
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
              <th className="p-2 text-left text-[#4A5568]">Email</th>
              <th className="p-2 text-left text-[#4A5568]">Governorate</th>
              <th className="p-2 text-left text-[#4A5568]">Phone</th>
              <th className="p-2 text-left text-[#4A5568]">Parent Phone</th>
              <th className="p-2 text-left text-[#4A5568]">Role</th>
              <th className="p-2 text-left text-[#4A5568]">initialLoginIp</th>
              
              <th className="p-2 text-left text-[#4A5568]">Login Attempts</th>
              <th className="p-2 text-left text-[#4A5568]">Logout Attempts</th>
              <th className="p-2 text-left text-[#4A5568]">Created At</th>
              <th className="p-2 text-left text-[#4A5568]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-[#E6FFFA]" : "bg-[#FFFFFF]"
                } hover:bg-[#81E6D9] focus:bg-[#81E6D9]`}
              >
                <td className="border-t border-b p-2 text-[#4A5568]">{user.name}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user.email}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user.governorate}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user.phone}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user.parentPhone}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user.role}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user.initialLoginIp}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user.loginAttempts}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">{user.logoutAttempts}</td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="border-t border-b p-2 flex gap-[12px] items-center justify-evenly">
                 
                  <MdDeleteForever
                    onClick={() => handleDeleteClick(user)}
                    className="text-red-600 cursor-pointer text-[25px]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   

      {/* Confirmation Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-bold mb-4 text-center">
              Confirm Deletion
            </h3>
            <p className="text-center mb-6">
              Are you sure you want to delete the user{" "}
              <strong>{userToDelete?.name}</strong>?
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

export default AllUsers;
