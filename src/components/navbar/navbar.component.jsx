
import React, { useContext, useEffect } from "react";
import "./navbar.style.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCateredNews } from "../../features/cateredNewsSlice";
import { UserContext } from "../../context/user-context";
// import logo from "./Black and White Minimalist Professional Initial Logo.png";

function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  const { currentUser, userDoc } = useContext(UserContext);

  const goToNewsPage = () => {
    navigate("/news");
  };

  const goToBookmarks = () => {
    navigate("/account/bookmarks");
  };

  const goToCategoryPage = (searchString) => {
    navigate(`/news/${searchString}`);
  };

  useEffect(() => {
    const topicsBar = document.getElementById("topics-bar");

    currentUser &&
      topicsBar.childNodes.forEach((node, index) => {
        if (index > 0) {
          dispatch(fetchCateredNews(node.innerText));
        }
      });
  }, [dispatch, currentUser]);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="nav-link">
          {/* <img className="nav-logo" src={logo} alt="Logo" /> */}
          <h1 className="nav-title">BridgeBhasha</h1>
        </Link>

        {currentUser && (
          <ul className="nav-links-container">
            <li>
              <label for="lang">lang:</label>
              <select id="lang">
                <option value="ENG">ENG</option>
                <option value="Hindi">Hindi</option>
                <option value="Punjabi">Punjabi</option>
              </select>
            </li>
            <li>
              <label for="loc">location:</label>

              <select id="loc">
                <option value="chd">Chandigarh</option>
                <option value="rj">Rajasthan</option>
              </select>
            </li>

            <li>
              <Link to="/account/bookmarks" className="nav-link">
                Bookmarks
              </Link>
            </li>

            <li>
              <Link to="/account" className="nav-link user-link">
                <img src={userDoc?.photoURL} alt={userDoc?.displayName} />
                <span>{userDoc?.username}</span>
              </Link>
            </li>
          </ul>
        )}
      </nav>

      {currentUser && (
        <div className="topics-bar" id="topics-bar">
          <span
            className={`topic${
              location.pathname === "/account/bookmarks" ? " active" : ""
            }`}
            onClick={goToBookmarks}
          >
            Bookmarks
          </span>
          <span
            className={`topic${location.pathname === "/news" ? " active" : ""}`}
            onClick={goToNewsPage}
          >
            General
          </span>
          <span
            className={`topic${
              location.pathname.split("/news/")[1] === "Business"
                ? " active"
                : ""
            }`}
            onClick={() => goToCategoryPage("Business")}
          >
            Business
          </span>
          <span
            className={`topic${
              location.pathname.split("/news/")[1] === "Entertainment"
                ? " active"
                : ""
            }`}
            onClick={() => goToCategoryPage("Entertainment")}
          >
            Entertainment
          </span>
          <span
            className={`topic${
              location.pathname.split("/news/")[1] === "Health" ? " active" : ""
            }`}
            onClick={() => goToCategoryPage("Health")}
          >
            Health
          </span>
          <span
            className={`topic${
              location.pathname.split("/news/")[1] === "Science"
                ? " active"
                : ""
            }`}
            onClick={() => goToCategoryPage("Science")}
          >
            Science
          </span>
          <span
            className={`topic${
              location.pathname.split("/news/")[1] === "Sports" ? " active" : ""
            }`}
            onClick={() => goToCategoryPage("Sports")}
          >
            Sports
          </span>
          <span
            className={`topic${
              location.pathname.split("/news/")[1] === "Technology"
                ? " active"
                : ""
            }`}
            onClick={() => goToCategoryPage("Technology")}
          >
            Technology
          </span>
          <span
            className={`topic${
              location.pathname === "/quotes" ? " active" : ""
            }`}
            onClick={() => navigate("/quotes")}
          >
            Quotes
          </span>
          <span
            className={`topic${
              location.pathname === "/Giphy" ? " active" : ""
            }`}
            onClick={() => navigate("/Giphy")}
          >
            Giphy
          </span>

import React, { useContext, useEffect } from 'react';
import './navbar.style.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCateredNews } from '../../features/cateredNewsSlice';
import { UserContext } from '../../context/user-context';
import logo from './Black and White Minimalist Professional Initial Logo.png';
function Navbar() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const location = useLocation();

    const { currentUser, userDoc } = useContext(UserContext);

    const goToNewsPage = () => {
        navigate('/news');
    }

    const goToBookmarks = () => {
        navigate('/account/bookmarks');
    }

    const goToCategoryPage = (searchString) => {
        navigate(`/news/${searchString}`);
    }

    useEffect(() => {
        const topicsBar = document.getElementById('topics-bar');

        currentUser && topicsBar.childNodes.forEach((node, index) => {
            if(index > 0) {
                dispatch(fetchCateredNews(node.innerText));
            }
        });
    }, [dispatch, currentUser]);

    return (
        <div className='navbar-container'>
            <nav className='navbar'>
                <Link 
                    to='/' 
                    className='nav-link' 
                >
                    <img className='nav-logo' src={logo} alt="Logo" />
                    <h1 className='nav-title'>BridgeBhasha</h1>
                </Link>

                {currentUser && <ul className="nav-links-container">
                    <li>
                        
                    <label for="lang">lang:</label>
               <select id="lang">
               <option value="ENG">ENG</option>
               <option value="Hindi">Hindi</option>
               <option value="Punjabi">Punjabi</option>
               
               </select>
                        
                    </li>
                    <li>
                    <label for="loc">location:</label>

                    <select id="loc">
                    <option value="chd">Chandigarh</option>
                    <option value="rj">Rajasthan</option>
                    </select>
                    </li>

                    <li>
                        <Link 
                            to='/account/bookmarks' 
                            className='nav-link' 
                        >
                            Bookmarks
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to='/account' 
                            className='nav-link user-link' 
                        >
                            <img src={userDoc?.photoURL} alt={userDoc?.displayName} />
                            <span>{userDoc?.username}</span>
                        </Link>
                    </li>
                </ul>}
            </nav>

            {currentUser && <div className="topics-bar" id='topics-bar'>
                <span className={`topic${location.pathname === '/account/bookmarks' ? ' active' : ''}`} onClick={goToBookmarks}>Bookmarks</span>
                <span className={`topic${location.pathname === '/news' ? ' active' : ''}`} onClick={goToNewsPage}>General</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Business' ? ' active' : ''}`} onClick={() => goToCategoryPage('Business')}>Business</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Entertainment' ? ' active' : ''}`} onClick={() => goToCategoryPage('Entertainment')}>Entertainment</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Health' ? ' active' : ''}`} onClick={() => goToCategoryPage('Health')}>Health</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Science' ? ' active' : ''}`} onClick={() => goToCategoryPage('Science')}>Science</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Sports' ? ' active' : ''}`} onClick={() => goToCategoryPage('Sports')}>Sports</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Technology' ? ' active' : ''}`} onClick={() => goToCategoryPage('Technology')}>Technology</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'quotes' ? ' active' : ''}`} onClick={() => goToCategoryPage('quotes')}>Quotes</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Giphy' ? ' active' : ''}`} onClick={() => goToCategoryPage('Giphy')}>Giphy</span>
                
            </div>}

        </div>
      )}
    </div>
  );
}

export default Navbar;
