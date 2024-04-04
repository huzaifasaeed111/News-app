import axios from 'axios';

const apiKey = 'f1e926f0cfd24c3183332b8beaf4307b'; 

const newsService = {
  async fetchTopHeadlines(country = 'us', category = 'business') {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching news data');
    }
  }
};

export default newsService;