// src/components/BookFilter/BookFilter.js
import React, { useState } from 'react';
import { useBookContext } from '../../context/BookContext';
import './BookFilter.css';

function BookFilter() {
  const { setFilter, setSearchTerm, filter } = useBookContext();
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
  };

  const handleSearchReset = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  return (
    <div className="book-filter">
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Books
        </button>
        <button 
          className={`filter-tab ${filter === 'owned' ? 'active' : ''}`}
          onClick={() => handleFilterChange('owned')}
        >
          Owned
        </button>
        <button 
          className={`filter-tab ${filter === 'reading' ? 'active' : ''}`}
          onClick={() => handleFilterChange('reading')}
        >
          Reading
        </button>
        <button 
          className={`filter-tab ${filter === 'wishlist' ? 'active' : ''}`}
          onClick={() => handleFilterChange('wishlist')}
        >
          Wishlist
        </button>
      </div>
      
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className={`search-input-container ${isSearchFocused ? 'focused' : ''}`}>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={localSearchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="search-input"
          />
          {localSearchTerm && (
            <button 
              type="button" 
              onClick={handleSearchReset}
              className="search-reset"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default BookFilter;