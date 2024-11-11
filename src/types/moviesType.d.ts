export interface Movie {
  id: number;
  title: string;
  releaseDate: number;
  genres: string[];
  rating: number;
  movieCoverURL?: string;
  shortDescription?: string;
}