// static.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// تعريف createAsyncThunk لكل عملية
export const GetAllStatic = createAsyncThunk(
  'GetAllStatic/GetAllStatic',
  async (thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/statistics`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// إنشاء slice
const StaticSlice = createSlice({
  name: 'Static',
  initialState: {
    Static: [],

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // حالات جلب كل الدروس
      .addCase(GetAllStatic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllStatic.fulfilled, (state, action) => {
        state.loading = false;
        state.Static = action.payload;
        console.log(action.payload);
      })
      .addCase(GetAllStatic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
 
  },
});

export default StaticSlice.reducer;
