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
  user_vote: number;
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
        user_vote,
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
        director,
        user_vote
      };
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);

interface FavoriteMoviePayload {
  movieId: number;
}

export const addFavoriteMovie = createAsyncThunk(
  "auth/addFavoriteMovie",
  async ({ movieId }: FavoriteMoviePayload, { rejectWithValue }) => {
    try {
      const addFavoriteMovie = `${endpoints.favorite}${movieId}`;
      await api.post<void>(addFavoriteMovie);
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);

export const deleteFavoriteMovie = createAsyncThunk(
  "auth/deleteFavoriteMovie",
  async ({ movieId }: FavoriteMoviePayload, { rejectWithValue }) => {
    try {
      const deleteFavoriteMovie = `${endpoints.favorite}${movieId}`;
      await api.delete<void>(deleteFavoriteMovie);
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);

interface AddVoteMoviePayload {
  movieId: number;
  score: number;
}

export const addVote = createAsyncThunk(
  "auth/addVote",
  async ({ movieId, score }: AddVoteMoviePayload, { rejectWithValue }) => {
    try {
      const addVoteMovieEndpoint = endpoints.voteMovie.replace(
        "{movieId}",
        movieId.toString()
      );
      await api.put<void>(addVoteMovieEndpoint, { score: score });
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);
