import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getExams, deleteExam } from "../../store/ExamSlice1";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams } = useSelector((state) => state.ExamSlice1);
  const [searchTerm, setSearchTerm] = useState("");
  const [hideComplete, setHideComplete] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  // Redirect non-admin users
  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(getExams());
    }
  }, [dispatch, navigate, token, userRole]);

  // Search filter logic
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Open confirmation popup
  const handleDeleteClick = (question) => {
    setQuestionToDelete(question); // Set the selected question
    setIsPopupOpen(true); // Show the popup
  };

  // Confirm deletion
  const handleDeleteConfirm = () => {
    if (questionToDelete) {
      dispatch(deleteExam(questionToDelete._id)).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          toast.success("Question deleted successfully!");
          setIsPopupOpen(false);
          setQuestionToDelete(null);
          dispatch(getExams()); // Fetch the exams again to refresh the data
        } else {
          toast.error("Failed to delete question. Please try again.");
        }
      });
    }
  };

  // Cancel deletion
  const handleDeleteCancel = () => {
    setIsPopupOpen(false);
    setQuestionToDelete(null);
  };

  // Flattened list of questions from all exams
  const allQuestions = exams.flatMap(exam => exam.questions || []);

  // Filtered questions based on search and hide complete status
  const filteredQuestions = allQuestions.filter((question) => {
    // Match search term
    const matchesSearch =
      question.text.toLowerCase().includes(searchTerm.toLowerCase());

    // Hide all questions when `hideComplete` is true
    if (hideComplete) {
      console.log(`Hiding all questions because hideComplete is ${hideComplete}`);
      return false; // Hide all questions
    }

    // Return true if search matches, otherwise false
    return matchesSearch;
  });

  return (
    <div className="ltr p-4">
       <div className="main-title flex justify-between items-center p-2">
            <h3 className="text-[18px] font-bold">All quations</h3>
            <p className="text-[#67748E]">Pages / All quations</p>
          </div>
      <div className="flex flex-col mb-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button className="bg-teal-500 text-white px-4 py-2 rounded">
          Features?
        </button>
        <input
          type="text"
          placeholder="Search Question"
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
              <th className="p-2 text-left text-[#4A5568]">Text</th>
              <th className="p-2 text-left text-[#4A5568]">Options</th>
              <th className="p-2 text-left text-[#4A5568]">answer</th>
              <th className="p-2 text-left text-[#4A5568]">Score</th>
              <th className="p-2 text-left text-[#4A5568]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions?.map((question, index) => (
              <tr
                key={question._id}
                className={`${
                  index % 2 === 0 ? "bg-[#E6FFFA]" : "bg-[#FFFFFF]"
                } hover:bg-[#81E6D9] focus:bg-[#81E6D9]`}
              >
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {question.text}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {question.options.length > 0 ? question.options.join(", ") : "No options"}
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {question.correctAnswer }
                </td>
                <td className="border-t border-b p-2 text-[#4A5568]">
                  {question.score}
                </td>
                <td className="border-t border-b p-2 flex gap-[12px] items-center justify-evenly">
                  <FaEdit  onClick={()=> {
                    navigate(`/Admin/EditQuestion/${question._id}`)
                  }}   className="text-teal-500 cursor-pointer text-[25px]" />
                  <MdDeleteForever
                    onClick={() => handleDeleteClick(question)}
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
              Are you sure you want to delete the question{" "}
              <strong>{questionToDelete?.text}</strong>?
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

export default AllQuestion;
