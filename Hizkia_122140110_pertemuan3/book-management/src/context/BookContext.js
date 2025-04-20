// src/context/BookContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

// Define initial state
const initialState = {
  books: [],
  filter: 'all',
  searchTerm: '',
};

// Define action types
const ActionTypes = {
  ADD_BOOK: 'ADD_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  SET_FILTER: 'SET_FILTER',
  SET_SEARCH: 'SET_SEARCH',
};

// Create reducer
function bookReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, { ...action.payload, id: Date.now().toString() }],
      };
    case ActionTypes.UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case ActionTypes.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case ActionTypes.SET_SEARCH:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
}

// Create context
const BookContext = createContext();

// Create provider component
export function BookProvider({ children }) {
  const [storedBooks, setStoredBooks] = useLocalStorage('books', []);
  const [state, dispatch] = useReducer(bookReducer, {
    ...initialState,
    books: storedBooks,
  });

  // Update localStorage when books change
  useEffect(() => {
    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);

  // Filtered and searched books
  const filteredBooks = state.books.filter((book) => {
    const matchesFilter = state.filter === 'all' || book.status === state.filter;
    const matchesSearch = book.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(state.searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Actions
  const addBook = (book) => dispatch({ type: ActionTypes.ADD_BOOK, payload: book });
  const updateBook = (book) => dispatch({ type: ActionTypes.UPDATE_BOOK, payload: book });
  const deleteBook = (id) => dispatch({ type: ActionTypes.DELETE_BOOK, payload: id });
  const setFilter = (filter) => dispatch({ type: ActionTypes.SET_FILTER, payload: filter });
  const setSearchTerm = (term) => dispatch({ type: ActionTypes.SET_SEARCH, payload: term });

  const value = {
    books: state.books,
    filteredBooks,
    filter: state.filter,
    searchTerm: state.searchTerm,
    addBook,
    updateBook,
    deleteBook,
    setFilter,
    setSearchTerm,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the book context
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};

export default BookContext;