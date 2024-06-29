import React from 'react';

function MovieList({ movies, handleMovieClick, IMAGE_PATH }) {
  return (
    <div className='contenedor-peliculas-main'>
      <h2 className='h2-lista-peliculas-main'>Peliculas</h2>
      <div className='lista-peliculas-main'>
        {movies.map(movie => (
          <div className='caja-lista-pelicula-main' key={movie.id} onClick={() => handleMovieClick(movie)}>
            <a href="#info"><img className='img-movie' src={`${IMAGE_PATH}${movie.poster_path}`} alt={movie.title} /></a>
            <p className='p-nombre-pelicula'>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
