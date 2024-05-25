import { createSlice } from "@reduxjs/toolkit";
import { fetchMoviesBySearch, fetchPopularMovies } from "./asyncThunks";
import { Movie } from "../../../ui/types/movie";

interface MoviesState {
  loading: boolean;
  movies: Movie[];
  error: string;
}

const initialState: MoviesState = {
  loading: false,
  movies: [],
  error: ""
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPopularMovies.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, response) => {
      state.loading = false;
      state.movies = response.payload;
      state.error = "";
    });
    builder.addCase(fetchPopularMovies.rejected, (state, response) => {
      state.loading = false;
      state.error = response.error.message || "error";
    });
    builder.addCase(fetchMoviesBySearch.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchMoviesBySearch.fulfilled, (state, response) => {
      state.loading = false;
      state.movies = response.payload;
      state.error = "";
    });
    builder.addCase(fetchMoviesBySearch.rejected, (state, response) => {
      state.loading = false;
      state.error = response.error.message || "error";
    });
  }
});

export const {} = moviesSlice.actions;

export default moviesSlice;
