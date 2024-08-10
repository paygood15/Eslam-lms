// src/slices/courseSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  courses: [],
  doors: [],
  lessons: [],
  courseDetails: {},
  status: 'idle',
  error: null,
  pagination: {
    currentPage: 1,
    totalPagesCourses: 1,
    totalPagesDoors: 1,
  },
};

// Thunks
export const fetchLoggedUserCourses = createAsyncThunk(
  'courses/fetchLoggedUserCourses',
  async ( rejectWithValue ) => {

    try {
      const token = localStorage.getItem('token');
   
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/studentCourse/my-courses`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCourseDetails = createAsyncThunk(
  'courses/fetchCourseDetails',
  async (courseId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
         const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/studentCourse/${courseId}`, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchStudentCourses = createAsyncThunk(
  'courses/fetchStudentCourses',
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/student/${studentId}/courses`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedUserCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedUserCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
    console.log(action.payload);
      })
      .addCase(fetchLoggedUserCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchCourseDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courseDetails = action.payload;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchStudentCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload.courses;
        state.doors = action.payload.doors;
      })
      .addCase(fetchStudentCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
