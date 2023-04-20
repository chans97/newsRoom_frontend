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

  const router = useRouter()

  const loginContext = useLoginContext();
  useEffect(() => {
    if (!loginContext.loggedIn) router.push('/login');
  })
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [anyKeyword, setAnyKeyword] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
        <form className='search-container'>

          <div className='search-section'>

            <FontAwesomeIcon icon={faSearch} />
            <input className="input-none" type="text" placeholder="Search keyword for news (ex. 한국투자증권)" value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div className="button-wrapper">
            <Link style={{ textDecoration: 'none' }}
              href={{
                pathname: '/newslist/[keyword]',
                query: { keyword: searchTerm ? searchTerm : "한국투자증권" },
              }}
            >
              <button style={{ width: '100%' }} className="button-search">Search</button>
            </Link>
          </div>
        </form>
        {anyKeyword && <>
          <div className='span-margin'>
            or
          </div>

          <h1>Select keyword for news</h1>
        </>
        }
        <div className="button-container">
          {keywords.map((keyword) => (
            <div key={keyword.id} className="button-wrapper">
              <Link style={{ textDecoration: 'none' }}
                href={{
                  pathname: '/newslist/[keyword]',
                  query: { keyword: keyword.keyword },
                }}
              >
                <div className="button">{keyword.keyword}</div>
              </Link>
            </div>
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
      h1{
        color:#5D5FEF;
      }
      .search-container{
        width:100%
      }
      .search-section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border: 1px solid black;
        border-radius: 5px;
        margin: 10px;
        background-color: white;

      }
      .span-margin{

        margin: 15px;
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
