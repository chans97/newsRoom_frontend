import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const NewsCardScraped = ({ news, newsListChange, setNewsListChange, setIsNoNews, setUrl }) => {
  const [isLoading, setLoading] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [isScraped, setIsScraped] = useState(false);
  const [isHidden, setHidden] = useState(true); // 처음에는 newsCard를 안 보이게 함
  useEffect(() => {
    const timer = setTimeout(() => setHidden(false), 10); // 0.2초 뒤에 isHidden을 false로 변경하여 NewsCard를 나타내도록 함
    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 클리어함
  }, []);
  //  문제는 사라진 이후에 처리가 필요하다는 것 keyword가 삭제된 경우 server에서 안내해주고 우리는 그 사인을 보고 다시 room으로 와야 한다.
  // 일단 삭제는 됨
  async function delete_scraped_news_service() {


    let result = {}
    const data = {
      "scraped_news_id": news.id
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/delete/scrape_news`, data, config)
      .then(response => {
        result = response.data;
      })
      // 통일된 형식으로 응답을 만들어 준다.
      .catch(error => {
        result = { 'SUCCESS': false, 'ERROR': error }
      });
    return result;
  }

  async function delete_scraped_news_controller(event) {
    event.preventDefault();
    setLoading(true);
    const result_data = await delete_scraped_news_service();
    setLoading(false);
    if (result_data.SUCCESS) {
      setNewsListChange(newsListChange => !newsListChange);
      setIsNoNews(result_data.DATA.is_no_more_news)
    }

  }
  return (
    <>
      <div className={`newscard ${isHidden ? '' : 'show'}`}>
        <div className="news-wrapper">
          {setUrl ? <h3 className="title" onClick={setUrl}>{news.title}</h3> : <a target="_blank" href={news.url}><h3 className="title" >{news.title}</h3></a>}

          <p className="summary">{news.summary}</p>
          <span className="broadcaster">{news.broadcaster}</span>
          <span className='broadcaster'> | </span>
          <span className="broadcaster">{news.created_at}</span>
        </div>
        {isLoading ?
          <div className="trash-wrapper">
            <div>
              <FontAwesomeIcon icon={faSpinner} spin="true" />
            </div>
          </div> :
          <div className="trash-wrapper fa-trash" onClick={delete_scraped_news_controller}>
            <div>
              <FontAwesomeIcon icon={faTrash} />
            </div>

          </div>
        }
      </div>
      <style jsx>{`
      h3{
        cursor:pointer;
      }
      .newscard {
        opacity: 0; /* 초기에는 숨김 */
        transition: all 0.3s ease-in-out;
        display: flex;
        justify-content: space-between;
        width: 95%;
        padding:13px;
        border: 2px solid #5D5FEF;
        border-radius: 5px;
        margin-bottom: 10px;
        transform: perspective(1000px) rotateX(90deg) rotateY(0deg);
      
    }
    .show{
      opacity: 1;
      transform: perspective(1000px) rotateX(00deg) rotateY(0deg);
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
          font-size: 24px;
      }

        .newscard .fa-trash {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default NewsCardScraped;
