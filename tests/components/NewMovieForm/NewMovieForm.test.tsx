import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewMovieForm } from '../../../src/components/NewMovieForm/NewMovieForm';
import { Movie } from '../../../src/types';
import '@testing-library/jest-dom';

describe('NewMovieForm', () => {
  const mockSetCurrentMovies = jest.fn();
  const currentMovies: Movie[] = [];

  beforeEach(() => {
    mockSetCurrentMovies.mockClear();
  });

  it('renders form fields and submit button', () => {
    render(<NewMovieForm currentMovies={currentMovies} setCurrentMovies={mockSetCurrentMovies} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Release Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating \(1-10\)/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Movie/i })).toBeEnabled();
  });

  it('updates field values on change', () => {
    render(<NewMovieForm currentMovies={currentMovies} setCurrentMovies={mockSetCurrentMovies} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Inception' } });
    fireEvent.change(screen.getByLabelText(/Release Date/i), { target: { value: '2010-07-16' } });
    fireEvent.change(screen.getByLabelText(/Rating \(1-10\)/i), { target: { value: '9' } });

    expect((screen.getByLabelText(/Title/i) as HTMLInputElement).value).toBe('Inception');
    expect((screen.getByLabelText(/Release Date/i) as HTMLInputElement).value).toBe('2010-07-16');
    expect((screen.getByLabelText(/Rating \(1-10\)/i) as HTMLInputElement).value).toBe('9');
  });

  it('calls setCurrentMovies with new movie data and clears the form on successful submit', async () => {
    render(<NewMovieForm currentMovies={currentMovies} setCurrentMovies={mockSetCurrentMovies} />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Inception' } });
    fireEvent.change(screen.getByLabelText(/Release Date/i), { target: { value: '2010-07-16' } });
    fireEvent.change(screen.getByLabelText(/Rating \(1-10\)/i), { target: { value: '9' } });
    fireEvent.change(screen.getByLabelText(/Genres/i), { target: { value: 'Action' } });

    fireEvent.submit(screen.getByRole('button', { name: /Add Movie/i }));

    await waitFor(() => {
      expect(mockSetCurrentMovies).toHaveBeenCalledWith([
        {
          id: 1,
          title: 'Inception',
          releaseDate: 2010,
          genres: ['Action'],
          rating: 9,
          movieCoverURL: '',
          shortDescription: '',
        },
      ]);

      expect((screen.getByLabelText(/Title/i) as HTMLInputElement).value).toBe('');
      expect((screen.getByLabelText(/Release Date/i) as HTMLInputElement).value).toBe('');
      expect((screen.getByLabelText(/Rating \(1-10\)/i) as HTMLInputElement).value).toBe('');
    });
  });
});
