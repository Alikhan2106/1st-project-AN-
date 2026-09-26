import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.message))
      .catch(() => setStatus("Failed to connect to backend"));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Tourism360 Setup Check</h1>
      <p>Backend Status: <strong>{status}</strong></p>
    </div>
  );
}

export default App;