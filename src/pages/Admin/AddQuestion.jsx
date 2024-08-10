import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuestion, getExams } from "../../store/ExamSlice1";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddQuestion = () => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const [text, setText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [image, setImage] = useState(null);
  const [score, setScore] = useState("");
  const [examId, setExamId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, exams } = useSelector((state) => state.ExamSlice1);

  useEffect(() => {
    if (!token || userRole !== "admin") {
      navigate("/");
    } else {
      dispatch(getExams());
    }
  }, [navigate, token, userRole, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const questionData = new FormData();
    questionData.append("text", text);
    questionData.append("correctAnswer", correctAnswer);
    questionData.append("options", JSON.stringify([option1, option2, option3])); // Convert options to JSON string
    if (image) questionData.append("image", image);
    questionData.append("score", score);

    dispatch(addQuestion({ examId, questionData }))
      .then(() => {
        toast.success("Question added successfully");
        setText("");
        setCorrectAnswer("");
        setOption1("");
        setOption2("");
        setOption3("");
        setImage(null);
        setScore("");
        setExamId("");
      })
      .catch(() => {
        toast.error("Error adding question");
      });
  };

  return (
    <div className="ltr">
      <div className="main-title flex justify-between items-center p-5">
        <h3 className="text-[18px] font-bold">Add Question</h3>
        <p className="text-[#67748E]">Pages / Add Question</p>
      </div>
      <div className="Add-Question">
        <form onSubmit={handleSubmit}>
          <div className="grid p-5 gap-2 mb-1 md:grid-cols-2">
            <div>
              <label htmlFor="text" className="block text-sm font-medium">Question Text</label>
              <input
                type="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Question Text"
                required
              />
            </div>
            <div>
              <label htmlFor="correctAnswer" className="block text-sm font-medium">Correct Answer</label>
              <input
                type="text"
                id="correctAnswer"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Correct Answer"
                required
              />
            </div>
            <div>
              <label htmlFor="option1" className="block text-sm font-medium">Option 1</label>
              <input
                type="text"
                id="option1"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Option 1"
                required
              />
            </div>
            <div>
              <label htmlFor="option2" className="block text-sm font-medium">Option 2</label>
              <input
                type="text"
                id="option2"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Option 2"
                required
              />
            </div>
            <div>
              <label htmlFor="option3" className="block text-sm font-medium">Option 3</label>
              <input
                type="text"
                id="option3"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Option 3"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium">Image</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="bg-[#F1F5FF] border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
              />
            </div>
            <div>
              <label htmlFor="score" className="block text-sm font-medium">Score</label>
              <input
                type="number"
                id="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="bg-[#F1F5FF] focus:bg-white border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:border-[#4fcb8d] outline-none duration-300"
                placeholder="Score"
                required
              />
            </div>
            <div>
              <label htmlFor="exam" className="block mb-1 text-sm font-medium">Select Exam</label>
              <select
                id="exam"
                className="bg-[#F1F5FF] focus:bg-white shadowSelect border rounded-3xl text-black focus:border-[#4fcb8d] outline-none text-sm w-full py-[15px] px-[20px] "
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                required
              >
                <option value="" disabled selected>Select Exam</option>
                {exams?.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="border-[1px] m-auto my-[10px] hover:text-black border-solid border-[#F43F5E] hover:rounded-2xl flex items-center p-[10px] gap-1 rounded bg-[#F43F5E] text-white py-2 px-6 focus:outline-none hover:bg-transparent duration-300 hover:scale-105"
          >
            {loading ? "Loading..." : "Add Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
