import React, { useState, useEffect } from "react";
import "./GifLoader.css"; // Importing external CSS

const GifLoader = () => {
  const [query, setQuery] = useState("sadness");  // Default query
  const [gifData, setGifData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGifData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://tenor.googleapis.com/v2/search?q=${query}&random=true&key=AIzaSyB2yMhbOoEyLfYZCbP8Ip_T2snTJ7p5uMI&client_key=my_test_app&limit=8`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      
      // Randomly select a GIF from the results
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setGifData(data.results[randomIndex]);
      
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Handle form submission to fetch GIF based on user input
  const handleSearch = (e) => {
    e.preventDefault();
    fetchGifData();  // Fetch new GIF based on updated query
  };

  return (
    <div className="outerbody">
    <div className="gif-container">
      <h1 className="title">GIF Search</h1>

      {/* Form for user input */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <div className="loader">Loading...</div>}
      {error && <p className="error">Error: {error}</p>}

      {/* Display GIFs if available */}
      {gifData && !loading && (
        <>
        
          <div className="gif-box">
            <h2 className="gif-title">GIF</h2>
            <img
              id="share_gif"
              src={gifData.media_formats.gif.url}
              alt="Share GIF"
              className="gif-share"
            />
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default GifLoader;
