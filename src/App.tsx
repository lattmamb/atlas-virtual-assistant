
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Atlas Intelligence Dashboard</h1>
        <Link to="/atlas-link" className="app-link">
          Go to Atlas Link
        </Link>
      </header>
    </div>
  );
}

export default App;
