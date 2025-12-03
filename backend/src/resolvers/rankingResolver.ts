import { WeatherService } from '../services/WeatherService';
import { ActivityRanking } from '../types';

export const rankingResolver = {
  Query: {
    getActivityRankings: async (_: any, { city }: { city: string }): Promise<ActivityRanking[]> => {
      if (!city || city.trim().length === 0) {
        throw new Error('City name is required');
      }
      
      try {
        return await WeatherService.getActivityRankings(city.trim());
      } catch (error: any) {
        console.error(`Error getting rankings for ${city}:`, error);
        throw new Error(`Failed to get rankings for "${city}": ${error.message}`);
      }
    }
  }
};
