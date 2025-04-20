// src/pages/Home/Home.js
import React, { useState } from 'react';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookForm from '../../components/BookForm/BookForm';
import { useBookContext } from '../../context/BookContext';
import './Home.css';

function Home() {
  const [showForm, setShowForm] = useState(false);
  const { books } = useBookContext();

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>My Book Collection</h1>
        <button onClick={() => setShowForm(true)} className="add-book-button">
          + Add Book
        </button>
      </div>
      
      <BookFilter />
      
      {books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <h2>Welcome to Your Personal Book Manager</h2>
            <p>
              Start adding books to your collection by clicking the "Add Book" button.
              You can track books you own, are currently reading, or want to buy.
            </p>
            <button onClick={() => setShowForm(true)} className="get-started-btn">
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <BookList />
      )}
      
      {showForm && <BookForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default Home;