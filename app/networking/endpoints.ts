export const endpoints = {
  auth: "/api/v1/auth/login",
  refreshToken: "/api/v1/auth/refresh",
  movies: "/api/v1/movies",
  users: "/api/v1/users",
  movieDetail: "/api/v1/movies",
  favorite: "/api/v1/favorites",
  voteMovie: "/api/v1/movies/{movieId}/vote",
  genres: "/api/v1/movies/genres"
} as const;
