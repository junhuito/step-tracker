import { connect } from 'react-redux';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { fetchWeatherAction } from '../redux/actions';
import { useEffect, useState } from 'react';

function WeatherScreen(props:any) {

  const { data, error, fetchWeather } = props;

  const [haha, setHaha] = useState("");

  useEffect(() => {
    fetchWeather();
  }, [])

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
      <Text>{haha}</Text>
      <Button onPress={()=>setHaha("haha")} title='OOPS'/>
    </View>
  );
}

const mapStateToProps = (state: any) => ({
  data: state.weatherReducer.data,
  error: state.weatherReducer.error.message,
});

const mapStateToDispatch = (dispatch: any) => ({
  fetchWeather: () => dispatch(fetchWeatherAction()),
})

export default connect(mapStateToProps, mapStateToDispatch)(WeatherScreen); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
