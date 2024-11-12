import { useState } from 'react';
import { genresData } from '../../data/MoviesData';
import { useForm } from '../../hooks/useForm';
import { Movie } from '../../types';
import './NewMovieForm.css';

interface NewMovieFormProps {
  currentMovies: Movie[];
  setCurrentMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

type FormData = {
  title: string;
  releaseDate: string;
  rating: string;
}

const formConfig = {
  title: { required: true, pattern: /^[a-zA-Z0-9 ]+$/ },
  releaseDate: { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ },
  rating: { required: true, pattern: /^(10|[1-9])$/ },
}

export const NewMovieForm = ({currentMovies, setCurrentMovies}: NewMovieFormProps) => {

  const { values, errors, handleChange, validateForm, cleanForm } = useForm<FormData>(formConfig);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const registerNewMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsButtonDisabled(true);

    if (validateForm()) {
      const form = new FormData(e.currentTarget)

      const newMovie = {
        id: currentMovies.length + 1,
        title: form.get('title') as string,
        releaseDate: new Date(form.get('release-date') as string).getFullYear(),
        genres: [form.get('genres') as string],
        rating: Number(form.get('rating')),
        movieCoverURL: form.get('movie-url') as string,
        shortDescription: form.get('short-description') as string
      }
  
      setCurrentMovies([...currentMovies, newMovie])
      setIsButtonDisabled(false);

      cleanForm();
    } else {
      setIsButtonDisabled(false);
    }
  }

  return (
    <div className='movie-form'>
      <h2>Add New Movie</h2>
      <form className="form-body" onSubmit={registerNewMovie}>

        <div className='row'>
          <div className="form-group">
            <label htmlFor="title">Title <sup>*</sup></label>
            <input 
              type="text"
              id="title"
              name="title"
              className={errors.title ? 'error' : ''}
              value={values.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
            />
            { errors.title && <span className='error-message'>{errors.title}</span> }          
          </div>
          <div className="form-group">
            <label htmlFor="release-date">Release Date <sup>*</sup></label>
            <input 
              type="date"
              id="release-date"
              name="release-date"
              className={errors.releaseDate ? 'error' : ''}
              value={values.releaseDate || ''}
              onChange={(e) => handleChange('releaseDate', e.target.value)}
            />  
            { errors.releaseDate && <span className='error-message'>{errors.releaseDate}</span> }        
          </div>          
        </div>

        <div className='row'>
          <div className="form-group">
            <label htmlFor="movie-url">Movie Cover URL <sup>(Optional)</sup></label>
            <input type="url" id="movie-url" name="movie-url"/>          
          </div>
          <div className="form-group">
            <label htmlFor="genres">Genres <sup>*</sup></label>
            <select 
              id="genres"
              name="genres"
            >
              {genresData.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label htmlFor="rating">Rating (1-10) <sup>*</sup></label>
            <input 
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="10"
              className={errors.rating ? 'error' : ''}
              value={values.rating || ''}
              onChange={(e) => handleChange('rating', e.target.value)}
            />
            { errors.rating && <span className='error-message'>{errors.rating}</span> }
          </div>
          <div className="form-group">
            <label htmlFor="short-description">Short Description <sup>(Optional)</sup></label>
            <textarea id="short-description" name="short-description" rows={4}></textarea>
          </div>          
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}
        >
          Add Movie
        </button>          
      </form>
    </div>
  )
}
