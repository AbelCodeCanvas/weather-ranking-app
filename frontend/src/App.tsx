import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SearchForm } from './components/SearchForm';
import { ActivityRankings } from './components/ActivityRankings';
import { useActivityRankings } from './hooks/useActivityRankings';
import './App.css';

// Create Apollo Client
const client = new ApolloClient({
  uri: '/graphql', // Will be proxied to backend
  cache: new InMemoryCache(),
});

// Main app content
const AppContent: React.FC = () => {
  const [city, setCity] = useState('');
  const { loading, error, data } = useActivityRankings(city);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather Activity Ranker</h1>
        <p className="subtitle">
          Discover the best days for skiing, surfing, and sightseeing based on 7-day weather forecasts
        </p>
      </header>
      
      <main className="app-main">
        <div className="search-container">
          <SearchForm onSearch={handleSearch} />
        </div>
        
        <div className="results-container">
          {loading && city && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching weather data and calculating rankings for <strong>{city}</strong>...</p>
            </div>
          )}
          
          {error && (
            <div className="error-state">
              <div className="error-icon">⚠️</div>
              <h3>Error Loading Rankings</h3>
              <p>{error.message}</p>
              <button onClick={() => setCity('')} className="try-again-btn">
                Try Again
              </button>
            </div>
          )}
          
          {!loading && !error && data.length > 0 && (
            <ActivityRankings rankings={data} city={city} />
          )}
          
          {!loading && !error && city && data.length === 0 && (
            <div className="no-results">
              <p>No rankings available for "{city}". Try another city.</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Powered by Open-Meteo Weather API • Built with React & GraphQL</p>
        <p className="disclaimer">
          Rankings are based on weather conditions and may not reflect all factors affecting activity suitability.
        </p>
      </footer>
    </div>
  );
};

// Export the main App component with Apollo Provider
export const App: React.FC = () => (
  <ApolloProvider client={client}>
    <AppContent />
  </ApolloProvider>
);
