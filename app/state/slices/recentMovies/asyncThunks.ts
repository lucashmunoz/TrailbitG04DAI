import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../networking/api";
import { endpoints } from "../../../networking/endpoints";
import { Movies } from "../../../ui/types/movie";

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

interface FetchRecentMoviesPayload {
  page: number;
  genre: String;
}

export const fetchRecentMovies = createAsyncThunk(
  "auth/fetchRecentMovies",
  async (
    { page = 1, genre = "" }: FetchRecentMoviesPayload,
    { rejectWithValue }
  ) => {
    try {
      const genreQuery = genre != "" ? `&genre=${genre}` : "";
      const fetchRecentMoviesUrl = `${endpoints.movies}?dateOrder=desc&page=${page}${genreQuery}`;
      const apiResponse = await api.get<MovieApiResponse[]>(
        fetchRecentMoviesUrl
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
