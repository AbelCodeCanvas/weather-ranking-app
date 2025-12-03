import fetch from 'node-fetch';
import { Coordinates, ForecastData } from '../types';

export class OpenMeteoClient {
  private static readonly BASE_URL = 'https://api.open-meteo.com/v1';
  private static readonly GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';

  static async searchLocation(city: string): Promise<Coordinates> {
    try {
      const response = await fetch(
        `${this.GEOCODING_URL}/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.statusText}`);
      }
      
      const data: any = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error(`City "${city}" not found`);
      }
      
      const result = data.results[0];
      return {
        latitude: result.latitude,
        longitude: result.longitude,
        name: result.name
      };
    } catch (error) {
      throw new Error(`Failed to geocode city "${city}": ${error.message}`);
    }
  }

  static async getForecast(latitude: number, longitude: number): Promise<any> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,windspeed_10m_max,weathercode&timezone=auto&forecast_days=7`
      );
      
      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.statusText}`);
      }
      
      const data: ForecastData = await response.json();
      
      // Transform the data into our DailyWeather format
      const dailyWeather = data.daily.time.map((date: string, index: number) => ({
        date,
        temperature: (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2,
        precipitation: data.daily.precipitation_sum[index],
        snowfall: data.daily.snowfall_sum[index],
        windSpeed: data.daily.windspeed_10m_max[index],
        weatherCode: data.daily.weathercode[index]
      }));
      
      return dailyWeather;
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  }
}
