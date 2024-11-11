import { Movie } from '../../types/moviesType';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className='card' key={movie.id}>
      {movie.movieCoverURL && <img className='card__img' src={movie.movieCoverURL} alt={movie.title} />}
      <div className='card__overlay'>
        <div className='card__title'>{movie.title}</div>
        <div className='card__runtime'>Year: {movie.releaseDate}
          <span className='card__rating'>{movie.rating}⭐</span>
        </div>
        <div className='card__genders'>Genres: {movie.genres.join(', ')}</div>
        {movie.shortDescription && <div className='card__description'>{movie.shortDescription}</div>}
      </div>
    </div>
  )
}
