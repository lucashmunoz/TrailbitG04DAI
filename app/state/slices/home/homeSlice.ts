import { createSlice } from "@reduxjs/toolkit";
import { fetchGenres } from "./asyncThunks";

interface HomeState {
  genres: Array<{ id: string; name: string }>;
  loading: boolean;
  error: string;
}

const initialState: HomeState = {
  genres: [],
  loading: false,
  error: ""
};

const homeSlice = createSlice({
  name: "genres",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGenres.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchGenres.fulfilled, (state, response) => {
      state.loading = false;
      state.genres = response.payload;
      state.error = "";
    });
    builder.addCase(fetchGenres.rejected, (state, response) => {
      state.loading = false;
      state.error = response.error.message || "error";
    });
  }
});

export default homeSlice;
