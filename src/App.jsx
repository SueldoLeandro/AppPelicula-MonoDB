import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './componentes/NavBar';
import MovieList from './componentes/MovieList';
import MovieDetail from './componentes/MovieDetail';
import Chatbot from './componentes/Chatbot';
import Form from './componentes/Form';
import Footer from './componentes/Footer';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '31bf1a2635d21a5654a8fa39e5da3f0d'; // key themoviedb
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

function App() {
  const apiKey = 'AIzaSyCE-3NqsTFZtULkIkWNhVYfNKv8tnM7BC0'; // key gemini
  const genAI = new GoogleGenerativeAI(apiKey);

  const [session, setSession] = useState(false);
  const [formularioRegistro, setFormularioRegistro] = useState(true);
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    password: ''
  });
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    id: 573435,
    title: 'Bad Boys: Ride or Die',
    overview: 'Tras escuchar falsas acusaciones sobre su excapitán y mentor Mike y Marcus deciden investigar el asunto incluso volverse los más buscados de ser necesarios...',
    backdrop_path: '/gRApXuxWmO2forYTuTmcz5RaNUV.jpg',
    poster_path: "/5jI2vEHJReAx8iFDmhC2O3yW37w.jpg"
  });
  const [trailerUrl, setTrailerUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userName, setUserName] = useState('');
  const [moviesFavoritos, setMoviesFavoritos] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    if (session) {
      fetchMovies();
    }
  }, [session]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`);
      const data = await response.json();
      setMovies(data.results.slice(0, 16));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(`${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`);
      const data = await response.json();
      const trailer = data.results.find(video => video.type === 'Trailer');
      setTrailerUrl(trailer ? `https://www.youtube.com/embed/${trailer.key}` : '');
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handlePlayClick = () => {
    if (selectedMovie) {
      fetchTrailer(selectedMovie.id);
    }
  };

  const handleAgregarClick = async () => {
    if (selectedMovie) {
      setMoviesFavoritos(prevFavoritos => {
        const nuevosFavoritos = [...prevFavoritos, selectedMovie];
        setMoviesFavoritos(nuevosFavoritos);
        return nuevosFavoritos;
      });
      console.log(selectedMovie)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = formularioRegistro ? 'http://localhost:5000/register' : 'http://localhost:5000/login';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === 'Registrado') {
          alert('Registro exitoso');
          setFormularioRegistro(false);
          return;
        }
        if (data.message === 'ISession') {
          setSession(true);
          setUserName(formData.usuario);
          return;
        }
      } else {
        alert('Error en la autenticación');
      }
    } catch (error) {
      console.error(error);
      alert('Error en la autenticación');
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${searchTerm}`);
      const data = await response.json();
      if (data.results.length > 0) {
        setSelectedMovie(data.results[0]);
      } else {
        alert('No se encontraron películas');
      }
    } catch (error) {
      console.error('Error searching movie:', error);
    }
  };

  const handleRequestMovie = async (movieName) => {
    try {
      const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${movieName}`);
      const data = await response.json();
      if (data.results.length > 0) {
        setMovies(prevMovies => [...prevMovies, data.results[0]]);
      } else {
        alert('No se encontraron películas');
      }
    } catch (error) {
      console.error('Error requesting movie:', error);
    }
  };

  const handleGenerateComment = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // Obtén el título de la película como un string
    const titulo = selectedMovie.title.toString();

    // Construye el prompt incluyendo el título de la película
    const prompt = `Escribime una opinión positiva o negativa sobre la película ${titulo} según tu criterio de forma breve.`;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response.candidates[0].content.parts[0];
      response.text = response.text.replace('#', '');
      response.text = response.text.replace('**', '\n');
      setResponseText(response.text);
    } catch (error) {
      console.error('Error al generar contenido:', error);
    }
  };

  return (
    <>
      {
        session ? (
          <div className='contenedor-principal-main'>
            <div className='contenedor-nav-main' style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${selectedMovie ? `https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}` : ''})`,
              backgroundSize: 'cover',
              width: '100%',
              minHeight: '500px'
            }}>
              <NavBar
                selectedMovie={selectedMovie}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearchSubmit={handleSearchSubmit}
                userName={userName}
                setSession={setSession}
              />
              <MovieDetail
                selectedMovie={selectedMovie}
                trailerUrl={trailerUrl}
                handlePlayClick={handlePlayClick}
                handleAgregarClick={handleAgregarClick}
                responseText={responseText}
                handleGenerateComment={handleGenerateComment}
              />
            </div>
            <div className='contenedor-mi-lista-main'>
              <h2 className='h2-lista-main'>Mi Lista</h2>
              <div className='mi-lista-main'>
                {moviesFavoritos.map(movie => (
                  <div className='caja-mi-pelicula-main' key={movie.id} onClick={() => handleMovieClick(movie)}>
                    <a href="#info"><img className='img-movie' src={`${IMAGE_PATH}${movie.poster_path}`} alt={movie.title} /></a>
                    <p className='p-nombre-pelicula'>{movie.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <Chatbot
              onRequestMovie={handleRequestMovie}
              isChatVisible={isChatVisible}
              toggleChatVisibility={() => setIsChatVisible(!isChatVisible)}
            />
            <MovieList
              movies={movies}
              handleMovieClick={handleMovieClick}
              IMAGE_PATH={IMAGE_PATH}
            />
            <Footer />
          </div>
        ) : (
          <div className='contenedor-principal'>
            <Form
              formularioRegistro={formularioRegistro}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
            <Footer />
          </div>
        )
      }
    </>
  );
}

export default App;