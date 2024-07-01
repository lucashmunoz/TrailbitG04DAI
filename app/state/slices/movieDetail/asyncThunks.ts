import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../networking/api";
import { endpoints } from "../../../networking/endpoints";

interface MovieDetailApiResponse {
  id: number;
  title: string;
  overview: string;
  runtime: number;
  tagline: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  duration: string;
  vote_average: number;
  vote_count: number;
  is_favorite: boolean;
  images: Image[];
  genres: Genre[];
  videos: Video[];
  cast: Cast[];
  director: Cast;
}

interface Image {
  id: string;
  file_path: string;
}

interface Genre {
  id: string;
  name: string;
}

interface Video {
  id: string;
  name: string;
  key: string;
}

interface Cast {
  id: string;
  name: string;
  character: string;
  known_for_department: string;
  profile_path: string;
}

interface FetchMovieDetailPayload {
  movieId: number;
}

export const fetchMovieDetail = createAsyncThunk(
  "auth/fetchMovieDetail",
  async ({ movieId }: FetchMovieDetailPayload, { rejectWithValue }) => {
    try {
      const fetchMovieDetailUrl = `${endpoints.movieDetail}${movieId}`;
      const apiResponse = await api.get<MovieDetailApiResponse>(
        fetchMovieDetailUrl
      );

      const movie = apiResponse?.data;
      const {
        id,
        title,
        overview,
        runtime,
        tagline,
        popularity,
        poster_path,
        backdrop_path,
        release_date,
        duration,
        vote_average,
        vote_count,
        is_favorite,
        images,
        genres,
        videos,
        cast,
        director
      } = movie;
      return {
        id,
        title,
        overview,
        runtime,
        tagline,
        popularity,
        poster_path,
        backdrop_path,
        release_date,
        duration,
        vote_average,
        vote_count,
        is_favorite,
        images,
        genres,
        videos,
        cast,
        director
      };
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);
