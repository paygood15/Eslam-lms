import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, previousQuestion, setCurrentQuestion, getSingleExam } from '../store/ExamSlice1';
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentQuestionIndex, exam, loading } = useSelector((state) => state.ExamSlice1);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleExam(id));
  }, [dispatch, id]);

  if (!exam) return <p>No exam found!</p>;

  // Check if the exam has ended
  const hasExamEnded = new Date() > new Date(exam.endTime);

  const handleQuestionClick = (index) => {
    if (!hasExamEnded) {
      dispatch(setCurrentQuestion(index));
    }
  };

  return (
    <div className="p-[12px] border border-[#DBDFE3] my-[20px] mx-[50px] rounded-[12px] flex flex-col items-center bg-[#F3F4F6]">
      <h2 className="text-2xl text-white p-[6px] rounded-[12px] font-bold mb-4 bg-[#F43F5E]">{exam.title}</h2>
      <div className="flex flex-col items-center">
        <p className="text-sm m-[15px]">
          <span className='bg-[#F43F5E] text-white p-[6px] rounded-[10px] text-[16px]'>بداية الامتحان:</span>
          <span className='text-white p-[6px] text-[15px] rounded-[14px] bg-[#F43F5E]'>
            {format(new Date(exam.startTime), 'hh:mm a')}
          </span>
        </p>
        <p className="text-sm">
          <span className='bg-[#F43F5E] text-white p-[6px] rounded-[10px] text-[16px]'>نهاية الامتحان:</span>
          <span className='text-white p-[6px] text-[15px] rounded-[14px] bg-[#F43F5E]'>
            {format(new Date(exam.endTime), 'hh:mm a')}
          </span>
        </p>
      </div>

      {hasExamEnded ? (
        <div className="mt-4  p-[12px] bg-[#FF6B6B] text-white rounded-[12px]">
          <h3 className="text-xl font-bold">تم انتهاء الامتحان</h3>
          <p>لقد انتهى وقت الامتحان. لا يمكنك تعديل أو الإجابة على الأسئلة بعد الآن.</p>
          <button
        onClick={()=> {
          navigate("/")
        }}
        className="text-white p-[6px] mt-[15px] w-fit rounded-[12px] m-auto flex items-center bg-[#F43F5E] "
      >
        {"الصفحه الرئيسية"}
      </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-10 max-sm:grid-cols-8 gap-2 mt-[15px]">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(index)}
                className={`px-[14px] border text-white rounded-[10px] flex max-sm:py-[5px] max-sm:gap-2 max-sm:px-[15px] max-sm:justify-center max-sm:items-center ${currentQuestionIndex === index ? 'bg-[#F43F5E]' : 'bg-[#94A3B8]'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="w-[450px] m-auto my-[15px] h-[2px] bg-[#BCC0C6] rounded-lg smooth max-sm:w-full"></div>

          <div className="flex gap-4 ">
            <button
              onClick={() => dispatch(previousQuestion())}
              disabled={currentQuestionIndex === 0}
              className="bg-[#2DD4BF] text-white px-4 py-2 rounded disabled:opacity-50"
            >
              السابق
            </button>
            <button
              onClick={() => dispatch(nextQuestion())}
              disabled={currentQuestionIndex === exam.questions.length - 1}
              className="bg-[#2DD4BF] text-white px-4 py-2 rounded disabled:opacity-50"
            >
              التالي
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navigation;
