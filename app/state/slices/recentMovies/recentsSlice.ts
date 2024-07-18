import { createSlice } from "@reduxjs/toolkit";
import { fetchRecentMovies } from "./asyncThunks";
import { Movie } from "../../../ui/types/movie";

interface RecentMoviesState {
  loading: boolean;
  recentMovies: Movie[];
  error: string;
}

const initialState: RecentMoviesState = {
  loading: true,
  recentMovies: [],
  error: ""
};

const recentMoviesSlice = createSlice({
  name: "recentMovies",
  initialState: initialState,
  reducers: {},
  selectors: {
    selectRecentMovies: state => state.recentMovies
  },
  extraReducers: builder => {
    builder.addCase(fetchRecentMovies.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchRecentMovies.fulfilled, (state, response) => {
      const page = response.payload.page;

      state.loading = false;
      state.recentMovies =
        page === 1
          ? response.payload.movies
          : [...state.recentMovies, ...response.payload.movies];
      state.error = "";
    });
    builder.addCase(fetchRecentMovies.rejected, (state, response) => {
      state.loading = false;
      state.error = response.error.message || "error";
    });
  }
});

export const { selectRecentMovies } = recentMoviesSlice.selectors;

export default recentMoviesSlice;
