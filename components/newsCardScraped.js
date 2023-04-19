import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const NewsCardScraped = ({ news }) => {
  return (
    <>
      <div className="newscard">
        <div className="news-wrapper">
          <h3 className="title">{news.title}</h3>
          <p className="summary">{news.summary}</p>
          <span className="broadcaster">{news.broadcaster}</span>
          <span className='broadcaster'> | </span>
          <span className="broadcaster">{news.broadcastTime}</span>
        </div>

        <div className="trash-wrapper fa-trash">
          <div>
            <FontAwesomeIcon icon={faTrash} />
          </div>

        </div>
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
