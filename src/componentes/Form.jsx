import React from 'react';

function Form({ formularioRegistro, formData, handleInputChange, handleSubmit }) {
  return (
    <div className='contenedor-formulario'>
      <form onSubmit={handleSubmit}>
        <h2>{formularioRegistro ? 'Registro' : 'Login'}</h2>
        <input type="text" placeholder='USUARIO' name='usuario' value={formData.usuario} onChange={handleInputChange} required />
        {formularioRegistro && <input type="email" placeholder='EMAIL' name='email' value={formData.email} onChange={handleInputChange} required />}
        <input type="password" placeholder='CONTRASEÑA' name='password' value={formData.password} onChange={handleInputChange} required />
        <button className='btn-registrar'>{formularioRegistro ? 'Registrar' : 'Ingresar'}</button>
      </form>
    </div>
  );
}

export default Form;
