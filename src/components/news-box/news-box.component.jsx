import React, { useContext, useState, useEffect, useRef } from 'react';
import './news-box.style.scss';
import { formatDate } from '../../lib/utils/utils';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';  // Import Twitter icon
import FacebookIcon from '@mui/icons-material/Facebook';  // Import Facebook icon
import WhatsAppIcon from '@mui/icons-material/WhatsApp';  // Import WhatsApp icon
import { UserContext } from '../../context/user-context';
import { addArticleToBookmarks, removeArticleFromBookmarks } from '../../lib/utils/firebase.utils';
import { useNavigate } from 'react-router-dom';

function NewsBox({ item }) {
    const { currentUser, userBookmarks } = useContext(UserContext);
    const [imageError, setImageError] = useState(false);
    const [isShareMenuVisible, setIsShareMenuVisible] = useState(false);
    const shareMenuRef = useRef(null);

    const navigate = useNavigate();

    const handleAddArticleToBookmarks = async () => {
        await addArticleToBookmarks(
            {
                ...item,
                ...(item.content ? { content: item.content.split('[')[0] } : {})
            },
            currentUser?.uid
        );
    };

    const handleRemoveArticleFromBookmarks = async () => {
        await removeArticleFromBookmarks(
            {
                ...item,
                ...(item.content ? { content: item.content.split('[')[0] } : {})
            },
            currentUser?.uid
        );
    };

    const goToArticlePage = () => {
        const title = item.title.replace(/[^a-zA-Z0-9]/g, '');
        navigate(`/article/${title}`);
    };

    const toggleShareMenu = () => {
        setIsShareMenuVisible(!isShareMenuVisible);
    };

    const handleClickOutside = (event) => {
        if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
            setIsShareMenuVisible(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside the share menu
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up the event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="news-box">
            <div className="image-container">
                {!imageError ? (
                    <img
                        src={item?.urlToImage}
                        alt=""
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <img src="" alt="" />
                )}
            </div>

            <div className="news-content">
                <h1>{item.title}</h1>
                <p style={{ fontWeight: 200 }}>{item.description}</p>

                <div className="news-meta">
                    <ul>
                        {item.author && (
                            <li className="author">
                                Curated By: <span>{item.author}</span>
                            </li>
                        )}
                        <li>
                            <span>{item.source.name}</span>
                        </li>
                        <li>
                            Last Updated: <span className="date">{formatDate(item.publishedAt)}</span>
                        </li>
                        <li onClick={goToArticlePage}>Read More</li>
                    </ul>

                    <div className="bookmark-container">
                        {userBookmarks.some(obj => obj.title === item.title) ? (
                            <BookmarkIcon
                                className="marked"
                                onClick={handleRemoveArticleFromBookmarks}
                            />
                        ) : (
                            <BookmarkBorderOutlinedIcon
                                onClick={handleAddArticleToBookmarks}
                            />
                        )}
                    </div>

                    <div className="share-container">
                        <ShareIcon onClick={toggleShareMenu} />
                        {isShareMenuVisible && (
                            <div className="share-menu" ref={shareMenuRef}>
                                <a href={`https://twitter.com/share?url=${item.url}`} target="_blank" rel="noopener noreferrer">
                                    <TwitterIcon className="social-icon" />
                                    Twitter
                                </a>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${item.url}`} target="_blank" rel="noopener noreferrer">
                                    <FacebookIcon className="social-icon" />
                                    Facebook
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${item.title} - ${item.url}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <WhatsAppIcon className="social-icon" />
                                    WhatsApp
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsBox;
