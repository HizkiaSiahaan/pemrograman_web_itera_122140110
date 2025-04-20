// src/components/BookForm/BookForm.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';
import { useBookContext } from '../../context/BookContext';

function BookForm({ book, onClose }) {
  const { addBook, updateBook } = useBookContext();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('owned');
  const [errors, setErrors] = useState({});
  const isEditing = !!book;

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setStatus(book.status);
    }
  }, [book]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const bookData = { title, author, status };
      
      if (isEditing) {
        updateBook({ ...bookData, id: book.id });
      } else {
        addBook(bookData);
      }
      
      onClose();
    }
  };

  return (
    <div className="book-form-container">
      <form className="book-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
        
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={errors.author ? 'error' : ''}
          />
          {errors.author && <p className="error-message">{errors.author}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="owned">Owned</option>
            <option value="reading">Currently Reading</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {isEditing ? 'Update' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
}

BookForm.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['owned', 'reading', 'wishlist']).isRequired
  }),
  onClose: PropTypes.func.isRequired
};

BookForm.defaultProps = {
  book: null
};

export default BookForm;