import { ScoringService } from '../../src/services/ScoringService';

describe('ScoringService', () => {
  describe('calculateSkiingScore', () => {
    test('returns high score for ideal skiing conditions', () => {
      const weather = {
        date: '2024-01-15',
        temperature: -3,
        precipitation: 0,
        snowfall: 15,
        windSpeed: 5,
        weatherCode: 73
      };
      
      const score = ScoringService.calculateSkiingScore(weather);
      expect(score).toBeGreaterThan(75);
    });

    test('returns low score for warm rainy conditions', () => {
      const weather = {
        date: '2024-01-15',
        temperature: 10,
        precipitation: 20,
        snowfall: 0,
        windSpeed: 8,
        weatherCode: 61
      };
      
      const score = ScoringService.calculateSkiingScore(weather);
      expect(score).toBeLessThan(30);
    });
  });

  describe('calculateSurfingScore', () => {
    test('returns high score for good surfing conditions', () => {
      const weather = {
        date: '2024-01-15',
        temperature: 18,
        precipitation: 0,
        snowfall: 0,
        windSpeed: 18,
        weatherCode: 1
      };
      
      const score = ScoringService.calculateSurfingScore(weather);
      expect(score).toBeGreaterThan(70);
    });
  });

  describe('calculateOutdoorSightseeingScore', () => {
    test('returns high score for perfect weather', () => {
      const weather = {
        date: '2024-01-15',
        temperature: 22,
        precipitation: 0,
        snowfall: 0,
        windSpeed: 5,
        weatherCode: 0
      };
      
      const score = ScoringService.calculateOutdoorSightseeingScore(weather);
      expect(score).toBeGreaterThan(85);
    });

    test('returns low score for stormy weather', () => {
      const weather = {
        date: '2024-01-15',
        temperature: 15,
        precipitation: 25,
        snowfall: 0,
        windSpeed: 25,
        weatherCode: 95
      };
      
      const score = ScoringService.calculateOutdoorSightseeingScore(weather);
      expect(score).toBeLessThan(30);
    });
  });

  describe('calculateIndoorSightseeingScore', () => {
    test('returns high score when outdoor conditions are poor', () => {
      const weather = {
        date: '2024-01-15',
        temperature: 5,
        precipitation: 20,
        snowfall: 5,
        windSpeed: 20,
        weatherCode: 73
      };
      
      const score = ScoringService.calculateIndoorSightseeingScore(weather);
      expect(score).toBeGreaterThan(75);
    });
  });

  describe('getScoreDescription', () => {
    test('returns correct descriptions for score ranges', () => {
      expect(ScoringService.getScoreDescription(95)).toBe('Perfect');
      expect(ScoringService.getScoreDescription(85)).toBe('Excellent');
      expect(ScoringService.getScoreDescription(75)).toBe('Very Good');
      expect(ScoringService.getScoreDescription(65)).toBe('Good');
      expect(ScoringService.getScoreDescription(55)).toBe('Fair');
      expect(ScoringService.getScoreDescription(45)).toBe('Moderate');
      expect(ScoringService.getScoreDescription(35)).toBe('Poor');
      expect(ScoringService.getScoreDescription(25)).toBe('Bad');
      expect(ScoringService.getScoreDescription(10)).toBe('Terrible');
    });
  });
});
