import React, { useState } from 'react';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (city: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    
    if (!trimmedCity) {
      setError('Please enter a city name');
      return;
    }
    
    if (trimmedCity.length < 2) {
      setError('City name must be at least 2 characters');
      return;
    }
    
    setError('');
    onSearch(trimmedCity);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form" role="search">
      <div className="form-group">
        <label htmlFor="city-input" className="visually-hidden">
          City or Town
        </label>
        <div className="input-wrapper">
          <span className="input-icon">📍</span>
          <input
            id="city-input"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter a city or town (e.g., London, Tokyo, New York)"
            className="city-input"
            aria-label="Enter a city or town name"
            aria-describedby={error ? "city-error" : undefined}
          />
          <button type="submit" className="submit-button" aria-label="Get weather rankings">
            Get Rankings
          </button>
        </div>
        {error && (
          <div id="city-error" className="error-message" role="alert">
            ⚠️ {error}
          </div>
        )}
      </div>
      <div className="examples">
        <span className="examples-label">Try:</span>
        <button 
          type="button" 
          className="example-chip"
          onClick={() => setCity('London')}
        >
          London
        </button>
        <button 
          type="button" 
          className="example-chip"
          onClick={() => setCity('Tokyo')}
        >
          Tokyo
        </button>
        <button 
          type="button" 
          className="example-chip"
          onClick={() => setCity('Denver')}
        >
          Denver
        </button>
        <button 
          type="button" 
          className="example-chip"
          onClick={() => setCity('Sydney')}
        >
          Sydney
        </button>
      </div>
    </form>
  );
};
