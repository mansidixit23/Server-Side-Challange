import React, { useState, useEffect } from "react";
import "./Quotes.css"; // Importing external CSS

const QuoteDisplay = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await fetch(
          "https://api.api-ninjas.com/v1/quotes?category=happiness",
          {
            method: "GET",
            headers: {
              "X-Api-Key": "dL4htf7lPBOLKzY0kX2RLA==AIOlx2KNl8jZYK0N",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setQuoteData(data[0]);  // Assuming we only need the first quote from the response
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuoteData();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="quote-container">
      <h1 className="title">Quote of the Day</h1>
      {quoteData ? (
        <div className="quote-box">
          <blockquote className="quote">
            <p>"{quoteData.quote}"</p>
            <footer className="author">- {quoteData.author}</footer>
          </blockquote>
          <p className="category"><strong>Category:</strong> <span className="categoryclass">{quoteData.category}</span></p>
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default QuoteDisplay;
