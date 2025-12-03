import { renderHook, waitFor } from '@testing-library/react';
import { useActivityRankings } from '../../src/hooks/useActivityRankings';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';

// Mock Apollo Client
const mockClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={mockClient}>{children}</ApolloProvider>
);

describe('useActivityRankings', () => {
  it('should return initial loading state', () => {
    const { result } = renderHook(() => useActivityRankings('London'), { wrapper });
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();
  });
});
