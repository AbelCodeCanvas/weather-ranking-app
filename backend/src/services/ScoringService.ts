import { DailyWeather, Activity } from '../types';

export class ScoringService {
  private static readonly MIN_TEMP_SKIING = -10;
  private static readonly MAX_TEMP_SKIING = 2;
  private static readonly IDEAL_TEMP_OUTDOOR = 22;
  private static readonly TEMP_RANGE_OUTDOOR = 10;

  static calculateSkiingScore(weather: DailyWeather): number {
    // Temperature score (ideal: -5°C to -1°C)
    let tempScore = 0;
    if (weather.temperature <= -5) {
      tempScore = 40;
    } else if (weather.temperature <= -1) {
      tempScore = 35;
    } else if (weather.temperature <= 2) {
      tempScore = 20;
    } else if (weather.temperature <= 5) {
      tempScore = 10;
    }

    // Snowfall score (ideal: >10cm)
    let snowScore = Math.min(30, (weather.snowfall / 10) * 30);
    
    // Wind penalty (calm is better)
    let windPenalty = 0;
    if (weather.windSpeed > 15) {
      windPenalty = 20;
    } else if (weather.windSpeed > 10) {
      windPenalty = 10;
    }

    // Precipitation penalty
    let rainPenalty = Math.min(20, weather.precipitation * 2);

    return Math.max(0, Math.min(100, tempScore + snowScore - windPenalty - rainPenalty));
  }

  static calculateSurfingScore(weather: DailyWeather): number {
    if (!weather.waveHeight) return 0;

    // Wave height score (ideal: 1.5-2.5m)
    let waveScore = 0;
    if (weather.waveHeight >= 1.5 && weather.waveHeight <= 2.5) {
      waveScore = 40;
    } else if (weather.waveHeight >= 1.0 && weather.waveHeight <= 3.0) {
      waveScore = 30;
    } else {
      waveScore = 10 + (weather.waveHeight * 5);
    }

    // Wind score (moderate is good for waves)
    let windScore = 0;
    if (weather.windSpeed >= 10 && weather.windSpeed <= 20) {
      windScore = 30;
    } else if (weather.windSpeed >= 5 && weather.windSpeed <= 25) {
      windScore = 20;
    } else {
      windScore = 10;
    }

    // Temperature bonus (warm is better)
    let tempScore = Math.max(0, Math.min(20, (weather.temperature - 10) * 2));

    // Precipitation penalty
    let rainPenalty = Math.min(15, weather.precipitation * 3);

    return Math.max(0, Math.min(100, waveScore + windScore + tempScore - rainPenalty));
  }

  static calculateOutdoorSightseeingScore(weather: DailyWeather): number {
    // Temperature score (ideal: 18-26°C)
    let tempScore = 0;
    const tempDiff = Math.abs(weather.temperature - 22);
    if (tempDiff <= 4) {
      tempScore = 40;
    } else if (tempDiff <= 8) {
      tempScore = 30;
    } else {
      tempScore = Math.max(10, 40 - tempDiff * 2);
    }

    // Precipitation penalty (dry is better)
    let rainPenalty = Math.min(40, weather.precipitation * 8);
    
    // Wind penalty (calm is better)
    let windPenalty = 0;
    if (weather.windSpeed > 20) {
      windPenalty = 20;
    } else if (weather.windSpeed > 10) {
      windPenalty = 10;
    }

    return Math.max(0, Math.min(100, tempScore - rainPenalty - windPenalty));
  }

  static calculateIndoorSightseeingScore(weather: DailyWeather): number {
    // Inverse of outdoor score - bad weather makes indoor better
    const outdoorScore = this.calculateOutdoorSightseeingScore(weather);
    
    // Also consider if it's extremely cold or hot
    let extremeTempBonus = 0;
    if (weather.temperature < 0 || weather.temperature > 30) {
      extremeTempBonus = 20;
    }
    
    // Heavy rain or snow makes indoor more appealing
    let precipitationBonus = Math.min(30, weather.precipitation * 3 + weather.snowfall);
    
    return Math.max(0, Math.min(100, 100 - outdoorScore + extremeTempBonus + precipitationBonus));
  }

  static getScoreDescription(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Poor';
    return 'Very Poor';
  }
}
