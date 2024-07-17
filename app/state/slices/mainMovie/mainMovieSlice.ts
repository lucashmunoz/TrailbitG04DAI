import { createSlice } from "@reduxjs/toolkit";
import { fetchMainMovie } from "./asyncThunks";

interface MainMovieDetail {
  id: number;
  images: Image[];
}

interface Image {
  id: string;
  file_path: string;
}

interface MainMoviesState {
  loading: boolean;
  mainMovie: MainMovieDetail;
  error: string;
}

const initialState: MainMoviesState = {
  loading: true,
  mainMovie: {
    id: 0,
    images: []
  },
  error: ""
};

export const mainMovieSlice = createSlice({
  name: "main movie",
  initialState: initialState,
  reducers: {},
  selectors: {},
  extraReducers: builder => {
    builder.addCase(fetchMainMovie.fulfilled, (state, response) => {
      state.loading = false;
      state.mainMovie = response.payload;
      state.error = "";
    });
    builder.addCase(fetchMainMovie.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchMainMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  }
});

export default mainMovieSlice;
