import { MovieDetail } from "./../../../ui/types/movieDetail";
import { createSlice } from "@reduxjs/toolkit";
import {
  rateMovie,
  fetchMovieDetail,
  toggleFavoriteMovie
} from "./asyncThunks";

interface MovieState {
  loading: boolean;
  movieById: MovieDetail;
  rateLoading: boolean;
  bookmarkLoading: boolean;
  error: string;
}

const initialState: MovieState = {
  loading: true,
  movieById: {
    id: 0,
    title: "",
    overview: "",
    runtime: 0,
    tagline: "",
    popularity: 0,
    poster_path: "",
    backdrop_path: "",
    release_date: "",
    duration: "",
    vote_average: 0,
    vote_count: 0,
    user_vote: 0,
    is_favorite: false,
    images: [],
    genres: [],
    videos: [],
    cast: [],
    director: {
      id: "",
      name: "",
      character: "",
      known_for_department: "",
      profile_path: ""
    }
  },
  rateLoading: false,
  bookmarkLoading: false,
  error: ""
};

export const moviesSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {},
  selectors: {
    selectMovieById: state => state.movieById,
    selectRateLoading: state => state.rateLoading,
    selectBookmarkLoading: state => state.bookmarkLoading
  },
  extraReducers: builder => {
    builder.addCase(fetchMovieDetail.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchMovieDetail.fulfilled, (state, response) => {
      state.loading = false;
      state.movieById = response.payload;
      state.error = "";
    });
    builder.addCase(fetchMovieDetail.rejected, (state, response) => {
      state.loading = false;
      state.error = response.error.message || "error";
    });
    builder.addCase(toggleFavoriteMovie.pending, state => {
      state.bookmarkLoading = true;
      state.error = "";
    });
    builder.addCase(toggleFavoriteMovie.fulfilled, (state, response) => {
      state.bookmarkLoading = false;
      state.movieById.is_favorite = response.payload.newFavoriteState;
      state.error = "";
    });
    builder.addCase(toggleFavoriteMovie.rejected, (state, response) => {
      state.bookmarkLoading = false;
      state.error = response.error.message || "error";
    });
    builder.addCase(rateMovie.pending, state => {
      state.rateLoading = true;
      state.error = "";
    });
    builder.addCase(rateMovie.fulfilled, (state, response) => {
      state.rateLoading = false;
      state.movieById.user_vote = response.payload.newVote;
      state.error = "";
    });
    builder.addCase(rateMovie.rejected, (state, response) => {
      state.rateLoading = false;
      state.error = response.error.message || "error";
    });
  }
});

export const { selectMovieById, selectRateLoading, selectBookmarkLoading } =
  moviesSlice.selectors;

export default moviesSlice;
