import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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

export const fetchPopularMovies = createAsyncThunk(
  "auth/fetchPopularMovies",
  async (_, { rejectWithValue }) => {
    try {
      const popularMoviesUrl = `https://desarrollodeaplicaciones.onrender.com${endpoints.movies}?popularMovies=true`;
      const apiResponse = await axios.get<MovieApiResponse[]>(popularMoviesUrl);

      return apiResponse?.data.map(movie => {
        const { poster_path, release_date, vote_average, vote_count } = movie;
        return {
          ...movie,
          posterPath: poster_path,
          releaseDate: release_date,
          voteAverage: vote_average,
          voteCount: vote_count
        };
      }) as Movies;
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
}

export const fetchMoviesBySearch = createAsyncThunk(
  "auth/fetchMoviesBySearch",
  async (
    { searchValue, rateOrderState, dateOrderState }: FetchMoviesBySearchPayload,
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

      const moviesBySearchUrl = `https://desarrollodeaplicaciones.onrender.com${endpoints.movies}?value=${searchValue}${apiQualificationOrder}${apiDateOrder}`;
      const apiResponse = await axios.get<MovieApiResponse[]>(
        moviesBySearchUrl
      );

      return apiResponse?.data.map(movie => {
        const { poster_path, release_date, vote_average, vote_count } = movie;
        return {
          ...movie,
          posterPath: poster_path,
          releaseDate: release_date,
          voteAverage: vote_average,
          voteCount: vote_count
        };
      }) as Movies;
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);
