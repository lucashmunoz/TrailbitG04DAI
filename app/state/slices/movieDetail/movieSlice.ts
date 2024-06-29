import { MovieDetail } from "./../../../ui/types/movieDetail";
import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetail } from "./asyncThunks";

interface MovieState {
  loading: boolean;
  movieById: MovieDetail;
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
  error: ""
};

export const moviesSlice = createSlice({
  name: "movie",
  initialState: initialState,
  reducers: {},
  selectors: {
    selectMovieById: state => state.movieById
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
  }
});

export const { selectMovieById } = moviesSlice.selectors;

export default moviesSlice;
