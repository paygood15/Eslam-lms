// store/examSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [
    {
      id: 1,
      question: 'إذا علمت أن طاقة الفوتون المستخدم في الميكروسكوب الضوئي تساوي 499.88x10^-21 J وكمية تحرك الشعاع الإلكتروني في الميكروسكوب الإلكتروني تساوي 7.626x10^-23 Kg.m.s^-1، إذا يمكن رؤية جسم أبعاده 400nm بواسطة...',
      options: [
        'الميكروسكوب الضوئي فقط',
        'الميكروسكوب الإلكتروني فقط',
        'sads',
        'العين فقط'
      ],
      answer: 'الميكروسكوب الضوئي فقط'
    },
    {
        id: 1,
        question:           'العين فقط',
        options: [
          'الميكروسكوب الضوئي فقط',
          'الميكروسكوب الإلكتروني فقط',
          'الميكروسكوب الضوئي والإلكتروني',
          'العين فقط'
        ],
        answer: 'الميكروسكوب الضوئي فقط'
      },
      {
        id: 1,
        question:'الميكروسكوب الإلكتروني فقط',
        options: [
          'الميكروسكوب الضوئي فقط',
          'الميكروسكوب الإلكتروني فقط',
          'الميكروسكوب الضوئي والإلكتروني',
          'العين فقط'
        ],
        answer: 'الميكروسكوب الضوئي فقط'
      },
      {
        id: 1,
        question: 'إذا علمت أن طاقة الفوتون المستخدم في الميكروسكوب الضوئي تساوي 499.88x10^-21 J وكمية تحرك الشعاع الإلكتروني في الميكروسكوب الإلكتروني تساوي 7.626x10^-23 Kg.m.s^-1، إذا يمكن رؤية جسم أبعاده 400nm بواسطة...',
        options: [
          'الميكروسكوب الضوئي فقط',
          'الميكروسكوب الإلكتروني فقط',
          'الميكروسكوب الضوئي والإلكتروني',
          'العين فقط'
        ],
        answer: 'الميكروسكوب الضوئي فقط'
      },
    // Add more questions here
  ],
  currentQuestionIndex: 0,
  selectedAnswers: {},
  
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    selectAnswer(state, action) {
      const { questionId, answer } = action.payload;
      state.selectedAnswers[questionId] = answer;
    },
    setCurrentQuestion(state, action) {
      state.currentQuestionIndex = action.payload;
    }
  },
});

export const { nextQuestion, previousQuestion, selectAnswer, setCurrentQuestion } = examSlice.actions;
export default examSlice.reducer;
