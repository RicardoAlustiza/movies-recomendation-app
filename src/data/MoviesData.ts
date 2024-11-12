import { Movie } from '../types';

export const moviesData: Movie[] = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    releaseDate: 1994,
    genres: ['Drama'],
    rating: 8,
    movieCoverURL: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
    shortDescription: 'Two imprisoned...',
  },
  {
    id: 2,
    title: 'The Godfather',
    releaseDate: 1972,
    genres: ['Crime'],
    rating: 10,
    movieCoverURL: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
    shortDescription: 'The aging patriarch...',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    releaseDate: 2008,
    genres: ['Action'],
    rating: 9,
    movieCoverURL: '',
    shortDescription: 'When the menace...',
  }
]
export const genresData = ['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Historical', 'Horror', 'Mystery', 'Philosophical', 'Political', 'Romance', 'Saga', 'Satire', 'Science fiction', 'Social', 'Thriller', 'Urban', 'Western'];