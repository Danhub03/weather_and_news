// Importing necessary React and React Native components and libraries
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import News from './components/News'; // Import the News component
import WeatherInfo from './components/WeatherInfo';  // Import WeatherInfo component
import Home from './components/Home';  // Import Home component
import { weatherApiKey } from './components/apiKeys'; // Import the weather API key
import { weatherweekApiKey } from './components/apiKeys'; // Import the weather API key

// Create a bottom tab navigator
const Tab = createBottomTabNavigator();

// MyTabs component
function MyTabs() {
  // State variables for current weather and week weather
  const [currentWeather, setCurrentWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);

  // useEffect hook to fetch weather data on component mount
  useEffect(() => {
    const getWeather = async () => {
      try {
        // Fetch current weather using OpenWeatherMap API
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=59.3613&lon=17.9711&appid=${weatherApiKey}&units=metric`
        );
        setCurrentWeather(response.data);
      } catch (error) {
        console.error('Error fetching current weather:', error);
      }
    };

    const getWeekWeather = async () => {
      try {
        // Fetch week weather using OpenWeatherMap API
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?id=2670879&exclude=current,hourly,minutely,alerts&appid=${weatherweekApiKey}&units=metric`
        );
        setWeekWeather(response.data.list);
      } catch (error) {
        console.error('Error fetching week weather:', error);
      }
    };

    // Call the functions to fetch weather data
    getWeather();
    getWeekWeather();
  }, []);

  // Return the bottom tab navigator with tabs for Home, Weather, and News
  return (
    <Tab.Navigator
      initialRouteName="Weather & News"
      screenOptions={{
        tabBarActiveTintColor: '#0080ff',
      }}
    >
      {/* Home tab */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      {/* Weather tab */}
      <Tab.Screen
        name="Weather"
        options={{
          tabBarLabel: 'Weather',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rainy" color={color} size={size} />
          ),
        }}
      >
        {/* Pass currentWeather and weekWeather as props to WeatherInfo component */}
        {() => <WeatherInfo currentWeather={currentWeather} weekWeather={weekWeather} />}
      </Tab.Screen>

      {/* News tab */}
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Main component rendering the bottom tab navigator within NavigationContainer
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}