import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/navbar'
import { useLoginContext } from '../context/loginstate';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Index() {

  const [keywords, setKeywords] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [anyKeyword, setAnyKeyword] = useState(false)


  const router = useRouter()

  const loginContext = useLoginContext();
  useEffect(() => {
    if (!loginContext.loggedIn) router.push('/login');
  })

  useEffect(() => {
    // 키워드를 가져오는 비동기 함수를 호출합니다.
    async function fetchData() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/keywordlist?user_id=${loginContext.loggedIn}`);

        if (response.data.SUCCESS) setKeywords(response.data.DATA.keywords)
        else setIsError(true);
      } catch (error) {
        setIsError(true)
        console.error(error);
      }
    }
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (keywords.length) {
      setAnyKeyword(true);
    }
  }, [keywords])

  return (
    <>
      <Navigation />
      <div className='main-container'>


        <h1>Enter your news room</h1>
        {isLoading && <p> 로딩 중입니다...</p>}
        {isError && <p> 오류가 있습니다. 다시 시작해주세요.</p>}
        {anyKeyword || <p> 스크랩한 기사가 없습니다. 다시 검색해주세요.</p>}


        <div className="button-container">
          {keywords.map((keyword) => (
            <div key={keyword.id} className="button-wrapper">
              <Link style={{ textDecoration: 'none' }}
                href={{
                  pathname: '/newslist/scraped/[keyword]',
                  query: { keyword_id: keyword.id, keyword: keyword.keyword },
                }}
              >
                <div className="button">{keyword.keyword}</div>
              </Link>
            </div>
          ))}



        </div>

      </div>

      <style jsx>{`
            p{
              margin-top:25px;
              color:#5D5FEF;
            }
      .main-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      h1{
        color:#5D5FEF;
      }

      .input-none{
        margin-left:10px;
          width: 80%;
          border: none;
          height: 30px;
      }
      .input-none:focus {
        outline: none;
      }
      
        .button-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 10px;
          width:100%;
        }

        .button-wrapper {
          margin: 10px;
        }

        .button {
          background-color: white;
          border: 2px solid #5D5FEF;
          border-radius: 5px;
          color: #5D5FEF;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
        
          transition: background-color 0.3s ease;
        }
        
        .button:hover {
          background-color: #5D5FEF;
          color: white;
        }

        .button-search {
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
          
          transition: background-color 0.3s ease;
        }
        
        .button-search:hover {
          background-color: #3B3CC4;
        }
        

        .link1{
          text-decoration: none;
        }
      `}</style>
    </>
  )
}
