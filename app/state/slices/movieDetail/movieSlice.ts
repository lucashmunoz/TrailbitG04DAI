import { MovieDetail } from "./../../../ui/types/movieDetail";
import { createSlice } from "@reduxjs/toolkit";
import {
  addFavoriteMovie,
  addVote,
  deleteFavoriteMovie,
  fetchMovieDetail
} from "./asyncThunks";

interface MovieState {
  loading: boolean;
  movieById: MovieDetail;
  favorite: boolean;
  voteUpdate: boolean;
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
  voteUpdate: false,
  favorite: false,
  error: ""
};

export const moviesSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {},
  selectors: {
    selectMovieById: state => state.movieById,
    selectFavorite: state => state.favorite,
    selectVoteUpdate: state => state.voteUpdate
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
    builder.addCase(addFavoriteMovie.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addFavoriteMovie.fulfilled, (state, response) => {
      state.loading = false;
      state.favorite = true;
      state.error = "";
    });
    builder.addCase(addFavoriteMovie.rejected, (state, response) => {
      state.loading = false;
      state.error = response.error.message || "error";
    });
    builder.addCase(deleteFavoriteMovie.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteFavoriteMovie.fulfilled, (state, response) => {
      state.loading = false;
      state.favorite = false;
      state.error = "";
    });
    builder.addCase(deleteFavoriteMovie.rejected, (state, response) => {
      state.loading = false;
      state.error = response.error.message || "error";
    });
    builder.addCase(addVote.pending, state => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addVote.fulfilled, (state, response) => {
      state.loading = false;
      state.voteUpdate = true;
      state.error = "";
    });
    builder.addCase(addVote.rejected, (state, response) => {
      state.loading = false;
      state.error = response.error.message || "error";
    });
  }
});

export const { selectMovieById, selectFavorite, selectVoteUpdate } =
  moviesSlice.selectors;

export default moviesSlice;
