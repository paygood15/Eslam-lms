// src/slices/courseSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  courses: [],
  course: null,
  status: 'idle',
  initCourse: null,
  error: null,
  isLoading: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  },
};

// Thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (  rejectWithValue ) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/subcategories?limit=1000000`);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/subcategories/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const GetOrderByCourse = createAsyncThunk(
  'courses/GetOrderByCourse',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/orders/student/subcategory/${id}`,
      
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addCourse = createAsyncThunk(
  'courses/addCuorse',
  async (courseData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/subcategories`, courseData,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({ id, courseData }, { rejectWithValue }) => {
    console.log(courseData, "data err");
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${REACT_APP_API_URL}/api/v1/subcategories/${id}`, courseData,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/deleteCourse',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${REACT_APP_API_URL}/api/v1/subcategories/${id}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const addDescription = createAsyncThunk(
//   'courses/addDescription',
//   async ({ id, descriptionData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`/api/courses/${id}/descriptions`, descriptionData);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const updateDescription = createAsyncThunk(
//   'courses/updateDescription',
//   async ({ id, descriptionId, descriptionData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`/api/courses/${id}/descriptions/${descriptionId}`, descriptionData);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const deleteDescription = createAsyncThunk(
//   'courses/deleteDescription',
//   async ({ id, descriptionId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`/api/courses/${id}/descriptions/${descriptionId}`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// Slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
        // state.pagination = {
        //   currentPage: action.payload.page,
        //   totalPages: action.payload.pagesCount,
        //   totalItems: action.payload.totalItems,
        //   limit: action.payload.limit,
        // };
        console.log(action.payload);
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log(action.payload);
        console.log(action);
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
        console.log(action.payload);
      })
      .addCase(GetOrderByCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetOrderByCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.initCourse = action.payload;
        console.log(action.payload);
      })
      .addCase(GetOrderByCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
        console.log(action.payload);
      })
      
      .addCase(addCourse.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.courses.push(action.payload);
        console.log(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        state.error = action.payload.error;
        console.log(action.payload);
        console.log(action.payload.error);
      })
      .addCase(updateCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.payload);
      })
      .addCase(deleteCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      // .addCase(addDescription.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(addDescription.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   const index = state.courses.findIndex(
      //     (course) => course._id === action.payload.data._id
      //   );
      //   state.courses[index] = action.payload.data;
      // })
      // .addCase(addDescription.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload.error;
      // })
      // .addCase(updateDescription.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(updateDescription.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   const index = state.courses.findIndex(
      //     (course) => course._id === action.payload.data._id
      //   );
      //   state.courses[index] = action.payload.data;
      // })
      // .addCase(updateDescription.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload.error;
      // })
      // .addCase(deleteDescription.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(deleteDescription.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   const index = state.courses.findIndex(
      //     (course) => course._id === action.payload.data._id
      //   );
      //   state.courses[index] = action.payload.data;
      // })
      // .addCase(deleteDescription.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload.error;
      // });
  },
});

export default courseSlice.reducer;
