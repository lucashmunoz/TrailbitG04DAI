import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../networking/api";
import { endpoints } from "../../../networking/endpoints";

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

interface MovieDetailApiResponse {
  id: number;
  images: Image[];
}

interface Image {
  id: string;
  file_path: string;
}

export const fetchMainMovie = createAsyncThunk(
  "auth/fetchMainMovie",
  async (_, { rejectWithValue }) => {
    try {
      const moviesBySearchUrl = `${endpoints.movies}?popularMovies=true&size=1`;
      const apiResponse1 = await api.get<MovieApiResponse[]>(moviesBySearchUrl);

      const movieDetailBySearchUrl = `${endpoints.movieDetail}/${apiResponse1?.data[0].id}`;
      const apiResponse2 = await api.get<MovieDetailApiResponse>(
        movieDetailBySearchUrl
      );

      const movie = apiResponse2?.data;
      return { id: movie.id, images: movie.images };
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);
