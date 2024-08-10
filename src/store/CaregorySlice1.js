// features/categories/categoriesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// إنشاء thunk للحصول على جميع الفئات
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/categories?limit=1000000`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إنشاء thunk للحصول على فئة محددة
export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/categories/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إنشاء thunk لتحديث فئة
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, data }, thunkAPI) => {
    try {
      console.log(data);
      const token = localStorage.getItem('token');
      const response = await axios.put(`${REACT_APP_API_URL}/api/v1/categories/${id}`, data,
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
  }
);

// إنشاء thunk لإضافة فئة جديدة
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/categories`, data,
        {
           
          headers: {
            Authorization: `Bearer ${token}`
          }
        } )
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// إنشاء thunk لحذف فئة
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${REACT_APP_API_URL}/api/v1/categories/${id}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return id; // نعيد الـ id لحذف الفئة من الواجهة
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    category: null,
    isLoading: false,
    status: 'idle',
    error: null,
    pagination: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // حالات fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      // حالات fetchCategoryById
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      // حالات updateCategory
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // تحديث الفئة في القائمة
        console.log(action.payload);
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.payload);
      })
      // حالات addCategory
      .addCase(addCategory.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoading = false;
        state.categories.push(action.payload);
        console.log(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoading = false;
        console.log(action.payload);
        state.error = action.payload;
      })
      // حالات deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default categoriesSlice.reducer;
