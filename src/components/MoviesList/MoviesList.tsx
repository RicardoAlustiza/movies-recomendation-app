import { useMemo, useState } from 'react'
import { MovieCard } from '../MovieCard/MovieCard'
import { Movie } from '../../types'

import './MoviesList.css'

interface MoviesListProps {
  currentMovies: Movie[]
}

export const MoviesList = ({currentMovies}: MoviesListProps) => {

  const [filterMovies, setFilterMovies] = useState<string | null>(null);

  const filteredMovies = useMemo(() => {
    if(filterMovies !== null && filterMovies.length > 0) {
      if(currentMovies.filter(movie => movie.title.toLowerCase().includes(filterMovies.toLowerCase())).length > 0) {
        return currentMovies.filter(movie => movie.title.toLowerCase().includes(filterMovies.toLowerCase()))
      }
      if(currentMovies.filter(movie => movie.genres[0].toLowerCase().includes(filterMovies.toLowerCase())).length > 0) {
        return currentMovies.filter(movie => movie.genres[0].toLowerCase().includes(filterMovies.toLowerCase()))
      }
      if(currentMovies.filter(movie=> movie.rating.toString().includes(filterMovies)).length > 0) {
        return currentMovies.filter(movie=> movie.rating.toString().includes(filterMovies))
      }
      if(currentMovies.filter(movie=> movie.releaseDate.toString().includes(filterMovies)).length > 0) {
        return currentMovies.filter(movie=> movie.releaseDate.toString().includes(filterMovies))
      }
      else {
        return []
      }
    }
    return currentMovies
  }, [filterMovies, currentMovies])

  return (
    <div className='movie-list__component'>
      <div className='movies__list'>
        {
          currentMovies.length === 0
          ? 
          <>
            <h3 className='list__title'>No recomendations available</h3>
            <span className='list__subtitle'>Insert a new movie recomendation...</span>
          </>
          :
          <>
            <h3 className='list__title'>Recomendations</h3>
            <div className='list__cards'>
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>       
          </>
        }
      </div>
      <div className="filter-list-container">
        <span className="filtered-list-lenght">{filteredMovies.length}</span>
        <input type="text" placeholder="Search movie..." onChange={(e) => setFilterMovies(e.target.value)}/>
      </div>
    </div>

  )
}
