// src/pages/Stats/Stats.js
import React from 'react';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const stats = useBookStats();
  
  return (
    <div className="stats-page">
      <h1>Library Statistics</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Books</h3>
          <div className="stat-value">{stats.totalBooks}</div>
        </div>
        
        <div className="stat-card">
          <h3>Owned Books</h3>
          <div className="stat-value">{stats.ownedBooks}</div>
          <div className="stat-percentage">{stats.ownedPercentage}% of collection</div>
        </div>
        
        <div className="stat-card">
          <h3>Currently Reading</h3>
          <div className="stat-value">{stats.readingBooks}</div>
          <div className="stat-percentage">{stats.readingPercentage}% of collection</div>
        </div>
        
        <div className="stat-card">
          <h3>Wishlist</h3>
          <div className="stat-value">{stats.wishlistBooks}</div>
          <div className="stat-percentage">{stats.wishlistPercentage}% of collection</div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-card">
          <h3>Collection Breakdown</h3>
          <div className="progress-bars">
            <div className="progress-item">
              <div className="progress-label">
                <span>Owned</span>
                <span>{stats.ownedPercentage}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill owned" 
                  style={{ width: `${stats.ownedPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="progress-item">
              <div className="progress-label">
                <span>Reading</span>
                <span>{stats.readingPercentage}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill reading" 
                  style={{ width: `${stats.readingPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="progress-item">
              <div className="progress-label">
                <span>Wishlist</span>
                <span>{stats.wishlistPercentage}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill wishlist" 
                  style={{ width: `${stats.wishlistPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {stats.mostCommonAuthor && (
          <div className="chart-card author-card">
            <h3>Most Common Author</h3>
            <div className="author-stat">
              <span className="author-name">{stats.mostCommonAuthor}</span>
              <span className="author-count">{stats.authorBookCount} books</span>
            </div>
          </div>
        )}
      </div>
      
      {stats.totalBooks === 0 && (
        <div className="empty-stats">
          <p>Add books to your collection to see statistics!</p>
        </div>
      )}
    </div>
  );
}

export default Stats;