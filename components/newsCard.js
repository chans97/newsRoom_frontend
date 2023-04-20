import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

const NewsCard = ({ news, keyword, user_id }) => {
  const [isLoading, setLoading] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [isScraped, setIsScraped] = useState(false);

  async function scrap_news_service() {

    const response = await fetch('http://localhost:8000/api/scrape_news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "keyword": keyword,
          "title": news.title,
          "summary": news.summary,
          "broadcaster": news.broadcaster,
          "created_at": new Date(),
          "url": news.url,
          "user_id": user_id
        }
      )
    });
    const data = await response.json();

    return data;
  }

  async function scrap_news_controller(event) {

    event.preventDefault();
    setLoading(true);
    let result_data = { 'SUCCESS': '', 'DATA': '' };
    try {
      result_data = await scrap_news_service();
    }
    catch {
      result_data.SUCCESS = false;
    }
    if (result_data.SUCCESS) setIsScraped(true);

    setLoading(false);
  }

  return (
    <>
      <div className="newscard">
        <div className="news-wrapper">
          <a target="_blank" href={news.url}><h3 className="title" >{news.title}</h3></a>
          <p className="summary">{news.summary}</p>
          <span className="broadcaster">{news.broadcaster}</span>
          <span className='broadcaster'> | </span>
          <span className="broadcaster">{news.broadcastTime}</span>
        </div>
        {isScraped ||
          <div className="trash-wrapper fa-trash" onClick={scrap_news_controller}>
            <div>
              <FontAwesomeIcon icon={faSave} size="2x" />
            </div>

          </div>
        }
      </div>
      <style jsx>{`
        .newscard {
          display: flex;
          justify-content: space-between;
          width: 95%;
          padding:13px;
        border: 2px solid #5D5FEF;
        border-radius: 5px;
        margin-bottom: 10px;
      }

        .newscard h3 {
          margin-top: 0;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          margin-bottom: 8px;
        }


        .newscard .news-wrapper {
            width:85%
        }

        .newscard .summary {
          color: #424141;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 300;
          font-size: 9px;
          line-height: 11px;
          margin-bottom: 5px;
        }

        .newscard .broadcaster {
          font-size: 10px;
          margin-top: 5px;
          color:  #5D5FEF;
        }

        .newscard .trash-wrapper {
          width: 15%;
          justify-content:end;
          display: flex;
          align-items: center;
      }

        .newscard .fa-trash {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default NewsCard;
