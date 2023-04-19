import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLoginContext } from '../context/loginstate';
import Image from 'next/image';
import loginlogo from '../public/mainlogo.png'

import Link from 'next/link';

export default function Login({ fail }) {
    const router = useRouter();
    const loginContext = useLoginContext();
    const [isLoading, setLoading] = useState(false);

    const [ID, setID] = useState("");
    useEffect(() => {
        if (loginContext.loggedIn) router.push('/');
    }, [loginContext.loggedIn, router]);

    async function sendLoginID(id) {
        setLoading(true);
        const data = await (await fetch(`api/login`)).json();
        setLoading(false);
        return data.SUCCESS;
    }

    async function onSubmit(event) {
        event.preventDefault();
        const loginSuccess = await sendLoginID(ID);
        if (loginSuccess) {
            loginContext.setLoggedIn(true);
            router.push('/');
        } else {
            router.push('/login');
        }
    }

    const handleSearchChange = (event) => {
        setID(event.target.value);
    };

    return (
        <>
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

                                Login</button>
                        </div>
                    </div>


                </form>
                {isLoading && <p>로그인 중입니다...</p>}
            </div>

            <style jsx>{`
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

// 이 함수는 이름에서 알 수 있듯이 정확히 작동합니다. 서버에서 데이터를 보내고 페이지 구성 요소의 소품에 주입할 수 있습니다.
// 이 기능의 장점은 React 클라이언트가 지연 없이 즉시 데이터를 표시할 수 있고 로딩 또는 오류 상태를 처리할 필요가 없다는 것입니다.

export function getServerSideProps() {
    return {
        props: { fail: true },
    };
}
