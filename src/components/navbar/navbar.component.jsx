import React, { useContext, useEffect, useState } from 'react';
import './navbar.style.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCateredNews } from '../../features/cateredNewsSlice';
import { UserContext } from '../../context/user-context';
import logo from './Black and White Minimalist Professional Initial Logo.png';
import axios from 'axios';
import imageforBluff from '../../assets/WhatsApp Image 2024-09-12 at 01.18.37.jpeg';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser, userDoc } = useContext(UserContext);
  const [temperature, setTemperature] = useState(null);

  // Fetch Temperature based on user location
  const fetchTemperature = async (lat, lon) => {
    try {
      const apiKey = 'ad17a6ce78816364bf2f3f1dbd054bd2';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      setTemperature(response.data.main.temp);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleImageClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchTemperature(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (currentUser) {
      const topicsBar = document.getElementById('topics-bar');
      topicsBar.childNodes.forEach((node) => {
        dispatch(fetchCateredNews(node.innerText));
      });
    }
  }, [dispatch, currentUser]);

  const goToCategoryPage = (category) => navigate(`/news/${category}`);
  const isActiveTopic = (path) => location.pathname.includes(path);

  return (
    <div className='navbar-container'>
      <nav className='navbar'>
        <Link to='/' className='nav-link'>
          <img className='nav-logo' src={logo} alt='Logo' />
          <h1 className='nav-title'>BridgeBhasha</h1>
        </Link>

        {currentUser && (
          <ul className='nav-links-container'>
            <li>
              <label htmlFor='lang'>Lang:</label>
              <select id='lang'>
                <option value='ENG'>ENG</option>
                <option value='Hindi'>Hindi</option>
                <option value='Punjabi'>Punjabi</option>
              </select>
            </li>
            <li>
              <label htmlFor='loc'>Location:</label>
              <select id='loc'>
                <option value='chd'>Chandigarh</option>
                <option value='rj'>Rajasthan</option>
              </select>
            </li>
            <li>
              <Link to='/account/bookmarks' className='nav-link'>Bookmarks</Link>
            </li>
            <li>
              <Link to='/account' className='nav-link user-link'>
                <img
                  src={userDoc?.photoURL || 'https://via.placeholder.com/40'}
                  alt={userDoc?.displayName || 'User'}
                />
                <span>{userDoc?.username}</span>
              </Link>
            </li>
          </ul>
        )}
      </nav>

      {/* Topics Bar */}
      {currentUser && (
        <div className='topics-bar' id='topics-bar'>
          {['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology', 'Quotes', 'Giphy'].map((topic) => (
            <span
              key={topic}
              className={`topic${isActiveTopic(topic) ? ' active' : ''}`}
              onClick={() => goToCategoryPage(topic)}
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Floating Weather Button */}
      <div className='weather-button' onClick={handleImageClick}>
        <img src={imageforBluff} alt='Weather' />
        {temperature && <p>{temperature}°C</p>}
      </div>
    </div>
  );
}

export default Navbar;
