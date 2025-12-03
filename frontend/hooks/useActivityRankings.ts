import { useQuery, gql } from '@apollo/client';
import { ActivityRanking } from '../types';

const GET_ACTIVITY_RANKINGS = gql`
  query GetActivityRankings($city: String!) {
    getActivityRankings(city: $city) {
      activity
      scores {
        date
        score
        description
      }
      bestDay
      worstDay
    }
  }
`;

interface UseActivityRankingsResult {
  loading: boolean;
  error: any;
  data: ActivityRanking[];
  refetch: (city: string) => void;
}

export const useActivityRankings = (city: string): UseActivityRankingsResult => {
  const { loading, error, data, refetch: apolloRefetch } = useQuery<{ getActivityRankings: ActivityRanking[] }>(
    GET_ACTIVITY_RANKINGS,
    {
      variables: { city },
      skip: !city,
      fetchPolicy: 'cache-and-network',
    }
  );

  const refetch = (newCity: string) => {
    apolloRefetch({ city: newCity });
  };

  return {
    loading,
    error: error ? new Error(error.message || 'Failed to fetch rankings') : undefined,
    data: data?.getActivityRankings || [],
    refetch
  };
};
