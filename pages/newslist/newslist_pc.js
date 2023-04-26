import React, { useEffect, useState } from 'react';

import NewsCard from '../../components/newsCard'
import Navigation from '../../components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faMinusCircle, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Loading_Spinner from '../../components/loading'
import TogglePeriod from '../../components/toggle_period';

export default function NewsList_pc({
    isNewLoading,
    excelDownload,
    keyword,
    isLoading,
    isError,
    newsData,
    loginContext,
    isRecentlyActive,
    setIsRecentlyActive
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 250);
        return () => clearInterval(interval);
    }, []);

    const [url, setUrl] = useState('');
    const handleClick = (newsUrl) => {
        setUrl(newsUrl);
    };
    const [zoom, setZoom] = useState(false);


    return (
        <>
            <Navigation />
            <div className='main-container'>

                <div className='left-container'>
                    <div className='card-list-title-section'>

                        <h1 className='card-list-title'>news list about {keyword}</h1>
                    </div>


                    {isError && <p>오류가 있습니다. 다시 시작해주세요.</p>}
                    <div className='toggle-period-section'>
                        <span className='toggle-description'>
                            {isRecentlyActive ? "recently" : "accurate"}

                        </span>
                        <TogglePeriod isTodayOnlyActive={isRecentlyActive} setIsTodayOnlyActive={setIsRecentlyActive} />
                    </div>
                    <div className='button-wrapper'>
                        <div className='button-excel-export' onClick={excelDownload}>
                            <FontAwesomeIcon icon={faFileExcel} />
                            <span className='button-word'>
                                Export Excel
                            </span>
                        </div>
                    </div>
                    <div className="sub-container">
                        {isLoading ?
                            <Loading_Spinner /> : <>
                                {newsData?.slice(0, currentIndex).map((news) => (
                                    <NewsCard
                                        key={news.news_id}
                                        news={news}
                                        keyword={keyword}
                                        user_id={loginContext.loggedIn}
                                    />
                                ))}
                            </>
                        }


                        <div className='newLoading-section'>

                            {isNewLoading && <Loading_Spinner></Loading_Spinner>}
                        </div>
                    </div>
                </div>

                <div className='right-container'>
                    {url &&
                        <div className='right-section'>
                            <div className='url-section'>
                                <a target="_blank" href={url}>{url}</a>
                            </div>
                            <div className='zoom-section'>
                                <span className='zoom-span plus' onClick={() => { setZoom(true) }}><FontAwesomeIcon icon={faPlusCircle} /></span>
                                <span className='zoom-span minus' onClick={() => { setZoom(false) }}><FontAwesomeIcon icon={faMinusCircle} /></span>
                            </div>
                            <div className='iframe-section'>
                                {url && <iframe src={url}  ></iframe>}
                            </div>
                        </div>
                    }
                </div>

            </div>



            <style jsx>{`
            .toggle-description{
                font-size: 11px;
                color: #5D5FEF;
                margin-right:5px;
            }
            .toggle-period-section{
                display: flex;
                width: 100%;
                justify-content: end;
                align-items: center;
                margin-right: 20px;


            }
                  .newLoading-section{
                    height: 80px;
                    width: 100%;
                    display: flex;
                    align-items: start; 
                    justify-content: center;
                  }
            .plus{
                transition: all 0.3s;
                cursor:pointer;
                ${zoom && `color: #7e80ff; cursor: auto;`}
            }
            .minus{
                transition: all 0.3s;
                cursor:pointer;
                ${zoom || `color: #7e80ff; cursor: auto;`}
            }
            .zoom-span{
                margin-left:5px;
                font-size: 20px;
            }
            .zoom-section{
                color:white;
                display: flex;
                align-items: center;
                height: 20px;
                width: 95%;
                justify-content: flex-end;
                margin-bottom: 5px; 
            }
            .url-section{
                display:flex;
                justify-content: start;
                align-items: center;
                padding: 15px;
                background: white;
                width:95%;
                height:25px;
                margin:15px 0 5px 0;
            }
            .iframe-section iframe{
                // 2배율로 보는 코드
                width:200%;
                height: 200%;
                -ms-transform: scale(0.5);
                -moz-transform: scale(0.5);
                -o-transform: scale(0.5);
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
                
                -ms-transform-origin: 0 0;
                -moz-transform-origin: 0 0;
                -o-transform-origin: 0 0;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                /* zoom 변수가 true일 때만 스케일 2배 적용 */
                ${zoom && `
                    width: 100%;
                    height: 100%;
                    transform: scale(1);
                `}
            }
            .iframe-section{
                width:95%;
                height: 85%;
                background: white;

            }
            .right-container{
                left: 50vw;
                width:50%;
                height :80vh;
                position:fixed
            }
            .right-section{

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 70px;
                background: #5D5FEF;
                border-radius: 10px;
                width: 95%;
                overflow: hidden;
                height :    80vh;
            }

            .main-container{
                display:flex;

    justify-content: space-between;
                
            }
            .button-wrapper {
                width: 95%;
                display: flex;
                justify-content: end;
            
                margin: 10px;
            }
.button-excel-export {
    width:300px;
    background-color: #5D5FEF;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: flex;
    justify-content: center;   

    align-items: baseline;

    transition: background-color 0.3s ease;
  }
  
  .button-excel-export:hover {
    background-color: #3B3CC4;
  }
  .button-word{
    margin-left:5px;
}

            h1{font-family: 'SongMyung';
            font-size: 20px;
        
            color:#5D5FEF;
        }

      p{
        color:#5D5FEF;
      }
      .left-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
      }
      .card-list-title-section{
        display: flex;
        justify-content: flex-start;
        width: 95%;
        margin: 20px;
      }
      .sub-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .card-list-title{

      }
            `}</style>
        </>
    );
}

