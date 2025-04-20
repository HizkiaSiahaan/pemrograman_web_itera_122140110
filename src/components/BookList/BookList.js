// src/components/BookList/BookList.js
import React, { useState } from 'react';
import { useBookContext } from '../../context/BookContext';
import BookForm from '../BookForm/BookForm';
import './BookList.css';

function BookList() {
  const { filteredBooks, deleteBook } = useBookContext();
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditClick = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(id);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  const statusLabels = {
    owned: 'Owned',
    reading: 'Reading',
    wishlist: 'Wishlist'
  };

  const statusColors = {
    owned: '#4caf50',
    reading: '#2196f3',
    wishlist: '#ff9800'
  };

  if (filteredBooks.length === 0) {
    return (
      <div className="empty-list">
        <h3>No books found</h3>
        <p>Try adjusting your filters or add a new book</p>
        <button onClick={() => setShowForm(true)} className="add-book-btn">
          Add Your First Book
        </button>
        {showForm && (
          <BookForm book={editingBook} onClose={closeForm} />
        )}
      </div>
    );
  }

  return (
    <div className="book-list">
      {filteredBooks.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-badge" style={{ backgroundColor: statusColors[book.status] }}>
            {statusLabels[book.status]}
          </div>
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">by {book.author}</p>
          <div className="book-actions">
            <button 
              onClick={() => handleEditClick(book)} 
              className="edit-btn"
              aria-label="Edit book"
            >
              <span className="icon">✏️</span>
            </button>
            <button 
              onClick={() => handleDeleteClick(book.id)} 
              className="delete-btn"
              aria-label="Delete book"
            >
              <span className="icon">🗑️</span>
            </button>
          </div>
        </div>
      ))}
      
      {showForm && (
        <BookForm book={editingBook} onClose={closeForm} />
      )}
    </div>
  );
}

export default BookList;