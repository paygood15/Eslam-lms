// src/slices/orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
   async (orderData, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
 
 
    const response = await axios.post(`${REACT_APP_API_URL}/api/v1/orders`, orderData,
   
    {
           
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const approveOrder = createAsyncThunk(
  'orders/approveOrder'
  , async (orderId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${REACT_APP_API_URL}/api/v1/orders/${orderId}/approve`,
    {}, // في حالة عدم إرسال بيانات ضمن الـ body
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const rejectOrder = createAsyncThunk(
  'orders/rejectOrder',
   async (orderId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${REACT_APP_API_URL}/api/v1/orders/${orderId}/reject`,
      {}, // في حالة عدم إرسال بيانات ضمن الـ body
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders', 
  async ( thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/orders?limit=100000`,
    {
         
      headers: {
        Authorization: `Bearer ${token}`
      }
    } )
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getStudentOrders = createAsyncThunk(
  'orders/getStudentOrders',
 async (paginationParams, thunkAPI) => {
  try {
    const { page, limit } = paginationParams;
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/orders`, { params: { page, limit } });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    order: null,
    status: 'idle',
    error: null,
    totalItems: 0,
    totalPages: 0,
    currentPage: 1
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
        console.log(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(approveOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(approveOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedOrder = action.payload;
        
      })
      .addCase(approveOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(rejectOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(rejectOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      })
      .addCase(rejectOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
        console.log(action.payload);
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(getStudentOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStudentOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
        state.totalItems = action.payload.pagination.totalItems;
        state.totalPages = action.payload.pagination.totalPages;
        state.currentPage = action.payload.pagination.currentPage;
      })
      .addCase(getStudentOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default orderSlice.reducer;
