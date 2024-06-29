import React from 'react';

function MovieDetail({ selectedMovie, trailerUrl, handlePlayClick, handleAgregarClick, responseText, handleGenerateComment }) {
  return (
    <div className='caja-info-peli-destacada-main' id='info'>
      <div className='info-peli-destacada-main'>
        <p className='nombre-pelicula-main'>{selectedMovie ? selectedMovie.title : 'Bad Boys: Ride or Die'}</p>
        <div className='botones-nav-main'>
          <button className='btn-reproducir-main' onClick={handlePlayClick}>
            <i className="fa-solid fa-play iconoBoton"></i> Trailer
          </button>
          <button className='btn-mi-lista-main' onClick={handleAgregarClick}>
            <i className="fa-solid fa-plus iconoBoton"></i>Mi Lista
          </button>
        </div>
        <p className='descripcion-pelicula-main'>{selectedMovie ? selectedMovie.overview : 'Tras escuchar falsas acusaciones sobre su excapitán y mentor Mike y Marcus deciden investigar el asunto incluso volverse los más buscados de ser necesarios...'}</p>
      </div>

      {trailerUrl && (
        <div className='iframe-contenedor'>
          <iframe width="560" height="315" src={trailerUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <div className='comment-section'>
            <p id="responseText">{responseText ? responseText : ''}</p>
            <button id="generateButton" onClick={handleGenerateComment}>Generar Comentario</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
