import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../networking/api";
import { endpoints } from "../../../networking/endpoints";
import { Movies } from "../../../ui/types/movie";
import { ToggleOrderButtonState } from "../../../ui/components/ToggleOrder";

interface MovieApiResponse {
  id: number;
  title: string;
  subtitle: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  release_date: string;
  duration: string;
  vote_average: number;
  vote_count: number;
}

interface FetchMoviesPopularPayload {
  page: number;
}

export const fetchPopularMovies = createAsyncThunk(
  "auth/fetchPopularMovies",
  async ({ page = 1 }: FetchMoviesPopularPayload, { rejectWithValue }) => {
    try {
      const fetchPopularMoviesUrl = `${endpoints.movies}?popularMovies=true&page=${page}`;
      const apiResponse = await api.get<MovieApiResponse[]>(
        fetchPopularMoviesUrl
      );

      const movies = apiResponse?.data.map(movie => {
        const {
          poster_path,
          backdrop_path,
          release_date,
          vote_average,
          vote_count
        } = movie;
        return {
          ...movie,
          posterPath: poster_path,
          backdropPath: backdrop_path,
          releaseDate: release_date,
          voteAverage: vote_average,
          voteCount: vote_count
        };
      }) as Movies;

      return {
        movies,
        page
      };
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);

interface FetchMoviesBySearchPayload {
  searchValue: string;
  rateOrderState: ToggleOrderButtonState;
  dateOrderState: ToggleOrderButtonState;
  page: number;
}

export const fetchMoviesBySearch = createAsyncThunk(
  "auth/fetchMoviesBySearch",
  async (
    {
      searchValue,
      rateOrderState,
      dateOrderState,
      page = 1
    }: FetchMoviesBySearchPayload,
    { rejectWithValue }
  ) => {
    try {
      const getApiOrderParamByToggleButtonState = state => {
        switch (state) {
          case "asc":
            return "asc";
          case "desc":
            return "desc";
          case "none":
          default:
            return "";
        }
      };

      const apiQualificationOrder = `${
        rateOrderState !== "none"
          ? "&qualificationOrder=" +
            getApiOrderParamByToggleButtonState(rateOrderState)
          : ""
      }`;

      const apiDateOrder = `${
        dateOrderState !== "none"
          ? "&dateOrder=" + getApiOrderParamByToggleButtonState(dateOrderState)
          : ""
      }`;

      const moviesBySearchUrl = `${endpoints.movies}?value=${searchValue}${apiQualificationOrder}${apiDateOrder}&page=${page}`;
      const apiResponse = await api.get<MovieApiResponse[]>(moviesBySearchUrl);

      const movies = apiResponse?.data.map(movie => {
        const {
          poster_path,
          backdrop_path,
          release_date,
          vote_average,
          vote_count
        } = movie;
        return {
          ...movie,
          posterPath: poster_path,
          backdropPath: backdrop_path,
          releaseDate: release_date,
          voteAverage: vote_average,
          voteCount: vote_count
        };
      }) as Movies;

      return {
        movies,
        page
      };
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);
