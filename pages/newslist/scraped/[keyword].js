import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NewsCardScraped from '../../../components/newsCardScraped'
import Navigation from '../../../components/navbar'

import { useLoginContext } from '../../../context/loginstate';
import axios from 'axios';


function NewsList() {
    const router = useRouter();
    const { keyword_id, keyword } = router.query;
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const loginContext = useLoginContext();
    useEffect(() => {
        if (!loginContext.loggedIn) router.push('/login');
    })
    // 뉴스 데이터를 받아오는 로직
    useEffect(() => {
        // 키워드를 가져오는 비동기 함수를 호출합니다.
        async function fetchData() {
            try {
                console.log(keyword_id);
                const response = await axios.get(`http://127.0.0.1:8000/api/scraped_news?keyword_id=${keyword_id}`);
                if (response.data.SUCCESS) setNewsData(response.data.DATA.scraped_news)
                // else setIsError(true);
            } catch (error) {
                setIsError(true)
                console.error(error);
            }
        }
        fetchData();
        setLoading(false);
    }, []);



    return (
        <>
            <Navigation />
            <div className='main-container'>
                <div className='caed-list-title-section'>

                    <h1 className='caed-list-title'>news scraped by {keyword} </h1>
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
