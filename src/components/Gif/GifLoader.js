import React, { useState, useEffect } from "react";
import "./GifLoader.css"; // Importing external CSS

const GifLoader = () => {
  const [gifData, setGifData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGifData = async () => {
      try {
        const response = await fetch(
          `https://tenor.googleapis.com/v2/search?q=sadness&key=AIzaSyB2yMhbOoEyLfYZCbP8Ip_T2snTJ7p5uMI&client_key=my_test_app&limit=8`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setGifData(data.results[0]);  // Assuming you want to display the first GIF
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGifData();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="outerbody">
    <div className="gif-container">
      <h1 className="title">GIF of the Day</h1>
      {gifData ? (
        <>
          <div className="gif-box">
            <h2 className="gif-title">Preview GIF</h2>
            <img
              id="preview_gif"
              src={gifData.media_formats.nanogif.url}
              alt="Preview GIF"
              className="gif-preview"
            />
          </div>
          <div className="gif-box">
            <h2 className="gif-title">Share GIF</h2>
            <img
              id="share_gif"
              src={gifData.media_formats.gif.url}
              alt="Share GIF"
              className="gif-share"
            />
          </div>
        </>
      ) : (
        <p>No GIF data available.</p>
      )}
    </div>
    </div>
  );
};

export default GifLoader;
