import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { useLoginContext } from '../context/loginstate';
import Navigation from '../components/navbar'
import checkLoginedandRouteLogin from '../services/checkLogined'

import Loading_Spinner from '@/components/loading';

const inter = Inter({ subsets: ['latin'] })

export default function Index() {

  const [keywords, setKeywords] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [anyKeyword, setAnyKeyword] = useState(false)

  const loginContext = useLoginContext();

  checkLoginedandRouteLogin();

  useEffect(() => {
    // 키워드를 가져오는 비동기 함수를 호출합니다.
    async function fetchData() {
      setLoading(true);
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/keywordlist?user_id=${loginContext.loggedIn}`)
        .then(response => {
          if (response.data.SUCCESS) setKeywords(response.data.DATA.keywords)
          else setIsError(true);
        })
        .catch(error => {
          setIsError(true)
          console.error(error);
        })
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (keywords.length) {
      setAnyKeyword(true);
    }
  }, [keywords])

  return (
    <>
      <Navigation />


      <div className="desktop-container">
        <div className='desktop-section'>

          <div className='title-section'>
            You can view all the news articles<br />
            I&apos;ve collected so far right here.

          </div>
          <div className='contents-section'>
            <span>If you&apos;re interested in seeing the news stories</span><br />
            <span>I&apos;ve been keeping track of, you&apos;re in luck!</span><br />
            <span>You can easily access a comprehensive list of all the articles</span><br />
            <span>I&apos;ve saved right here on this page</span>

          </div>

        </div>



        <div className='main-container'>


          <h1>Enter your news room</h1>
          {isLoading ?
            <Loading_Spinner /> : anyKeyword || <><p> 스크랩한 기사가 없습니다. </p>
              <Link
                href={{
                  pathname: '/'
                }}
              ><p>  &quot;여기&quot;를 눌러 기사를 스크랩해주세요.</p></Link></>}
          {isError && <p> 오류가 있습니다. 다시 시작해주세요.</p>}


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

        </div >
      </div >
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
        font-family: 'DonegalOne';
        font-size: 20px;
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
        @media screen and (max-width: 900px){

          .desktop-section{
            display: none;
          }
        }
        @media screen and (min-width: 900px){
          .desktop-container{
  
                  width:100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
  
                .main-container{
                  width: 50%;
                }
                h1{
                  margin: 80px 0 40px 0;
                  font-size: 30px;
                }
                .button-container{
                  width:80%;
                }
                .desktop-section{
                  width:50%;
                  margin-left: 100px;
                }
                .title-section{
                  font-family: 'Donegal One';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 36px;
                  margin: 20vh 0 60px 0;
                }
                .contents-section{
                  font-family: 'Donegal One';
font-style: normal;
font-weight: 400;
font-size: 24px;
                }
        }
      `}</style>
    </>
  )
}
