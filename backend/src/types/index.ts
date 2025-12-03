export interface DailyWeather {
  date: string;
  temperature: number;
  precipitation: number;
  snowfall: number;
  windSpeed: number;
  waveHeight?: number;
  weatherCode?: number;
}

export interface DailyScore {
  date: string;
  score: number;
  description: string;
}

export interface ActivityRanking {
  activity: string;
  scores: DailyScore[];
  bestDay: string | null;
  worstDay: string | null;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
  name: string;
}

export interface ForecastData {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    snowfall_sum: number[];
    windspeed_10m_max: number[];
    weathercode: number[];
  };
}
