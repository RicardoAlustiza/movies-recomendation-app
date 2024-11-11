import { useState } from 'react'
import { Movie } from './types'
import { moviesData } from './data/MoviesData'
import { MoviesList, Navbar, NewMovieForm } from './components'

import './styles.css'

function MoviesRecomendationApp() {

  const [currentMovies, setCurrentMovies] = useState<Movie[]>(moviesData);

  return (
    <>
      <header className='header'>
        <Navbar />
      </header>
      <main>
        <div className='main-section'>
          <NewMovieForm currentMovies={currentMovies} setCurrentMovies={setCurrentMovies} />
          <hr />
          <MoviesList currentMovies={currentMovies} />
        </div>
      </main>
    </>
  )
}

export default MoviesRecomendationApp
