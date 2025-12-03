import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SearchForm } from './components/SearchForm';
import { ActivityRankings } from './components/ActivityRankings';
import { useActivityRankings } from './hooks/useActivityRankings';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const AppContent = () => {
  const [city, setCity] = useState('');
  const { loading, error, data } = useActivityRankings(city);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Weather Activity Ranker</h1>
        <p>Find the best days for your favorite activities based on weather forecasts</p>
      </header>
      
      <main className="app-main">
        <SearchForm onSearch={handleSearch} />
        
        {loading && city && (
          <div className="loading">Loading rankings for {city}...</div>
        )}
        
        {error && (
          <div className="error">
            Error: {error.message}
          </div>
        )}
        
        {!loading && !error && data.length > 0 && (
          <ActivityRankings rankings={data} city={city} />
        )}
      </main>
    </div>
  );
};

export const App = () => (
  <ApolloProvider client={client}>
    <AppContent />
  </ApolloProvider>
);
