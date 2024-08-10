// lessonSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// تعريف createAsyncThunk لكل عملية
export const fetchAllLessons = createAsyncThunk(
  'lessons/fetchAll',
  async (thunkAPI) => {
    try {

      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/lessons?limit=1000000`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchLessonById = createAsyncThunk(
  'lessons/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/lessons/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createLesson = createAsyncThunk(
  'lessons/create',
  async (lessonData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/lessons`, lessonData,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      console.log(error);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateLesson = createAsyncThunk(
  'lessons/update',
  async ({ id, lessonData }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${REACT_APP_API_URL}/api/v1/lessons/${id}`, lessonData,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  'lessons/delete',
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${REACT_APP_API_URL}/api/v1/lessons/${id}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const recordLessonView = createAsyncThunk(
  'lessons/recordView',
  async ({ lessonId }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/lessons/record-view`, { lessonId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentLessonStatistics = createAsyncThunk(
  'lessons/fetchStudentStatistics',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/lessons/statistics`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllStudentLessonStatistics = createAsyncThunk(
  'lessons/fetchAllStudentStatistics',
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const params = { page, limit };
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/lessons/admin/statistics`, { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إنشاء slice
const lessonSlice = createSlice({
  name: 'lessons',
  initialState: {
    lessons: [],
    lesson: null,
    studentStatistics: {},
    allStudentStatistics: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // حالات جلب كل الدروس
      .addCase(fetchAllLessons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLessons.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchAllLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      // حالات جلب درس معين
      .addCase(fetchLessonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      // حالات إضافة درس
      .addCase(createLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lessons.push(action.payload.data);
        console.log(action.payload);
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);

      })
      // حالات تحديث درس
      .addCase(updateLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLesson.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        
      })
      .addCase(updateLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      // حالات حذف درس
      .addCase(deleteLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.loading = false;
   
      })
      .addCase(deleteLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حالات تسجيل مشاهدة درس
      .addCase(recordLessonView.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recordLessonView.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(recordLessonView.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حالات جلب إحصائيات الطالب
      .addCase(fetchStudentLessonStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentLessonStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.studentStatistics = action.payload;
      })
      .addCase(fetchStudentLessonStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // حالات جلب إحصائيات جميع الطلاب
      .addCase(fetchAllStudentLessonStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudentLessonStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.allStudentStatistics = action.payload.statistics;
      })
      .addCase(fetchAllStudentLessonStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default lessonSlice.reducer;
