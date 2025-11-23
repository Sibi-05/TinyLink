import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Fetch all links
export const fetchLinks = createAsyncThunk("links/fetchAll", async () => {
  const res = await api.get("/api/links");
  return res.data;
});

// Fetch single link (StatsPage)
export const fetchLink = createAsyncThunk("links/fetchOne", async (code, thunkAPI) => {
  try {
    const res = await api.get(`/api/links/${code}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Link not found");
  }
});

// Add link
export const addLink = createAsyncThunk(
  "links/add",
  async (payload, thunkAPI) => {
    try {
      const res = await api.post("/api/links", payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || "Something went wrong");
    }
  }
);

// Delete link
export const deleteLink = createAsyncThunk("links/delete", async (code) => {
  await api.delete(`/api/links/${code}`);
  const res = await api.get("/api/links");
  return res.data;
});

const linksSlice = createSlice({
  name: "links",
  initialState: {
    all: [],
    single: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchLinks.fulfilled, (state, action) => {
        state.all = action.payload;
      })

      // Fetch Single
      .addCase(fetchLink.fulfilled, (state, action) => {
        state.single = action.payload;
        state.error = null;
      })
      .addCase(fetchLink.rejected, (state, action) => {
        state.single = null;
        state.error = action.payload;
      })

      // Add link
      .addCase(addLink.fulfilled, (state, action) => {
        state.all.push(action.payload);
        state.error = null;
      })
      .addCase(addLink.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete link
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.all = action.payload;
      });
  },
});

export default linksSlice.reducer;
