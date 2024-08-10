import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for your API
const API_URL = 'http://your-api-url.com/api';

// Async actions
export const addUser = createAsyncThunk('user/addUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => { // استخدم `_` للإشارة إلى عدم وجود معاملات قادمة
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/users?limit=1000000`, {        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSpecificUser = createAsyncThunk('user/getSpecificUser', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, userData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const changePassword = createAsyncThunk('user/changePassword', async ({ id, password }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}/change-password`, { password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${REACT_APP_API_URL}/api/v1/users/${id}`,
     
    {
           
      headers: {
        Authorization: `Bearer ${token}`
      }
    }  );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateLoggedUserPassword = createAsyncThunk('user/updateLoggedUserPassword', async (password, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/users/update-password`, { password });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateLoggedUserData = createAsyncThunk('user/updateLoggedUserData', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/users/update-data`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getLoggedUserData = createAsyncThunk('user/getLoggedUserData', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${REACT_APP_API_URL}/api/v1/users/getMe`,
     
    {
           
      headers: {
        Authorization: `Bearer ${token}`
      }
    }  );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const toggleUserStatus = createAsyncThunk('user/toggleUserStatus', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${API_URL}/users/${id}/toggle-status`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.data);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle other actions similarly
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        console.log(action.payload);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(getSpecificUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecificUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getSpecificUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
       
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLoggedUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoggedUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(updateLoggedUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLoggedUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoggedUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
      })
      .addCase(updateLoggedUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLoggedUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoggedUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getLoggedUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
