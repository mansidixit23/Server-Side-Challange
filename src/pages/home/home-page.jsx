import React, { useState } from 'react';
import './home-page.style.scss';
import { useSelector } from 'react-redux';
import NewsBox from '../../components/news-box/news-box.component';
import axios from 'axios';
import imageforBluff  from './assets/WhatsApp Image 2024-09-12 at 01.18.37.jpeg'
function HomePage() {
    const [temperature, setTemperature] = useState(null);
    const news = useSelector((state) => state.news.news);
  
    // Function to fetch the temperature based on user location
    const fetchTemperature = async (lat, lon) => {
      try {
        const apiKey = "ad17a6ce78816364bf2f3f1dbd054bd2"; 
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        const temp = response.data.main.temp; // Get the temperature in Celsius
        setTemperature(temp);
      } catch (error) {
        console.error("Error fetching the weather data:", error);
      }
    };
  
    // Function to get the user's location and fetch temperature
    const handleImageClick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          fetchTemperature(latitude, longitude);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };
  
    return (
      <div className="home-page-container">
        <div className="top-news-container">
          <div className="heading-wrap">
            <h1 className="title">Top News</h1>
            <img
              height={50}
              style={{ borderRadius: "50px", cursor: "pointer" }}
              src={imageforBluff}
              alt="Sky"
              onClick={handleImageClick} // Trigger the temperature fetch on click
            />
            {temperature && <p>Current Temperature: {temperature}°C</p>}
          </div>
          {news
            .filter((item) => item.urlToImage)
            .map((item, index) => {
              return <NewsBox key={index} item={item} />;
            })}
        </div>
      </div>
    );
  }
  
  export default HomePage;
