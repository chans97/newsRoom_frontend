
import NewsCard from '../../components/newsCard'
import Navigation from '../../components/navbar'
import { v4 as uuidv4 } from 'uuid';
import Loading_Spinner from '../../components/loading'
import TogglePeriod from '../../components/toggle_period';
export default function NewsList_mobile({ isNewLoading,
  keyword,
  isLoading,
  isError,
  newsData,
  loginContext,
  isRecentlyActive,
  setIsRecentlyActive
}) {



  return (
    <>
      <Navigation />
      <div className='main-container'>
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
        <div className="sub-container">
          {isLoading ?
            <Loading_Spinner />
            :
            <>
              {newsData?.map((news) => (
                <NewsCard key={news.news_id} news={news} keyword={keyword} user_id={loginContext.loggedIn} />
              ))}
            </>}
          <div className='newLoading-section'>

            {isNewLoading && <Loading_Spinner></Loading_Spinner>}
          </div>
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
        margin-bottom: 10px;


    }
      .newLoading-section{
        height: 80px;
        width: 100%;
        display: flex;
        align-items: start; 
        justify-content: center;
      }

            h1{font-family: 'SongMyung';
            font-size: 20px;}

      p{
        color:#5D5FEF;
      }
      .main-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .card-list-title-section{
        display: flex;
        justify-content: flex-start;
        width: 95%;
        margin: 20px;
      }
      .card-list-title{
        color:#5D5FEF;
        font-size: 18px;
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

