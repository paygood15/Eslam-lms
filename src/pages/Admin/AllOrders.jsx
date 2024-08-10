import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders, approveOrder, rejectOrder } from "../../store/OrderSlice1";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.OrderSlice1);
  const [searchTerm, setSearchTerm] = useState("");
  const [hideComplete, setHideComplete] = useState(false);

  // New states for managing the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Redirect non-admin users
  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(getAllOrders());
    }
  }, [dispatch, navigate, token, userRole]);

  // Search filter logic
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

//   // Open confirmation popup
//   const handleDeleteClick = (order) => {
//     setOrderToDelete(order); // Set the selected order
//     setIsPopupOpen(true); // Show the popup
//   };

//   // Confirm deletion
//   const handleDeleteConfirm = () => {
//     if (orderToDelete) {
//       dispatch(deleteOrder(orderToDelete._id)).then((response) => {
//         if (response.meta.requestStatus === "fulfilled") {
//           toast.success("Order deleted successfully!");
//           setIsPopupOpen(false);
//           setOrderToDelete(null);
//           dispatch(getAllOrders()); // Fetch the orders again to refresh the data
//         } else {
//           toast.error("Failed to delete order. Please try again.");
//         }
//       });
//     }
//   };

  // Cancel deletion
  const handleDeleteCancel = () => {
    setIsPopupOpen(false);
    setOrderToDelete(null);
  };

  // Handle approval
  const handleApprove = (orderId) => {
    dispatch(approveOrder(orderId)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Order approved successfully!");
        dispatch(getAllOrders()); // Refresh the orders
      } else {
        toast.error("Failed to approve order. Please try again.");
      }
    });
  };

  // Handle rejection
  const handleReject = (orderId) => {
    dispatch(rejectOrder(orderId)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Order rejected successfully!");
        dispatch(getAllOrders()); // Refresh the orders
      } else {
        toast.error("Failed to reject order. Please try again.");
      }
    });
  };

  // Filtered orders based on search and hide complete status
  const filteredOrders = orders.data?.filter((order) => {
    // Match search term
    const matchesSearch =
      order?.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.student?.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Hide all orders when `hideComplete` is true
    if (hideComplete) {
      return false; // Hide all orders
    }

    // Return true if search matches, otherwise false
    return matchesSearch;
  });

  return (
    <div className="ltr p-4">
       <div className="main-title flex justify-between items-center p-2">
            <h3 className="text-[18px] font-bold">All Orders</h3>
            <p className="text-[#67748E]">Pages / All Orders</p>
          </div>
      <div className="flex flex-col mb-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button className="bg-teal-500 text-white px-4 py-2 rounded">
          Features?
        </button>
        <input
          type="text"
          placeholder="Search Order"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded px-4 py-2 flex-grow"
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={hideComplete}
            onChange={() => setHideComplete(!hideComplete)}
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
              <th className="p-2 text-left text-[#4A5568]">Student Name</th>
              <th className="p-2 text-left text-[#4A5568]">Email</th>
              <th className="p-2 text-left text-[#4A5568]">Course</th>
              <th className="p-2 text-left text-[#4A5568]">Status</th>
              <th className="p-2 text-left text-[#4A5568]">Approve</th>
              <th className="p-2 text-left text-[#4A5568]">Reject</th>
              <th className="p-2 text-left text-[#4A5568]">Created At</th>
              <th className="p-2 text-left text-[#4A5568]">Updated At</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((order, index) => (
              <tr
                key={order._id}
                className={`${
                  index % 2 === 0 ? "bg-[#E6FFFA]" : "bg-[#FFFFFF]"
                } hover:bg-[#81E6D9] focus:bg-[#81E6D9]`}
              >
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {order?.student?.name}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {order?.student?.email}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {order?.subCategory?.title || "null"}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {order?.status}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  <button
                    onClick={() => handleApprove(order._id)}
                    className="bg-[#50B8A5] text-white px-4 py-2 rounded mr-2"
                  >
                    Approve
                  </button>
                 
                </td>

                <td className="border-t border-b p-2 text-[#4A5568]">
                <button
                    onClick={() => handleReject(order._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                 
                </td>
               
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {new Date(order?.createdAt).toLocaleDateString()}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {new Date(order?.updatedAt).toLocaleDateString()}
                </td>
                {/* <td className="border-t border-b p-2 flex gap-[12px] items-center justify-evenly">
                  <FaEdit
                    onClick={() => {
                      navigate(`/Admin/EditOrder/${order._id}`);
                    }}
                    className="text-teal-500 cursor-pointer text-[25px]"
                  />
                  <MdDeleteForever
                    onClick={() => handleDeleteClick(order)}
                    className="text-red-600 cursor-pointer text-[25px]"
                  />
                </td> */}
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
      {/* {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-bold mb-4 text-center">
              Confirm Deletion
            </h3>
            <p className="text-center mb-6">
              Are you sure you want to delete the order{" "}
              <strong>{orderToDelete?.student.name}</strong>?
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
      )} */}
    </div>
  );
};

export default AllOrders;
