// WeatherCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherCard = ({ day, temp, feelsLike, weather }) => {
  return (
    <View style={styles.weekWeathercard}>
      <Text style={styles.day}>{day}</Text>
      <Text>{temp} °C</Text>
      <Text>Feels like {feelsLike} °C</Text>
      <Text>{weather}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  day: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default WeatherCard;
