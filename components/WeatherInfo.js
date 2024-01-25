// Weather.js
import React from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import WeatherCard from './WeatherCard';


const WeatherInfo = ({ currentWeather, weekWeather }) => {
  // Creating an object to store unique week weather data for each day
  const uniqueWeekWeather = {};

  // Populating uniqueWeekWeather object with weekWeather data
  for (const dayWeather of weekWeather) {
    const day = new Date(dayWeather.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
    if (!uniqueWeekWeather[day]) {
      uniqueWeekWeather[day] = dayWeather;
    }
  }

  // Creating an array of unique week weather data
  const weekWeatherItems = Object.values(uniqueWeekWeather);

  // JSX for rendering the Weather component
  return (
    <ScrollView>
      <View style={styles.weatherInfobox}>
        <Text style={styles.header2}>Weather</Text>

        {/* Rendering current weather information */}
        <View style={styles.currentWeatherbox}>
          <Text style={styles.location}>
            {currentWeather.name}, {currentWeather.sys && currentWeather.sys.country}
          </Text>
          <Text style={styles.temperature}>
            {currentWeather.main && Math.floor(currentWeather.main.temp)} °C
          </Text>
          <Text style={styles.detail}>Feels like {currentWeather.main && Math.floor(currentWeather.main.feels_like)} °C</Text>
          <Text style={styles.detail}>Speed: {currentWeather.wind && currentWeather.wind.speed} m/s W</Text>
          <Text style={styles.detail}>Humidity: {currentWeather.main && currentWeather.main.humidity}%</Text>
        </View>

        {/* Rendering week weather information using FlatList */}
        <View style={styles.weekWeatherbox}>
          <Text style={styles.header}>Weather Of The Week</Text>
          <FlatList
            data={weekWeatherItems}
            keyExtractor={(item) => item.dt_txt}
            renderItem={({ item }) => (
              <WeatherCard
                day={new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
                temp={Math.floor(item.main.temp)}
                feelsLike={Math.floor(item.main.feels_like)}
                weather={item.weather[0].description}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  weatherInfobox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6eb6ed',
  },

  weekWeatherbox: {
    borderRadius: 8,
    marginBottom: 20,
    width: '105%',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  weekWeathercard: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#1c76ba',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  currentWeatherbox: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: '105%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  location: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 10,
    color: '#000000',
  },
  temperature: {
    fontSize: 28,
    color: '#000000',
    fontFamily: 'sans-serif-medium',
    marginBottom: 10,
    fontWeight: '500',
  },

  detail: {
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
    marginBottom: 10,
    fontWeight: '800',
    color: '#000000',
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  header2: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default WeatherInfo;
