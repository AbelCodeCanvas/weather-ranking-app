import { WeatherService } from '../services/WeatherService';

export const rankingResolver = {
  Query: {
    getActivityRankings: async (_: any, { city }: { city: string }) => {
      try {
        return await WeatherService.getActivityRankings(city);
      } catch (error) {
        console.error('Error fetching rankings:', error);
        throw new Error(`Failed to get rankings for ${city}. Please try again.`);
      }
    }
  }
};
