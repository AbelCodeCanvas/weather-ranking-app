import { DailyWeather } from '../types';

export class ScoringService {
  static calculateSkiingScore(weather: DailyWeather): number {
    // Temperature: Ideal is -5°C to -1°C (40 points max)
    let tempScore = 0;
    if (weather.temperature <= -5) {
      tempScore = 35;
    } else if (weather.temperature <= -1) {
      tempScore = 40; // Ideal range
    } else if (weather.temperature <= 2) {
      tempScore = 25;
    } else if (weather.temperature <= 5) {
      tempScore = 10;
    }

    // Snowfall: 10cm+ is ideal (30 points max)
    let snowScore = Math.min(30, (weather.snowfall / 10) * 30);
    
    // Wind penalty: calm is better
    let windPenalty = 0;
    if (weather.windSpeed > 20) {
      windPenalty = 25;
    } else if (weather.windSpeed > 15) {
      windPenalty = 15;
    } else if (weather.windSpeed > 10) {
      windPenalty = 5;
    }

    // Precipitation penalty: dry is better
    let rainPenalty = Math.min(25, weather.precipitation * 5);

    // Weather code bonus for snow
    let weatherBonus = 0;
    if (weather.weatherCode && (weather.weatherCode === 71 || weather.weatherCode === 73 || weather.weatherCode === 75)) {
      weatherBonus = 15; // Snowfall codes
    }

    const total = Math.max(0, Math.min(100, 
      tempScore + snowScore - windPenalty - rainPenalty + weatherBonus
    ));
    
    return Math.round(total);
  }

  static calculateSurfingScore(weather: DailyWeather): number {
    // Estimate wave height from wind (simplified)
    const waveHeight = Math.min(3, weather.windSpeed / 8);
    
    // Wave height score (ideal: 1.5-2m)
    let waveScore = 0;
    if (waveHeight >= 1.5 && waveHeight <= 2) {
      waveScore = 50;
    } else if (waveHeight >= 1 && waveHeight <= 2.5) {
      waveScore = 40;
    } else if (waveHeight >= 0.5 && waveHeight <= 3) {
      waveScore = 25;
    } else {
      waveScore = Math.max(10, 15 + waveHeight * 5);
    }

    // Wind score (moderate is good for waves)
    let windScore = 0;
    if (weather.windSpeed >= 12 && weather.windSpeed <= 25) {
      windScore = 30;
    } else if (weather.windSpeed >= 8 && weather.windSpeed <= 30) {
      windScore = 20;
    } else {
      windScore = Math.max(5, 30 - Math.abs(weather.windSpeed - 18) * 2);
    }

    // Temperature bonus (warm is better)
    let tempScore = 0;
    if (weather.temperature >= 18) {
      tempScore = 20;
    } else if (weather.temperature >= 12) {
      tempScore = 15;
    } else if (weather.temperature >= 8) {
      tempScore = 10;
    }

    // Precipitation penalty
    let rainPenalty = Math.min(20, weather.precipitation * 4);

    const total = Math.max(0, Math.min(100, 
      waveScore + windScore + tempScore - rainPenalty
    ));
    
    return Math.round(total);
  }

  static calculateOutdoorSightseeingScore(weather: DailyWeather): number {
    // Temperature score (ideal: 18-24°C)
    const tempDiff = Math.abs(weather.temperature - 21);
    let tempScore = 0;
    if (tempDiff <= 3) {
      tempScore = 50;
    } else if (tempDiff <= 6) {
      tempScore = 40;
    } else if (tempDiff <= 10) {
      tempScore = 25;
    } else {
      tempScore = Math.max(10, 50 - tempDiff * 3);
    }

    // Precipitation penalty (exponential)
    let rainPenalty = 0;
    if (weather.precipitation > 0) {
      rainPenalty = Math.min(40, weather.precipitation * 10 + Math.pow(weather.precipitation, 1.5));
    }
    
    // Wind penalty
    let windPenalty = 0;
    if (weather.windSpeed > 15) {
      windPenalty = 20;
    } else if (weather.windSpeed > 10) {
      windPenalty = 10;
    } else if (weather.windSpeed > 6) {
      windPenalty = 5;
    }

    // Weather code bonus for clear weather
    let weatherBonus = 0;
    if (weather.weatherCode && weather.weatherCode === 0) {
      weatherBonus = 10; // Clear sky
    } else if (weather.weatherCode && (weather.weatherCode === 1 || weather.weatherCode === 2)) {
      weatherBonus = 5; // Mainly clear, partly cloudy
    }

    const total = Math.max(0, Math.min(100, 
      tempScore - rainPenalty - windPenalty + weatherBonus
    ));
    
    return Math.round(total);
  }

  static calculateIndoorSightseeingScore(weather: DailyWeather): number {
    // Inverse of outdoor score with adjustments
    const outdoorScore = this.calculateOutdoorSightseeingScore(weather);
    
    // Bad weather makes indoor more appealing
    let weatherBonus = 0;
    if (weather.weatherCode) {
      // Rain/snow codes
      if (weather.weatherCode >= 51 && weather.weatherCode <= 67) {
        weatherBonus += 20; // Rain
      }
      if (weather.weatherCode >= 71 && weather.weatherCode <= 77) {
        weatherBonus += 25; // Snow
      }
      if (weather.weatherCode >= 80 && weather.weatherCode <= 86) {
        weatherBonus += 15; // Showers
      }
      if (weather.weatherCode >= 95 && weather.weatherCode <= 99) {
        weatherBonus += 30; // Thunderstorm
      }
    }
    
    // Extreme temperatures make indoor better
    let tempBonus = 0;
    if (weather.temperature < 5 || weather.temperature > 28) {
      tempBonus = 25;
    } else if (weather.temperature < 10 || weather.temperature > 24) {
      tempBonus = 15;
    }

    // High wind makes indoor better
    let windBonus = 0;
    if (weather.windSpeed > 20) {
      windBonus = 20;
    } else if (weather.windSpeed > 15) {
      windBonus = 10;
    }

    const total = Math.max(0, Math.min(100, 
      (100 - outdoorScore) * 0.6 + weatherBonus + tempBonus + windBonus
    ));
    
    return Math.round(total);
  }

  static getScoreDescription(score: number): string {
    if (score >= 90) return 'Perfect';
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 50) return 'Fair';
    if (score >= 40) return 'Moderate';
    if (score >= 30) return 'Poor';
    if (score >= 20) return 'Bad';
    return 'Terrible';
  }
}
