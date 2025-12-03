import { ScoringService } from '../../src/services/ScoringService';
import { DailyWeather } from '../../src/types';

describe('ScoringService', () => {
  describe('calculateSkiingScore', () => {
    it('should return high score for ideal skiing conditions (cold with snowfall)', () => {
      const weather: DailyWeather = {
        date: '2024-01-15',
        temperature: -5,
        snowfall: 15,
        precipitation: 0,
        windSpeed: 5
      };
      
      const score = ScoringService.calculateSkiingScore(weather);
      expect(score).toBeGreaterThan(80);
    });

    it('should return low score for poor skiing conditions (warm with rain)', () => {
      const weather: DailyWeather = {
        date: '2024-01-15',
        temperature: 10,
        snowfall: 0,
        precipitation: 20,
        windSpeed: 15
      };
      
      const score = ScoringService.calculateSkiingScore(weather);
      expect(score).toBeLessThan(30);
    });

    it('should penalize high winds for skiing', () => {
      const weather: DailyWeather = {
        date: '2024-01-15',
        temperature: -3,
        snowfall: 10,
        precipitation: 0,
        windSpeed: 30 // High wind
      };
      
      const score = ScoringService.calculateSkiingScore(weather);
      expect(score).toBeLessThan(70);
    });
  });

  describe('calculateSurfingScore', () => {
    it('should return high score for ideal surfing conditions (moderate wind, good waves)', () => {
      const weather: DailyWeather = {
        date: '2024-01-15',
        temperature: 18,
        precipitation: 0,
        windSpeed: 12,
        waveHeight: 1.8
      };
      
      const score = ScoringService.calculateSurfingScore(weather);
      expect(score).toBeGreaterThan(75);
    });
  });

  describe('calculateOutdoorSightseeingScore', () => {
    it('should return high score for mild, dry, calm weather', () => {
      const weather: DailyWeather = {
        date: '2024-01-15',
        temperature: 20,
        precipitation: 0,
        windSpeed: 8
      };
      
      const score = ScoringService.calculateOutdoorSightseeingScore(weather);
      expect(score).toBeGreaterThan(85);
    });
  });

  describe('calculateIndoorSightseeingScore', () => {
    it('should return high score when outdoor conditions are poor', () => {
      const weather: DailyWeather = {
        date: '2024-01-15',
        temperature: 5,
        precipitation: 25,
        windSpeed: 20
      };
      
      const score = ScoringService.calculateIndoorSightseeingScore(weather);
      expect(score).toBeGreaterThan(80);
    });
  });
});
