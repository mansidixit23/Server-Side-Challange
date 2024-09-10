import React, { useContext, useState } from 'react';
import './news-box-account-page.style.scss';
import { formatDate } from '../../lib/utils/utils';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { UserContext } from '../../context/user-context';
import { addArticleToBookmarks, removeArticleFromBookmarks } from '../../lib/utils/firebase.utils';
import { useNavigate } from 'react-router-dom';

function NewsBoxAccountPage({ item }) {
    const { currentUser, userBookmarks } = useContext(UserContext);

    const [imageError, setImageError] = useState(false);

    const navigate = useNavigate();

    const handleAddArticleToBookmarks = async () => {
        await addArticleToBookmarks(
            {
                ...item,
                ...(item.content ? { content: item.content.split('[')[0] } : {})
            },
            currentUser?.uid
        );
    }

    const handleRemoveArticleFromBookmarks = async () => {
        await removeArticleFromBookmarks(
            {
                ...item,
                ...(item.content ? { content: item.content.split('[')[0] } : {})
            },
            currentUser?.uid
        )
    }

    const goToArticlePage = () => {
        const title = item.title.split('?').join('').split('%').join('');
        navigate(`/article/${title}`);
    }

    return (
        <div className='news-box-account-page'>
            <div className='image-container'>
                {
                    !imageError ? 
                    <img 
                        src={item?.urlToImage} 
                        alt="" 
                        onError={() => setImageError(true)}  
                    /> : 
                    <img 
                        src="https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_576/s3/2/50552/image%20not%20available(34).jpg" 
                        alt="" 
                    />
                }
            </div>

            <div className="news-content">
                <h1>{item.title}</h1>
                
                <div className="news-meta">
                    <ul>
                        {item.author && <li className='author'>Curated By: <span>{item.author}</span></li>}
                        <li className='last-update'>Last Updated: <span className='date'>{formatDate(item.publishedAt)}</span></li>
                        <li onClick={goToArticlePage}>Read More</li>
                    </ul>

                    <div className="bookmark-container">
                        {userBookmarks.some(obj => obj.title === item.title) ? 
                            <BookmarkIcon 
                                className='marked'
                                onClick={handleRemoveArticleFromBookmarks} 
                            /> : 
                            <BookmarkBorderOutlinedIcon 
                                onClick={handleAddArticleToBookmarks} 
                            />
                        }
                    </div>
                </div>
            </div>

            <div className="bookmark-container">
                {userBookmarks.some(obj => obj.title === item.title) ? 
                    <BookmarkIcon 
                        className='marked'
                        onClick={handleRemoveArticleFromBookmarks} 
                    /> : 
                    <BookmarkBorderOutlinedIcon 
                        onClick={handleAddArticleToBookmarks} 
                    />
                }
            </div>
        </div>
    )
}

export default NewsBoxAccountPage;
