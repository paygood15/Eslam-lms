import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  doorlesson: [],
  doorlesson : null,
  doors: [],
  door: null,
  loading: false,
  status: 'idle',
  error: null,
  pagination: {
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
  },
};

// ثنك لجلب جميع الأبواب مع التصفح والبحث
export const fetchDoors = createAsyncThunk(
  'doors/fetchDoors',
  async (_, { rejectWithValue }) => { // Fixed rejectWithValue position
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/products?limit=1000000`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ثنك لجلب باب محدد بواسطة معرفه
export const fetchDoorById = createAsyncThunk(
  'doors/fetchDoorById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ثنك لجلب درس محدد بواسطة معرف الباب
export const fetchDoorLessonById = createAsyncThunk(
  'doors/fetchDoorLessonById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/lessons/door/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ثنك لإضافة باب جديد
export const addDoor = createAsyncThunk(
  'doors/addDoor',
  async (doorData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/products`, doorData,
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

// ثنك لتحديث باب موجود
export const updateDoor = createAsyncThunk(
  'doors/updateDoor',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${REACT_APP_API_URL}/api/v1/products/${id}`, updatedData,
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

// ثنك لحذف باب
export const deleteDoor = createAsyncThunk(
  'doors/deleteDoor',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${REACT_APP_API_URL}/api/v1/products/${id}`,
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

const doorsSlice = createSlice({
  name: 'doors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doors = action.payload;
        state.pagination = action.payload.pagination;
        console.log('Doors fetched:', action.payload);
      })
      .addCase(fetchDoors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchDoorById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoorById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.door = action.payload;
        console.log('Door fetched by ID:', action.payload);
      })
      .addCase(fetchDoorById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log('Doors fetched:ID', action.payload);
      })
      .addCase(fetchDoorLessonById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoorLessonById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doorlesson = action.payload;
        console.log('Lesson fetched by door ID:', action.payload);
      })
      .addCase(fetchDoorLessonById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addDoor.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(addDoor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.doors.push(action.payload);
        console.log('Door added:', action.payload);
      })
      .addCase(addDoor.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateDoor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateDoor.fulfilled, (state, action) => {
        state.status = 'succeeded';
      
       
        console.log('Door updated:', action.payload);
      })
      .addCase(updateDoor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log('Door updated:', action.payload);
      })
      .addCase(deleteDoor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteDoor.fulfilled, (state, action) => {
        state.status = 'succeeded';

        console.log('Door deleted:', action.payload);
      })
      .addCase(deleteDoor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default doorsSlice.reducer;
