
import { Inter } from 'next/font/google'
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Navigation from '../components/navbar'
import Loading_Spinner from '@/components/loading';



const inter = Inter({ subsets: ['latin'] })

export default function Search_keyword_mobile({ handleSearchChange, searchTerm, loginContext, keywords, anyKeyword, isError, isLoading }) {



  return (
    <>
      <Navigation />
      <div className='main-container'>
        <form className='search-container'>
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

        {isError && <p>에러가 발생했습니다. 새로고침해주세요.</p>}
        {isLoading &&
          <Loading_Spinner />
        }

        {anyKeyword && <>
          <div className='span-margin'>
            or
          </div>

          <h1>Select keyword for news</h1>
        </>
        }

        <div className="button-container">
          {keywords?.map((keyword) => (
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
        font-family: "DonegalOne";
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
