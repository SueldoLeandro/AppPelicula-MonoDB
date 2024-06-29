import React from 'react';

function NavBar({ searchTerm, setSearchTerm, handleSearchSubmit, userName, setSession }) {
  return (
    
      <nav className='nav-main'>
        <div className='nav-section-1-main'>
          <img className='logo-nav-main' src="../public/images/Logo.png" alt="Logo" />
          <li className='li-peliculas-main' onClick={() => console.log('Peliculas clicked')}>Peliculas</li>
        </div>
        <div className='nav-section-2-main'>
          <input
            type="search"
            className='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevenir que el formulario envíe el submit por defecto
                handleSearchSubmit(e);
              }
            }}
          />
        </div>
        <div className='nav-section-3-main'>
          <p className='p-usuario-main'>Bienvenido {userName}</p>
          <p className='p-cerrar-sesion-main' onClick={() => setSession(false)}>Cerrar Sesión</p>
        </div>
      </nav>
    
  );
}

export default NavBar;
