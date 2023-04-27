// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { LoginWrapper } from '../context/loginstate';
import '../public/reset.css'
import '../public/font.css'
import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope,
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          },
        );
      });
    }
  }, []);

  return (
    <LoginWrapper>
      <Component {...pageProps} />
    </LoginWrapper>
  )
}


export default App;