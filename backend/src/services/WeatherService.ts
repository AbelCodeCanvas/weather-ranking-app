import { OpenMeteoClient } from '../clients/OpenMeteoClient';
import { ScoringService } from './ScoringService';
import { GeocodingService } from './GeocodingService';
import { ActivityRanking, DailyWeather, DailyScore } from '../types';

export class WeatherService {
  static async getActivityRankings(city: string): Promise<ActivityRanking[]> {
    try {
      // 1. Geocode city to coordinates
      const coordinates = await GeocodingService.getCoordinates(city);
      
      // 2. Fetch 7-day forecast
      const forecast = await OpenMeteoClient.getForecast(
        coordinates.latitude,
        coordinates.longitude
      );
      
      // 3. Calculate scores for each activity
      const activities = [
        { name: 'Skiing', calculate: ScoringService.calculateSkiingScore },
        { name: 'Surfing', calculate: ScoringService.calculateSurfingScore },
        { name: 'Outdoor Sightseeing', calculate: ScoringService.calculateOutdoorSightseeingScore },
        { name: 'Indoor Sightseeing', calculate: ScoringService.calculateIndoorSightseeingScore }
      ];
      
      const rankings: ActivityRanking[] = [];
      
      for (const activity of activities) {
        const scores: DailyScore[] = forecast.map((weather: DailyWeather) => {
          const score = activity.calculate(weather);
          return {
            date: weather.date,
            score,
            description: ScoringService.getScoreDescription(score)
          };
        });
        
        // Sort to find best and worst days
        const sortedScores = [...scores].sort((a, b) => b.score - a.score);
        const bestDay = sortedScores.length > 0 ? sortedScores[0].date : null;
        const worstDay = sortedScores.length > 0 ? sortedScores[sortedScores.length - 1].date : null;
        
        rankings.push({
          activity: activity.name,
          scores,
          bestDay,
          worstDay
        });
      }
      
      return rankings;
    } catch (error) {
      console.error('Error in WeatherService:', error);
      throw error;
    }
  }
}
