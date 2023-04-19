import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NewsCardScraped from '../../../components/newsCardScraped'
import Navigation from '../../../components/navbar'

function NewsList() {
    const router = useRouter();
    const { keyword } = router.query;
    console.log(keyword)
    const [newsData, setNewsData] = useState([]);

    // 뉴스 데이터를 받아오는 로직
    useEffect(() => {
        // 뉴스 데이터를 가져오는 비동기 함수를 호출합니다.
        async function fetchData() {
            const res = await fetch('/api/news/' + keyword);
            const data = await res.json();
            setNewsData(data)
        }
        fetchData();
    }, []);



    return (
        <>
            <Navigation />
            <div className='main-container'>
                <div className='caed-list-title-section'>

                    <h1 className='caed-list-title'>news scraped by {keyword}</h1>
                </div>

                <div className="sub-container">
                    {newsData.map((news) => (
                        <NewsCardScraped key={news.id} news={news} />
                    ))}
                </div>
            </div>
            <style jsx>{`
      .main-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .caed-list-title-section{
        display: flex;
        justify-content: flex-start;
        width: 95%;
        margin: 20px;
      }
      .caed-list-title{
        color:#5D5FEF;
        font-size: 18px;
      }
      .sub-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .caed-list-title{

      }
            `}</style>
        </>
    );
}

export default NewsList;
