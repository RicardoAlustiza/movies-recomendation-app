import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MoviesRecomendationApp from './MoviesRecomendationApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MoviesRecomendationApp />
  </StrictMode>,
)
