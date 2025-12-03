import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (city: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setError('');
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label htmlFor="city">City or Town</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name (e.g., London, Paris)"
          aria-label="City name"
        />
        {error && <div className="error-message">{error}</div>}
      </div>
      <button type="submit" className="search-button">
        Get Rankings
      </button>
    </form>
  );
};
