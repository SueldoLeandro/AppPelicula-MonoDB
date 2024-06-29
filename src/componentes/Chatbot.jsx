import React, { useState } from 'react';

function Chatbot({ onRequestMovie, isChatVisible, toggleChatVisibility }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onRequestMovie(message);
      setMessage('');
    }
  };

  return (
    <div className={`chatbot ${isChatVisible ? 'chatbot-visible' : 'chatbot-hidden'}`}>
      {isChatVisible ? (
        <>
          <div className="chatbot-header">
            ¿No encuentras tu pelicula? Solicítala aquí
            <button onClick={toggleChatVisibility}>Ocultar Chat</button>
          </div>
          <div className="chatbot-body">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nombre de la película"
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </>
      ) : (
        <div className="chatbot-toggle" onClick={toggleChatVisibility}>
          Chat
        </div>
      )}
    </div>
  );
}

export default Chatbot;
