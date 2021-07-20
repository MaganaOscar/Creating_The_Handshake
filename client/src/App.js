import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Chat from './components/Chat';
 
function App() {
  return (
    <div className="App">
      <Chat/>
    </div>
  );
}
 
export default App;
