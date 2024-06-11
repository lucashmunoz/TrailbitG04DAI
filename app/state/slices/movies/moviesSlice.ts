import { createSlice } from "@reduxjs/toolkit";
import { fetchMoviesBySearch, fetchPopularMovies } from "./asyncThunks";
import { Movie } from "../../../ui/types/movie";

interface MoviesState {
  loading: boolean;
  moviesBySearch: Movie[];
  popularMovies: Movie[];
  typeOfResponse: "popular" | "input";
  error: string;
}

const initialState: MoviesState = {
  loading: true,
  moviesBySearch: [],
  popularMovies: [],
  typeOfResponse: "popular",
  error: ""
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {},
  selectors: {
    selectTypeOfResponse: state => state.typeOfResponse,
    selectMoviesBySearch: state => state.moviesBySearch,
    selectPopularMovies: state => state.popularMovies
  },
  extraReducers: builder => {
    builder.addCase(fetchPopularMovies.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, response) => {
      state.loading = false;
      state.popularMovies = response.payload;
      state.typeOfResponse = "popular";
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
      state.moviesBySearch = response.payload;
      state.typeOfResponse = "input";
      state.error = "";
    });
    builder.addCase(fetchMoviesBySearch.rejected, (state, response) => {
      state.loading = false;
      state.error = response.error.message || "error";
    });
  }
});

export const {
  selectTypeOfResponse,
  selectMoviesBySearch,
  selectPopularMovies
} = moviesSlice.selectors;

export default moviesSlice;
