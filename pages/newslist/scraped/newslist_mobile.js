
import NewsCardScraped from '../../../components/newsCardScraped'
import Navigation from '../../../components/navbar'
import TogglePeriod from '../../../components/toggle_period';
import Loading_Spinner from '../../../components/loading';


function NewsList_mobile({

    keyword,
    isLoading,
    isError,
    renderdNews,
    newsListChange,
    setNewsListChange,
    setIsNoNews,
    isTodayOnlyActive,
    setIsTodayOnlyActive
}) {
    return (
        <>
            <Navigation />
            <div className='main-container'>

                <div className='card-list-title-section'>

                    <h1 className='card-list-title'>news scraped by {keyword} </h1>
                </div>
                {isError && <p>오류가 있습니다. 다시 시작해주세요.</p>}
                <div className='toggle-period-section'>
                    <span className='toggle-description'>
                        {isTodayOnlyActive ? "only today" : "all day"}

                    </span>
                    <TogglePeriod isTodayOnlyActive={isTodayOnlyActive} setIsTodayOnlyActive={setIsTodayOnlyActive} />
                </div>
                <div className="sub-container">

                    {isLoading ? <Loading_Spinner />
                        :
                        <>
                            {renderdNews?.map((news) => (
                                <NewsCardScraped key={news.id} news={news} newsListChange={newsListChange} setNewsListChange={setNewsListChange} setIsNoNews={setIsNoNews} />
                            ))}
                        </>
                    }
                </div>
            </div>
            <style jsx>{`
            h1{
                font-family : 'SongMyung';
                        }
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
                margin-bottom: 10px;
                margin-right: 20px;


            }

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

export default NewsList_mobile;
