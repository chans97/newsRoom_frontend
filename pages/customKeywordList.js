import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/navbar'
import { useLoginContext } from '../context/loginstate';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const inter = Inter({ subsets: ['latin'] })

export default function Index() {

    const router = useRouter()

    const loginContext = useLoginContext();
    useEffect(() => {
        if (!loginContext.loggedIn) router.push('/login');
    })

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Navigation />
            <div className='main-container'>


                <h1>Enter your news room</h1>
                <div className="button-container">
                    <div className="button-wrapper">
                        <Link style={{ textDecoration: 'none' }}
                            href={{
                                pathname: '/newslist/scraped/[keyword]',
                                query: { keyword: 'naver' },
                            }}
                        >
                            <div className="button">naver</div>
                        </Link>
                    </div>
                    <div className="button-wrapper">
                        <Link style={{ textDecoration: 'none' }}
                            href={{
                                pathname: '/newslist/scraped/[keyword]',
                                query: { keyword: 'kakao' },
                            }}
                        >
                            <div className="button">kakao</div>
                        </Link>
                    </div>
                    <div className="button-wrapper">
                        <Link style={{ textDecoration: 'none' }}
                            href={{
                                pathname: '/newslist/scraped/[keyword]',
                                query: { keyword: 'apple' },
                            }}
                        >
                            <div className="button">apple</div>
                        </Link>
                    </div>
                    <div className="button-wrapper">
                        <Link style={{ textDecoration: 'none' }}
                            href={{
                                pathname: '/newslist/scraped/[keyword]',
                                query: { keyword: 'google' },
                            }}
                        >
                            <div className="button">google</div>
                        </Link>
                    </div>
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
