// src/components/BookForm/BookForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';
import { BookProvider } from '../../context/BookContext';

// Mock context functions
jest.mock('../../context/BookContext', () => ({
  ...jest.requireActual('../../context/BookContext'),
  useBookContext: () => ({
    addBook: jest.fn(),
    updateBook: jest.fn(),
  }),
}));

describe('BookForm Component', () => {
  const mockOnClose = jest.fn();
  
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders "Add New Book" form when no book prop is provided', () => {
    render(
      <BookProvider>
        <BookForm onClose={mockOnClose} />
      </BookProvider>
    );
    
    expect(screen.getByText('Add New Book')).toBeInTheDocument();
    expect(screen.getByText('Add Book')).toBeInTheDocument();
  });

  test('renders "Edit Book" form when book prop is provided', () => {
    const mockBook = {
      id: '1',
      title: 'Test Book',
      author: 'Test Author',
      status: 'owned'
    };
    
    render(
      <BookProvider>
        <BookForm book={mockBook} onClose={mockOnClose} />
      </BookProvider>
    );
    
    expect(screen.getByText('Edit Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Update')).toBeInTheDocument();
  });

  test('validates form and shows error messages', () => {
    render(
      <BookProvider>
        <BookForm onClose={mockOnClose} />
      </BookProvider>
    );
    
    // Submit form without filling it
    fireEvent.click(screen.getByText('Add Book'));
    
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Author is required')).toBeInTheDocument();
  });

  test('closes form when cancel button is clicked', () => {
    render(
      <BookProvider>
        <BookForm onClose={mockOnClose} />
      </BookProvider>
    );
    
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('submits form successfully with valid data', () => {
    const { useBookContext } = require('../../context/BookContext');
    const mockAddBook = jest.fn();
    useBookContext.mockReturnValue({
      addBook: mockAddBook,
      updateBook: jest.fn(),
    });
    
    render(
      <BookProvider>
        <BookForm onClose={mockOnClose} />
      </BookProvider>
    );
    
    // Fill the form
    fireEvent.change(screen.getByLabelText('Title'), { 
      target: { value: 'New Book' } 
    });
    
    fireEvent.change(screen.getByLabelText('Author'), { 
      target: { value: 'New Author' } 
    });
    
    fireEvent.change(screen.getByLabelText('Status'), { 
      target: { value: 'reading' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Add Book'));
    
    // Check that addBook was called with correct data
    expect(mockAddBook).toHaveBeenCalledWith({
      title: 'New Book',
      author: 'New Author',
      status: 'reading'
    });
    
    // Check that onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});