import { connect } from "react-redux";
import { Image, StyleSheet } from "react-native";
import { Spacer, Text, View } from "component";
import { fetchWeatherAction } from "../redux/actions";
import { useEffect } from "react";
import { getWeatherIcon } from "../../utils/weatherCodeUtil";
import { IWeatherData, IWeatherError } from "../interfaces/weatherInterface";
import { getTodayDayName } from "../../utils/dateUtil";

interface IWeatherScreen {
  data: IWeatherData;
  error: IWeatherError;
  fetchWeather: Function;
}

function WeatherScreen(props: IWeatherScreen) {
  const { data, error, fetchWeather } = props;

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.weatherDate}>{getTodayDayName()}</Text>
      <View style={styles.weatherContainer}>
        <Image source={getWeatherIcon(data.weathercode)} style={styles.weatherIcon} />
        <View style={styles.weatherTextContainer}>
          <Text style={styles.temperatureText}>{data.temperature || 0 } °C</Text>
          <Text numberOfLines={2} style={styles.weatherText}>{data.weather}</Text>
        </View>
      </View>
      <Spacer large/>
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  data: state.weatherReducer.data,
  error: state.weatherReducer.error.message,
});

const mapStateToDispatch = (dispatch: any) => ({
  fetchWeather: () => dispatch(fetchWeatherAction()),
});

export default connect(mapStateToProps, mapStateToDispatch)(WeatherScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "purple",
  },
  weatherDate: {
    fontWeight: 'bold',
    fontSize: 40,
    color: "white",
    flexWrap: "wrap",
    alignSelf: "center",
    padding: 20,
  },
  weatherContainer: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "transparent",
    height: 100,
    width: "100%",
  },
  weatherIcon: {
    height: "100%",
    flex: 1,
    resizeMode: "contain",
  },
  weatherTextContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'transparent',
  },
  temperatureText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: "white",
  },
  weatherText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: "white",
  }
});
