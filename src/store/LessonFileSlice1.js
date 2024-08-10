// src/features/lessonFiles/lessonFilesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Create Lesson File
export const createLessonFile = createAsyncThunk(
  'lessonFiles/createLessonFile',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/lessonFiles`, formData,
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

// Get All Lesson Files
export const getAllLessonFiles = createAsyncThunk(
  'lessonFiles/getAllLessonFiles',
  async ( rejectWithValue ) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/lessonFiles?limit=1000000`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Lesson File
export const getLessonFile = createAsyncThunk(
  'lessonFiles/getLessonFile',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/lessonFiles/${id}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Lesson File
export const updateLessonFile = createAsyncThunk(
  'lessonFiles/updateLessonFile',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      console.log(updatedData);
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${REACT_APP_API_URL}/api/v1/lessonFiles/${id}`, updatedData,
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

// Delete Lesson File
export const deleteLessonFile = createAsyncThunk(
  'lessonFiles/deleteLessonFile',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${REACT_APP_API_URL}/api/v1/lessonFiles/${id}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      console.log(error);
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const lessonFilesSlice = createSlice({
  name: 'lessonFiles',
  initialState: {
    lessonFiles: [],
    loading: false,
    lessonFile: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLessonFile.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(createLessonFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.lessonFiles.push(action.payload);
        console.log(action.payload);
      })
      .addCase(createLessonFile.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(getAllLessonFiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllLessonFiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lessonFiles = action.payload;
        console.log(action.payload);
      })
      .addCase(getAllLessonFiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(getLessonFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLessonFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lessonFile = action.payload;
      })
      .addCase(getLessonFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateLessonFile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateLessonFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
      console.log(action.payload);
      })
      .addCase(updateLessonFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(deleteLessonFile.pending, (state) => {
        state.status = 'loading';
        console.log("load");
      })
      .addCase(deleteLessonFile.fulfilled, (state, action) => {
        state.status = 'succeeded';
      console.log(action.payload);
      })
      .addCase(deleteLessonFile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log(action.payload);
      });
  },
});

export default lessonFilesSlice.reducer;
