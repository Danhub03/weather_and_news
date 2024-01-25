// News.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import axios from 'axios';
import { newsApiKey } from './apiKeys'; // Import the weather API key


const News = () => {
  // State variable to store news articles
  const [articles, setArticles] = useState([]);

  // useEffect hook to fetch news data from News API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`);
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    // Calling the function to fetch news data
    fetchNews();
  }, []);

  // Function to open an article URL in a browser
  const openArticle = (url) => {
    Linking.openURL(url);
  };

  // JSX for rendering the News component
  return (
    <View>
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>News</Text>
      {/* Rendering news articles using FlatList */}
      <FlatList
        data={articles}
        keyExtractor={(article) => article.url}
        renderItem={({ item }) => (
          <View style={{ flex: 1, padding: 10 }}>
            <Image source={{ uri: item.urlToImage }} style={{ width: '100%', height: 150, marginRight: 10 }} />
            {/* TouchableOpacity to open the article URL in a browser */}
            <TouchableOpacity onPress={() => openArticle(item.url)}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
              <Text style={{ fontSize: 16, fontStyle: 'italic' }}>{item.source.name}</Text>
              <Text style={{ fontSize: 14 }}>{item.description}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default News;
