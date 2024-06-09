export type Movies = Movie[];

export interface Movie {
  id: number;
  title: string;
  subtitle: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  duration: string;
  voteAverage: number;
  voteCount: number;
}
