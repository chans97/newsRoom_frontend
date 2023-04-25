
import { Inter } from 'next/font/google'
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Navigation from '../components/navbar'
import Loading_Spinner from '@/components/loading';



const inter = Inter({ subsets: ['latin'] })

export default function Search_keyword_pc({ handleSearchChange, searchTerm, loginContext, keywords, anyKeyword, isError, isLoading }) {

  return (
    <>
      {loginContext?.loggedIn && <>
        <Navigation />
        <div className='main-container'>
          <div className='search-box'>

            <form className='button-container'>

              <h1>Select keyword for news</h1>
              <div className='search-section'>
                <FontAwesomeIcon icon={faSearch} />
                <input className="input-none" type="text" placeholder="Search keyword for news (ex. 한국투자증권)"
                  value={searchTerm} onChange={handleSearchChange} />
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

          </div>
          {isError && <p>에러가 발생했습니다. 새로고침해주세요.</p>}


          <div className='or-box'>

            <div className='or-span'>
              or
            </div>

          </div>
          <div className='select-box'>

            <div className="button-container">
              <h1>Select keyword for news</h1>
              {anyKeyword || <span>현재 스크랩된 키워드가 없습니다.</span>}
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
              {isLoading &&
                <Loading_Spinner />
              }
            </div>
          </div>
        </div>
      </>}
      <style jsx>{`
            span{
                color : #5D5FEF;
                margin: 0 auto;
            }
            h1{

                color:#5D5FEF;
                font-family: "DonegalOne";
                font-size: 25px;
                margin: 30px auto;
            }
            .search-box{
                width: 47%;
            }
            .or-box{
                width: 6%;
                display: flex;
                height: 15vh;
                align-items:center;
                 justify-content: center;
                 margin: 25px;


            }
            .select-box{
                width: 47%;

            }
      .main-container{
        display: flex;
        justify-content: center;    
        align-items: flex-start;

        width: 70%;
        margin: auto;


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
      .or-span{

        font-family: "DonegalOne";
        font-size:18px; 
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
