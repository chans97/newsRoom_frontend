import { useEffect, useState } from 'react';

import { Inter } from 'next/font/google'

import axios from 'axios';

import checkLoginedandRouteLogin from '../services/checkLogined'
import { useLoginContext } from '@/context/loginstate';

import { useMediaQuery } from "react-responsive"
import Search_keyword_mobile from './search_keyword_mobile'
import Search_keyword_pc from './search_keyword_pc'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {

  const isPc = useMediaQuery({
    query: "(min-width:900px)"
  });
  checkLoginedandRouteLogin()

  const loginContext = useLoginContext();
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [anyKeyword, setAnyKeyword] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");


  // user의 scrapped keywords 받아오기 
  useEffect(() => {
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
        });
      setLoading(false);
    }

    fetchData();
  }, []);

  // 키워드가 존재하는지 확인
  useEffect(() => {
    if (keywords.length) {
      setAnyKeyword(true);
    }
  }, [keywords])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {loginContext.loggedIn && <>
        {isPc ? <Search_keyword_pc loginContext={loginContext}
          keywords={keywords}
          anyKeyword={anyKeyword}
          isError={isError}
          isLoading={isLoading}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        ></Search_keyword_pc > : <Search_keyword_mobile
          loginContext={loginContext}
          keywords={keywords}
          anyKeyword={anyKeyword}
          isError={isError}
          isLoading={isLoading}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        ></Search_keyword_mobile>
        }</>}
    </>
  )
}
