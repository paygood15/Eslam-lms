import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSingleExam, answerStudentQuestion, finishStudentExam } from '../store/ExamSlice1';
import { FaRegQuestionCircle } from "react-icons/fa";

const Question = () => {
  const dispatch = useDispatch();
  const { exam, currentQuestionIndex, loading, ExamAnswers, error } = useSelector((state) => state.ExamSlice1);
  const { id } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // حالة للتحكم في إظهار النافذة المنبثقة
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleExam(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (exam) {
      const endTime = new Date(exam.endTime).getTime();
      const startTime = new Date(exam.startTime).getTime();
      const savedTimeLeft = localStorage.getItem(`timeLeft-${id}`);

      if (savedTimeLeft) {
        setTimeLeft(parseInt(savedTimeLeft, 10));
      } else {
        setTimeLeft(Math.floor((endTime - startTime) / 1000));
      }
    }
  }, [exam, id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTimeLeft = prevTime - 1;
          localStorage.setItem(`timeLeft-${id}`, newTimeLeft);
          return newTimeLeft;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      toast.info('انتهى وقت الامتحان. تم إنهاء الامتحان تلقائيًا.');

      const finishExamTimeout = setTimeout(() => {
        handleFinishExam();
      }, 3000);

      return () => clearTimeout(finishExamTimeout);
    }
  }, [timeLeft, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleOptionChange = (event) => {
    const { value } = event.target;
    const questionId = exam.questions[currentQuestionIndex]._id;
    
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
    
    if (exam) {
      dispatch(answerStudentQuestion({
        examId: id,
        questionId,
        answer: value,
      }));
    }
  };

  const handleFinishExam = () => {
    localStorage.removeItem(`timeLeft-${id}`);
    
    dispatch(finishStudentExam(id))
      .then(() => {
        // إذا كانت الـ dispatch ناجحة، افتح النافذة المنبثقة
        setShowPopup(true);
      })
      .catch((error) => {
        // في حالة حدوث خطأ، يمكن إظهار رسالة خطأ هنا
        console.error("Error finishing the exam:", error);
        toast.error("حدث خطأ أثناء إنهاء الامتحان.");
      });
  };

  const handleNavigate = () => {
    setShowPopup(false);
    navigate('/UserMe');
  };

  if (!exam || !exam.questions) return <p>No exam found!</p>;

  const question = exam.questions[currentQuestionIndex];
  const selectedAnswerFromExamAnswers = ExamAnswers.answers?.find(
    (ans) => ans.questionId === question._id
  )?.answer;
  
  const selectedAnswer = selectedAnswers[question._id] || selectedAnswerFromExamAnswers;

  return (
    <div className="py-5 shadow">
      <p className="text-white p-[6px] w-fit rounded-[12px] m-auto text-center bg-[#F43F5E]">Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>

      <ToastContainer />
      <h3 className="text-2xl mt-2 font-bold flex items-center gap-3">
        <span className="text-blue-400 text-5xl">
          <FaRegQuestionCircle />
        </span>
        {question?.text}
      </h3>
      {loading ? "Loading..":""}
      <ul className="py-4 px-16">
        {question?.options.map((option, index) => (
          <li className="py-4" key={index}>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option}
                onChange={handleOptionChange}
                checked={selectedAnswer === option}
                className="form-radio h-5 w-5 text-blue-600 cursor-pointer"
              />
              <span className={selectedAnswer === option ? 'bg-lightblue' : ''}>
                {option}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleFinishExam}
        className="text-white p-[6px] w-fit rounded-[12px] m-auto flex items-center bg-[#F43F5E] "
      >
        {'إنهاء الامتحان'}
      </button>

      {/* النافذة المنبثقة */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="mb-4">شوف نتيجتك</p>
            <button
              onClick={handleNavigate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              شوف نتيجتك
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
