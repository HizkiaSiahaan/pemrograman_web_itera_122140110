// src/hooks/useBookStats.js
import { useMemo } from 'react';
import { useBookContext } from '../context/BookContext';

function useBookStats() {
  const { books } = useBookContext();
  
  const stats = useMemo(() => {
    const totalBooks = books.length;
    const ownedBooks = books.filter(book => book.status === 'owned').length;
    const readingBooks = books.filter(book => book.status === 'reading').length;
    const wishlistBooks = books.filter(book => book.status === 'wishlist').length;
    
    // Calculate percentages
    const ownedPercentage = totalBooks > 0 ? Math.round((ownedBooks / totalBooks) * 100) : 0;
    const readingPercentage = totalBooks > 0 ? Math.round((readingBooks / totalBooks) * 100) : 0;
    const wishlistPercentage = totalBooks > 0 ? Math.round((wishlistBooks / totalBooks) * 100) : 0;
    
    // Find most common author
    const authorCounts = {};
    books.forEach(book => {
      authorCounts[book.author] = (authorCounts[book.author] || 0) + 1;
    });
    
    let mostCommonAuthor = null;
    let maxCount = 0;
    
    Object.entries(authorCounts).forEach(([author, count]) => {
      if (count > maxCount) {
        mostCommonAuthor = author;
        maxCount = count;
      }
    });
    
    return {
      totalBooks,
      ownedBooks,
      readingBooks,
      wishlistBooks,
      ownedPercentage,
      readingPercentage,
      wishlistPercentage,
      mostCommonAuthor,
      authorBookCount: maxCount
    };
  }, [books]);
  
  return stats;
}

export default useBookStats;