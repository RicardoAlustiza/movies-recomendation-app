import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MoviesList } from '../../../src/components/MoviesList/MoviesList'
import { Movie } from  '../../../src/types'

const mockMovies: Movie[] = [
  { id: 1, title: 'Inception', genres: ['Sci-Fi'], rating: 8.8, releaseDate: 2010 },
  { id: 2, title: 'The Matrix', genres: ['Action'], rating: 8.7, releaseDate: 1999 },
  { id: 3, title: 'Interstellar', genres: ['Sci-Fi'], rating: 8.6, releaseDate: 2014 },
]

describe('MoviesList', () => {

  test('should render the movies', () => {

    render(<MoviesList currentMovies={mockMovies} />);

    expect(screen.getByText('Recomendations')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search movie...')).toBeInTheDocument();
    expect(screen.getByText(`${mockMovies.length} Results`)).toBeInTheDocument();
  })

  test('should show "No recommendations available" when movies are empty', () => {

    render(<MoviesList currentMovies={[]} />);

    expect(screen.getByText('No recomendations available')).toBeInTheDocument()
    expect(screen.getByText('Insert a new movie recomendation...')).toBeInTheDocument()
  })

  test('should update the number of result when filter the movies', () => {

    render(<MoviesList currentMovies={mockMovies} />)
    const searchInput = screen.getByPlaceholderText('Search movie...')
    
    expect(screen.getByText('3 Results')).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: 'Inception' } })
    expect(screen.getByText('1 Results')).toBeInTheDocument()
    expect(screen.getByText('Inception')).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: 'Sci-Fi' } })
    expect(screen.getByText('2 Results')).toBeInTheDocument()
    expect(screen.getByText('Inception')).toBeInTheDocument()
    expect(screen.getByText('Interstellar')).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: '8.7' } })
    expect(screen.getByText('1 Results')).toBeInTheDocument()
    expect(screen.getByText('The Matrix')).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: '2014' } })
    expect(screen.getByText('1 Results')).toBeInTheDocument()
    expect(screen.getByText('Interstellar')).toBeInTheDocument()
  })

  test('should shown a message when there are no results when filter', () => {

    render(<MoviesList currentMovies={mockMovies} />)
    const searchInput = screen.getByPlaceholderText('Search movie...')
    
    fireEvent.change(searchInput, { target: { value: 'A movie' } })
    expect(screen.getByText('0 Results')).toBeInTheDocument()
  })
})
