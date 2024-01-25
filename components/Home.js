// Importing necessary React and React Native components and libraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import News from './News'; // Import the News component
import WeatherInfo from './WeatherInfo';  // Import Weather component



// Home component
function Home() {
    // State variables for current date, day, time, current weather, and week weather
    const [currentDate, setCurrentDate] = useState(null);
    const [currentDay, setCurrentDay] = useState('');
    const [currentTime, setCurrentTime] = useState(null);
    const [currentWeather, setCurrentWeather] = useState({});
    const [weekWeather, setWeekWeather] = useState([]);

  
    // Function to fetch data (current date, time, weather) from APIs
    const handleFetchData = async () => {
      // Setting the current date, day, and time
      const currentDate = new Date();
      setCurrentDate(currentDate);
      const currentDayNumeric = currentDate.getDay();
      const currentDayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      setCurrentDay(currentDayName);
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Stockholm',
      });
      setCurrentTime(currentTime);
  
      // Function to fetch current weather using OpenWeatherMap API
      const getWeather = async () => {
        try {
          const response = await axios.get(
            'https://api.openweathermap.org/data/2.5/weather?lat=59.3613&lon=17.9711&appid=846eafb6759b6afae2d952175294a7bf&units=metric'
          );
          setCurrentWeather(response.data);
        } catch (error) {
          console.error('Error fetching current weather:', error);
        }
      };
  
      // Function to fetch week weather using OpenWeatherMap API
      const getWeekWeather = async () => {
        try {
          const response = await axios.get(
            'http://api.openweathermap.org/data/2.5/forecast?id=2670879&exclude=current,hourly,minutely,alerts&appid=454041ea7e6b537bbedaee0c9bbc0592&units=metric'
          );
          setWeekWeather(response.data.list);
        } catch (error) {
          console.error('Error fetching week weather:', error);
        }
      };
  
      // Calling the functions to fetch weather data
      getWeather();
      getWeekWeather();
    };
  
    // useEffect hook to execute handleFetchData on component mount
    useEffect(() => {
      handleFetchData();
    }, []);
  
    // JSX for rendering the Home component
    return (
      <ScrollView>
        <View style={styles.Box}></View>
  
        <View style={styles.currentDatebox}>
          <Text style={styles.currentDate}>{currentDay} {currentDate?.toLocaleDateString('en-US')}</Text>
          <Text style={styles.currentTime}>{currentTime}</Text>
        </View>
  
        {/* Rendering the Weather component with currentWeather and weekWeather as props */}
        <WeatherInfo currentWeather={currentWeather} weekWeather={weekWeather} />
  
        {/* Rendering the News component */}
        <News />
      </ScrollView>
    );
  }
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
      color: '#000000'
      
      
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
      color: '#000000'
  
    },
    
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign:'center',
      fontFamily: 'sans-serif-medium',
  
    },
    header2: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign:'center',
      fontFamily: 'sans-serif-medium',
  
    },
    day: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  
    Box: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#6eb6ed',
      flexDirection: 'column',
      height:70
      
    },
  
    currentDatebox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
      flexDirection: 'column',
      height:200
  
      
    },
    currentDate: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    currentTime: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });
  export default Home;