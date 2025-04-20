// src/components/BookList/BookList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';
import { BookProvider } from '../../context/BookContext';

// Mock window.confirm
window.confirm = jest.fn();

// Mock context
jest.mock('../../context/BookContext', () => ({
  ...jest.requireActual('../../context/BookContext'),
  useBookContext: () => ({
    filteredBooks: [
      { id: '1', title: 'Book 1', author: 'Author 1', status: 'owned' },
      { id: '2', title: 'Book 2', author: 'Author 2', status: 'reading' }
    ],
    deleteBook: jest.fn()
  }),
}));

describe('BookList Component', () => {
  test('renders books correctly', () => {
    render(
      <BookProvider>
        <BookList />
      </BookProvider>
    );
    
    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('by Author 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('by Author 2')).toBeInTheDocument();
    expect(screen.getByText('Owned')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });

  test('shows empty message when no books', () => {
    const { useBookContext } = require('../../context/BookContext');
    useBookContext.mockReturnValueOnce({
      filteredBooks: [],
      deleteBook: jest.fn()
    });
    
    render(
      <BookProvider>
        <BookList />
      </BookProvider>
    );
    
    expect(screen.getByText('No books found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters or add a new book')).toBeInTheDocument();
  });

  test('calls deleteBook when delete button is clicked and confirmed', () => {
    window.confirm.mockReturnValueOnce(true);
    
    const { useBookContext } = require('../../context/BookContext');
    const mockDeleteBook = jest.fn();
    useBookContext.mockReturnValueOnce({
      filteredBooks: [
        { id: '1', title: 'Book 1', author: 'Author 1', status: 'owned' }
      ],
      deleteBook: mockDeleteBook
    });
    
    render(
      <BookProvider>
        <BookList />
      </BookProvider>
    );
    
    // Find and click delete button
    const deleteButtons = screen.getAllByLabelText('Delete book');
    fireEvent.click(deleteButtons[0]);
    
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this book?');
    expect(mockDeleteBook).toHaveBeenCalledWith('1');
  });

  test('does not delete book when confirmation is canceled', () => {
    window.confirm.mockReturnValueOnce(false);
    
    const { useBookContext } = require('../../context/BookContext');
    const mockDeleteBook = jest.fn();
    useBookContext.mockReturnValueOnce({
      filteredBooks: [
        { id: '1', title: 'Book 1', author: 'Author 1', status: 'owned' }
      ],
      deleteBook: mockDeleteBook
    });
    
    render(
      <BookProvider>
        <BookList />
      </BookProvider>
    );
    
    // Find and click delete button
    const deleteButtons = screen.getAllByLabelText('Delete book');
    fireEvent.click(deleteButtons[0]);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteBook).not.toHaveBeenCalled();
  });
});