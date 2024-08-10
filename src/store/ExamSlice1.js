// redux/slices/examSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for exams
const initialState = {
  exams: [],
  exam: null,
  ExamAnswers : [],
  questAdmin: null,
  studentExams: [],
  statistics: {},
  examAdmin:null,
  lessonStatistics: {},
  loading: false,
  error: null,
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswers: {}, // Store answers by questionId
};

// Define async thunks for each action
export const createExam = createAsyncThunk(
  'exam/createExam',
  async (examData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/exams/create`, examData,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getExams = createAsyncThunk(
  'exam/getExams',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/exams?limit=1000000`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getSingleExamAdmin = createAsyncThunk(
  'exam/getSingleExamAdmin',
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
console.log(examId);
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/exams/admin/${examId}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSinglequestationAdmin = createAsyncThunk(
  'exam/getSinglequestationAdmin',
  async ({ examId, questionId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
console.log(examId);
console.log(questionId);
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/exams/admin/${examId}/questions/${questionId}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addQuestion = createAsyncThunk(
  'exam/addQuestion',
  async ({ examId, questionData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/exams/${examId}/add-question`, questionData,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const startStudentExam = createAsyncThunk(
  'exam/startStudentExam',
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/exams/${examId}/start`,
      {}, // في حالة عدم إرسال بيانات ضمن الـ body
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const answerStudentQuestion = createAsyncThunk(
  'exam/answerStudentQuestion',
  async ({ examId, questionId, answer }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v1/exams/${examId}/answer-question/${questionId}`, // Construct API endpoint
        { answer }, // Send answer in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers for authentication
          },
        }
      );
      return response.data; // Return the response data from the API
    } catch (error) {
      console.error('Failed to answer question:', error); // Log error for debugging
      return rejectWithValue(error.response?.data || 'An error occurred'); // Return a rejected value with error details
    }
  }
);

export const finishStudentExam = createAsyncThunk(
  'exam/finishStudentExam',
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${REACT_APP_API_URL}/api/v1/exams/${examId}/finish`,
        {}, // Empty object for request body if no data is being sent
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentExamHistory = createAsyncThunk(
  'exam/getStudentExamHistory',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/exams/history`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateExam = createAsyncThunk(
  'exam/updateExam',
  async ({ id, examData }, { rejectWithValue }) => {
    try {

      console.log(examData);
      const token = localStorage.getItem('token');
      const response = await axios.put(`${REACT_APP_API_URL}/api/v1/exams/${id}/update`,
       examData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers for authentication
        },
      }
    );
    console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateQuestion = createAsyncThunk(
  'exam/updateQuestion',
  async ({ examId, questionId, questionData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${REACT_APP_API_URL}/api/v1/exams/${examId}/update-question/${questionId}`, questionData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers for authentication
        },
      }
    );
    console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteExam = createAsyncThunk(
  'exam/deleteExam',
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${REACT_APP_API_URL}/api/v1/exams/${examId}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers for authentication
        },
      }
    );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  'exam/deleteQuestion',
  async ({ examId, questionId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${REACT_APP_API_URL}/api/v1/exams/${examId}/questions/${questionId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStudentExamStatistics = createAsyncThunk(
  'exam/getStudentExamStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/exams/statistics`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers for authentication
        },
      }
    );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLessonExamStatistics = createAsyncThunk(
  'exam/getLessonExamStatistics',
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/exams/lessons/${lessonId}/statistics`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleExam = createAsyncThunk(
  'exam/getSingleExam',
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
console.log(examId);
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/exams/${examId}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    selectAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.selectedAnswers[questionId] = answer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exams.push(action.payload);
        console.log(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(getExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
        console.log(action.payload);
      })
      .addCase(getExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(addQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading = false;
     console.log(action.payload);
       
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(startStudentExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startStudentExam.fulfilled, (state, action) => {
        state.loading = false;
        state.studentExams.push(action.payload);
        console.log(action.payload);
      })
      .addCase(startStudentExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(answerStudentQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(answerStudentQuestion.fulfilled, (state, action) => {
        state.loading = false;
        // const studentExam = state.studentExams.find(exam => exam._id === action.payload._id);
        // if (studentExam) {
        //   const answer = studentExam.answers.find(answer => answer.questionId === action.payload.questionId);
        //   if (answer) {
        //     answer.answer = action.payload.answer;
        //     answer.score = action.payload.score;
        //   } else {
        //     studentExam.answers.push(action.payload);
        //   }
        // }
        console.log(action.payload);
        state.ExamAnswers = action.payload
      })
      .addCase(answerStudentQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action);
        console.log(action.payload);
      })
      .addCase(finishStudentExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finishStudentExam.fulfilled, (state, action) => {
        state.loading = false;
       console.log(action.payload);
      })
      .addCase(finishStudentExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(getStudentExamHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentExamHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.studentExams = action.payload;
      })
      .addCase(getStudentExamHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
       
        
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(deleteExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.loading = false;
      console.log(action.payload);
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
      
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStudentExamStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentExamStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(getStudentExamStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLessonExamStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLessonExamStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.lessonStatistics = action.payload;
      })
      .addCase(getLessonExamStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleExam.fulfilled, (state, action) => {
        state.loading = false;
        state.exam = action.payload;
        console.log(action.payload);

        state.questions = action.payload.questions; // Assuming 'questions' is a field in the exam response
        state.currentQuestionIndex = 0; // Reset to the first question
      })
      .addCase(getSingleExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(  getSingleExamAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(  getSingleExamAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.examAdmin = action.payload;
        console.log(action.payload);

        
      })
      .addCase(getSingleExamAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(  getSinglequestationAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(  getSinglequestationAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.questAdmin = action.payload;
        console.log(action.payload);

        
      })
      .addCase(getSinglequestationAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      
  },
});

export const { setCurrentQuestion, nextQuestion, previousQuestion, selectAnswer } = examSlice.actions;

export default examSlice.reducer;
