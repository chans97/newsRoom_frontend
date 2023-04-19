import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NewsCard from '../../components/newsCard'
import Navigation from '../../components/navbar'
import axios from 'axios';

function NewsList() {
    const router = useRouter();
    const { keyword } = router.query;
    const [newsData, setNewsData] = useState([]);

    // 뉴스 데이터를 받아오는 로직
    useEffect(() => {
        // 뉴스 데이터를 가져오는 비동기 함수를 호출합니다.
        async function fetchData() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/news/${keyword}`);
                console.log(`http://127.0.0.1:8000/api/news/${keyword}`)
                setNewsData(response.data.result);
            } catch (error) {
                console.error(error);
            }
        }
        if (keyword) {
            fetchData();
        }
    }, [keyword]);



    return (
        <>
            <Navigation />
            <div className='main-container'>
                <div className='caed-list-title-section'>

                    <h1 className='caed-list-title'>news list about {keyword}</h1>
                </div>

                <div className="sub-container">
                    {newsData.map((news) => (
                        <NewsCard key={news.id} news={news} />
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
