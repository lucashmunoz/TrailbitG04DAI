import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../networking/api";
import { endpoints } from "../../../networking/endpoints";
import { RootState } from "../../store";

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
      const fetchMovieDetailUrl = `${endpoints.movieDetail}/${movieId}`;
      const apiResponse = await api.get<MovieDetailApiResponse>(
        fetchMovieDetailUrl
      );

      const movie = apiResponse?.data;
      return { ...movie };
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

export const toggleFavoriteMovie = createAsyncThunk(
  "auth/deleteFavoriteMovie",
  async ({ movieId }: FavoriteMoviePayload, { getState, rejectWithValue }) => {
    try {
      const { movie } = getState() as RootState;
      const isFavorite = movie.movieById.is_favorite;

      const togleFavoriteMovieUrl = `${endpoints.favorite}/${movieId}`;

      if (isFavorite) {
        await api.delete<void>(togleFavoriteMovieUrl);
      } else {
        await api.post<void>(togleFavoriteMovieUrl);
      }

      return { newFavoriteState: !isFavorite };
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

export const rateMovie = createAsyncThunk(
  "auth/addVote",
  async ({ movieId, score }: AddVoteMoviePayload, { rejectWithValue }) => {
    try {
      const addVoteMovieEndpoint = endpoints.voteMovie.replace(
        "{movieId}",
        movieId.toString()
      );
      await api.put<void>(addVoteMovieEndpoint, { score: score });
      return { newVote: score };
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);
