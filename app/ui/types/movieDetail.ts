export type MovieDetail = Movie;

export interface Movie {
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
