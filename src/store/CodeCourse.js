// src/slices/accessCodeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// الحالة الأولية
const initialState = {
  accessCodes: [],
  accessCode: null,
  loading: false,
  error: null,
};

// إنشاء كود دخول جديد
export const createAccessCode = createAsyncThunk(
  'accessCodes/createAccessCode',
  async (accessCodeData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/accessCode/create`, accessCodeData,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      console.log(response);
      return response.data.accessCode;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// الحصول على جميع أكواد الدخول
export const fetchAccessCodes = createAsyncThunk(
  'accessCodes/fetchAccessCodes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/accessCode?limit=1000000`);
      return response.data.accessCodes;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// الحصول على كود دخول معين
export const fetchAccessCodeById = createAsyncThunk(
  'accessCodes/fetchAccessCodeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/accessCode/${id}`);
      return response.data.accessCode;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// تحديث كود دخول
export const updateAccessCode = createAsyncThunk(
  'accessCodes/updateAccessCode',
  async ({ id, accessCodeData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${REACT_APP_API_URL}/api/v1/accessCode/${id}`, accessCodeData,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return response.data.accessCode;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// حذف كود دخول
export const deleteAccessCode = createAsyncThunk(
  'accessCodes/deleteAccessCode',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${REACT_APP_API_URL}/api/v1/accessCode/${id}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const accessCodeSlice = createSlice({
  name: 'accessCodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccessCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccessCode.fulfilled, (state, action) => {
        state.loading = false;
        state.accessCodes.push(action.payload);
        console.log(action.payload);
      })
      .addCase(createAccessCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchAccessCodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccessCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.accessCodes = action.payload;
      })
      .addCase(fetchAccessCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAccessCodeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccessCodeById.fulfilled, (state, action) => {
        state.loading = false;
        state.accessCode = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchAccessCodeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(updateAccessCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccessCode.fulfilled, (state, action) => {
        state.loading = false;
 
      })
      .addCase(updateAccessCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccessCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccessCode.fulfilled, (state, action) => {
        state.loading = false;
 
      })
      .addCase(deleteAccessCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accessCodeSlice.reducer;
