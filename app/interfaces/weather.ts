export interface IWeatherData {
  is_day: number;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
  weather: string;
}

export interface IWeatherResponseData {
  current_weather: Omit<IWeatherData, "weather">;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export interface IWeatherReducer {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isLoading: boolean;
  error: IWeatherError;
  data?: IWeatherData;
};

export interface IWeatherAction {
  type: string;
  payload?: any;
};

export interface IWeatherError {
  message: string
}
