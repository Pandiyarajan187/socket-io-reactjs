import React, { useState, useEffect } from 'react';
import './App.css';

import io from 'socket.io-client';
const socket = io('http://localhost:8080'); // Replace with your server address

function App() {
  const [receiveMsgs, setReceiveMsgs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for 'chat message' events from the server
    socket.on('chat message', (msg) => {
      setReceiveMsgs((prevMessages) => [...prevMessages, msg]);
    });
    // Cleanup the event listener when the component unmounts
  return () => {
    socket.off('chat message');
  };
  }, []);

  const handleSendMessage = () => {
    // Send the message to the server
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <div className="App">
      <div className="message-list">
        {receiveMsgs.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
