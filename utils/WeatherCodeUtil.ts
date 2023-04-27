export enum WeatherCode {
  CLEAR_SKY = 0,
  MAINLY_CLEAR = 1,
  PARTLY_CLOUDY = 2,
  OVERCAST = 3,
  FOG = 45,
  DEPOSITING_RIME_FOG = 48,
  DRIZZLE_LIGHT = 51,
  DRIZZLE_MODERATE = 53,
  DRIZZLE_DENSE = 55,
  FREEZING_DRIZZLE_LIGHT = 56,
  FREEZING_DRIZZLE_DENSE = 57,
  RAIN_SLIGHT = 61,
  RAIN_MODERATE = 63,
  RAIN_HEAVY = 65,
  FREEZING_RAIN_LIGHT = 66,
  FREEZING_RAIN_HEAVY = 67,
  SNOW_FALL_SLIGHT = 71,
  SNOW_FALL_MODERATE = 73,
  SNOW_FALL_HEAVY = 75,
  SNOW_GRAINS = 77,
  RAIN_SHOWERS_SLIGHT = 80,
  RAIN_SHOWERS_MODERATE = 81,
  RAIN_SHOWERS_VIOLENT = 82,
  SNOW_SHOWERS_SLIGHT = 85,
  SNOW_SHOWERS_HEAVY = 86,
  THUNDERSTORM_SLIGHT = 95,
  THUNDERSTORM_WITH_SLIGHT_HAIL = 96,
  THUNDERSTORM_WITH_HEAVY_HAIL = 99,
}

export function getWeatherCondition(weatherCode: number): string {
  switch (weatherCode) {
    case WeatherCode.CLEAR_SKY:
      return "Clear sky";
    case WeatherCode.MAINLY_CLEAR:
      return "Mainly clear";
    case WeatherCode.PARTLY_CLOUDY:
      return "Partly cloudy";
    case WeatherCode.OVERCAST:
      return "Overcast";
    case WeatherCode.FOG:
      return "Fog";
    case WeatherCode.DEPOSITING_RIME_FOG:
      return "Depositing rime fog";
    case WeatherCode.DRIZZLE_LIGHT:
      return "Drizzle: Light intensity";
    case WeatherCode.DRIZZLE_MODERATE:
      return "Drizzle: Moderate intensity";
    case WeatherCode.DRIZZLE_DENSE:
      return "Drizzle: Dense intensity";
    case WeatherCode.FREEZING_DRIZZLE_LIGHT:
      return "Freezing Drizzle: Light intensity";
    case WeatherCode.FREEZING_DRIZZLE_DENSE:
      return "Freezing Drizzle: Dense intensity";
    case WeatherCode.RAIN_SLIGHT:
      return "Rain: Slight intensity";
    case WeatherCode.RAIN_MODERATE:
      return "Rain: Moderate intensity";
    case WeatherCode.RAIN_HEAVY:
      return "Rain: Heavy intensity";
    case WeatherCode.FREEZING_RAIN_LIGHT:
      return "Freezing Rain: Light intensity";
    case WeatherCode.FREEZING_RAIN_HEAVY:
      return "Freezing Rain: Heavy intensity";
    case WeatherCode.SNOW_FALL_SLIGHT:
      return "Snow fall: Slight intensity";
    case WeatherCode.SNOW_FALL_MODERATE:
      return "Snow fall: Moderate intensity";
    case WeatherCode.SNOW_FALL_HEAVY:
      return "Snow fall: Heavy intensity";
    case WeatherCode.SNOW_GRAINS:
      return "Snow grains";
    case WeatherCode.RAIN_SHOWERS_SLIGHT:
      return "Rain showers: Slight intensity";
    case WeatherCode.RAIN_SHOWERS_MODERATE:
      return "Rain showers: Moderate intensity";
    case WeatherCode.RAIN_SHOWERS_VIOLENT:
      return "Rain showers: Violent intensity";
    case WeatherCode.SNOW_SHOWERS_SLIGHT:
      return "Snow showers: Slight intensity";
    case WeatherCode.SNOW_SHOWERS_HEAVY:
      return "Snow showers: Heavy intensity";
    case WeatherCode.THUNDERSTORM_SLIGHT:
      return "Thunderstorm: Slight or moderate";
    case WeatherCode.THUNDERSTORM_WITH_SLIGHT_HAIL:
      return "Thunderstorm with slight hail";
    case WeatherCode.THUNDERSTORM_WITH_HEAVY_HAIL:
      return "Thunderstorm with heavy hail";
    default:
      return "Unknown";
  }
}
