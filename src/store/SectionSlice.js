import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// جلب جميع الأقسام
export const fetchAllSections = createAsyncThunk(
  'sections/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/sections?limit=1000000`,
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

// جلب قسم معين
export const fetchSection = createAsyncThunk(
  'sections/fetchSection',
  async (id, { rejectWithValue }) => {
    try {

      const response = await axios.get(`${REACT_APP_API_URL}/api/v1/sections/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// إنشاء قسم جديد
export const createSection = createAsyncThunk(
  'sections/createSection',
  async (sectionData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_API_URL}/api/v1/sections`, sectionData,
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

// تحديث قسم معين
export const updateSection = createAsyncThunk(
  'sections/updateSection',
  async ({ id, sectionData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${REACT_APP_API_URL}/api/v1/sections/${id}`, sectionData,
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

// حذف قسم معين
export const deleteSection = createAsyncThunk(
  'sections/deleteSection',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${REACT_APP_API_URL}/api/v1/section/${id}`,
      {
           
        headers: {
          Authorization: `Bearer ${token}`
        }
      } )
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// تعريف الـ slice
const sectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [],
    section: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchAllSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchSection.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSection.fulfilled, (state, action) => {
        state.loading = false;
        state.section = action.payload;
      })
      .addCase(fetchSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSection.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload);
        console.log(action.payload);
      })
      .addCase(createSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(updateSection.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
      })
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;

      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sectionsSlice.reducer;
