// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <div className="header-content">
              <div className="logo">
                <span className="logo-icon">📚</span>
                <h1>KiaTrack</h1>
              </div>
              <nav className="main-nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/stats" className="nav-link">Statistics</Link>
              </nav>
            </div>
          </header>
          
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <div className="footer-content">
              <p>© {new Date().getFullYear()} KiaTrack - Personal Book Management</p>
            </div>
          </footer>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;