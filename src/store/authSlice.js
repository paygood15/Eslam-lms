

// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/auth/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/auth/login`, credentials);
     
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyResetCode = createAsyncThunk(
  'auth/verifyResetCode',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/auth/verifyResetCode`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const Logout = createAsyncThunk(
  'auth/Logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/auth/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/auth/forgotPasswords`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/api/v1/auth/resetPassword`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  errorMessage: null,
  passwordResetSuccess: false,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        console.log("aa");
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("فشل");
        console.log(action.payload);
        console.log(action.payload.error);
        state.errorMessage = action.payload?.message || "Unknown error occurred";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        console.log(action.payload);
       
        localStorage.setItem("userEmail", action.payload.data.email);
        localStorage.setItem("userName", action.payload.data.name);
        localStorage.setItem("userPhone", action.payload.data.phone);
        localStorage.setItem("userRole", action.payload.data.role);
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyResetCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyResetCode.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(verifyResetCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.passwordResetSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.passwordResetSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;