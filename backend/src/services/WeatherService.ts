import { OpenMeteoClient } from '../clients/OpenMeteoClient';
import { ScoringService } from './ScoringService';
import { GeocodingService } from './GeocodingService';
import { ActivityRanking, DailyWeather } from '../types';

export class WeatherService {
  static async getActivityRankings(city: string): Promise<ActivityRanking[]> {
    // 1. Geocode city to coordinates
    const coordinates = await GeocodingService.getCoordinates(city);
    
    // 2. Fetch 7-day forecast
    const forecast = await OpenMeteoClient.getForecast(
      coordinates.latitude,
      coordinates.longitude
    );
    
    // 3. Calculate scores for each activity for each day
    const activities: string[] = ['Skiing', 'Surfing', 'Outdoor Sightseeing', 'Indoor Sightseeing'];
    
    return activities.map(activity => {
      const scores = forecast.daily.map((weather: DailyWeather) => {
        const score = this.calculateActivityScore(activity, weather);
        return {
          date: weather.date,
          score: Math.round(score),
          description: ScoringService.getScoreDescription(score)
        };
      });
      
      // Sort by score descending to find best/worst days
      const sortedScores = [...scores].sort((a, b) => b.score - a.score);
      
      return {
        activity,
        scores,
        bestDay: sortedScores[0]?.date,
        worstDay: sortedScores[sortedScores.length - 1]?.date
      };
    });
  }

  private static calculateActivityScore(activity: string, weather: DailyWeather): number {
    switch(activity) {
      case 'Skiing':
        return ScoringService.calculateSkiingScore(weather);
      case 'Surfing':
        return ScoringService.calculateSurfingScore(weather);
      case 'Outdoor Sightseeing':
        return ScoringService.calculateOutdoorSightseeingScore(weather);
      case 'Indoor Sightseeing':
        return ScoringService.calculateIndoorSightseeingScore(weather);
      default:
        return 0;
    }
  }
}
