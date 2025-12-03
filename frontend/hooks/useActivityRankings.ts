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

export const useActivityRankings = (city: string) => {
  const { loading, error, data } = useQuery<{ getActivityRankings: ActivityRanking[] }>(
    GET_ACTIVITY_RANKINGS,
    {
      variables: { city },
      skip: !city
    }
  );

  return {
    loading,
    error,
    data: data?.getActivityRankings || []
  };
};
