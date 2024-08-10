// slices/couponSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  coupons: [],
  coupon: null,
  status: 'idle',
  error: null,
};

// Async thunk actions
export const fetchAllCoupons = createAsyncThunk(
  'coupons/fetchAll',
  async ({ page = 1, limit = 10 }) => {
    const response = await axios.get('/api/coupons', { params: { page, limit } });
    return response.data;
  }
);

export const fetchCouponByCourse = createAsyncThunk(
  'coupons/fetchByCourse',
  async ({ courseId, page = 1, limit = 10 }) => {
    const response = await axios.get(`/api/coupons/course/${courseId}`, { params: { page, limit } });
    return response.data;
  }
);

export const createCoupon = createAsyncThunk(
  'coupons/create',
  async (couponData) => {
    const response = await axios.post('/api/coupons', couponData);
    return response.data;
  }
);

export const updateCoupon = createAsyncThunk(
  'coupons/update',
  async ({ couponId, updates }) => {
    const response = await axios.put(`/api/coupons/${couponId}`, updates);
    return response.data;
  }
);

export const deleteCoupon = createAsyncThunk(
  'coupons/delete',
  async (couponId) => {
    const response = await axios.delete(`/api/coupons/${couponId}`);
    return couponId;
  }
);

// Create the slice
const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoupons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coupons = action.payload.data;
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCouponByCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCouponByCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coupons = action.payload.data;
      })
      .addCase(fetchCouponByCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCoupon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coupons.push(action.payload.newCoupon);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.coupons.findIndex(coupon => coupon._id === action.payload.coupon._id);
        if (index >= 0) {
          state.coupons[index] = action.payload.coupon;
        }
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coupons = state.coupons.filter(coupon => coupon._id !== action.payload);
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default couponSlice.reducer;
