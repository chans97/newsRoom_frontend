import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';


import Loading_Spinner from '../components/loading'
import loginlogo from '../public/mainlogo.png'
import { useLoginContext } from "@/context/loginstate";

import axios from 'axios';

import Lottie from "react-lottie-player";
import loginlottie from "../public/loginlottie.json";

export default function Login({ fail }) {
  const router = useRouter();
  const loginContext = useLoginContext();
  const [isLoading, setLoading] = useState(false);
  const [loginFail, setLoginFail] = useState(false);
  const [ID, setID] = useState("");



  const [downloaded, setDownloaded] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);


  // let deferredPrompt = null;

  useEffect(() => {
    console.log("Listening for Install prompt");
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      setDeferredPrompt(event);
      // deferredPrompt = event;
      if (!event) {
        alert('이미 앱이 설치되어 있거나 앱을 설치할 수 없는 환경입니다')
      }
      else {
        setDownloaded(false)
      }
    })
  }, []);


  const installApp = () => {
    if (!deferredPrompt) {
      alert('이미 앱이 설치되어 있거나 앱을 설치할 수 없는 환경입니다')
      return
    }

    deferredPrompt.prompt()
  };






  async function loginWithCompanyID(id) {
    let result = {}
    const data = {
      company_id: id
    }

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, data, config)
      .then(response => {
        result = response.data;
      })
      // 통일된 형식으로 응답을 만들어 준다.
      .catch(error => {
        result = { 'SUCCESS': false, 'ERROR': error }
      });


    return result
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let loginData = await loginWithCompanyID(ID);
    // console.log(loginData)
    setLoading(false);
    if (loginData.SUCCESS) {
      loginContext.setLoggedIn(loginData.DATA.newsroom_user.user_id);
      router.push('/');
    } else {
      setLoginFail(true)
    }
  }

  const handleSearchChange = (event) => {
    setID(event.target.value);
  };

  return (
    <>
      <div className={downloaded ? "download-button display-none" : "download-button"} onClick={installApp}>
        <span>언제나 newsroom을 사용하고 싶다면, </span>
        <span className="underline-white">다운로드</span>
      </div>


      <div className="desktop-container">

        <div className="desktop-section">
          <div className="description-section">
            <span className="description-title">
              news scrape flatform : <br></br>newsRoom(Beta)
            </span>
            <span className="description">If you&apos;re looking to gather news stories that interest you,
              look no further than our news scraping platform!</span>

            <span className="description">With our platform, you can easily collect and
              organize news articles without the hassle of complex searches.</span>

            <span className="description">You can explore news based on topics or keywords that interest you,
              and easily share or save your findings.</span>

            <span className="description">Don&apos;t wait to experience the benefits of our news scraping platform.
              Start your newscraping journey today!</span>
          </div>
          <div className="lottie-section">

            <Lottie loop animationData={loginlottie} play />
          </div>
        </div>
        <div className="mobile-section">

          <div className="main-container">
            <div className="logo-section">

              <Image src={loginlogo} alt="Login Logo" width={300} />
            </div>
            <form onSubmit={onSubmit} style={{ width: '100%' }}>
              <div className='search-container'>

                <div className='search-section'>

                  <input className="input-none" type="text" placeholder=" 사번(ex. 123123)" value={ID} onChange={handleSearchChange} />
                </div>


                <div className="button-wrapper">

                  <button className="button-search">
                    {isLoading ?
                      <Loading_Spinner />
                      :
                      <span>

                        Login
                      </span>
                    }
                  </button>
                </div>
              </div>


            </form>

            {loginFail && <p>로그인이 실패했습니다. 다시 시도해주세요.</p>}

          </div>

        </div>
      </div>
      <style jsx>{`
      @media screen and (min-width: 900px){
        .desktop-container{

    height: 100vh;
          background-color: #5D5FEF;
          // min-height: 100vh;
          width:100%;
          display: flex;
          justify-content: end;
          align-items: center;
        }
        .desktop-section{
          width:50%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .mobile-section{
          width: 50%;
          display: flex;
          justify-content: center;
        }
        .main-container{
          width: 553px;
          height: 800px;
          padding: 100px;

          background: #FFFFFF;
          border-radius: 82px;
        }
        .description-section{
          display:flex;
          flex-direction: column;
          
        }
        .description-title{
          color: white;
          font-size: 30px;
          margin: 60px;
          margin-top:80px;
          font-size: 60px;
      
        }
        .description{
          color: white;
          margin: 10px 70px;
        }
        .lottie-section{
          width: 65%;

        }
      }
      @media screen and (max-width: 900px){

        .desktop-section{
          display: none;
        }
      }

            .logo-section{
                width: 100%;
                height: 400px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

      .main-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }   
      p{
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
        .input-none{
          margin-left:10px;
            width: 95%;
            border: none;
            height: 30px;
        }
        .input-none:focus {
          outline: none;
        }
        .button-wrapper {
          margin: 10px;
        }
        .underline-white{

          text-decoration: underline;
        }
        .download-button{
          background-color: #3537bd;
          border: none;
          color: #fff;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          
          transition: background-color 0.3s ease;
          width:100%;
        }
        .display-none{
          display: none;
        }
        .download-button:hover {
          background-color: #1619b0;
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
          width:100%;
        }
        
        .button-search:hover {
          background-color: #3B3CC4;
        }
      `}</style>
    </>
  );
}