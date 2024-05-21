export type Movies = Movie[];

export interface Movie {
  id: number;
  title: string;
  subtitle: string;
  overview: string;
  posterPath: string;
  release_date: string;
  duration: string;
  vote_average: number;
  vote_count: number;
}
