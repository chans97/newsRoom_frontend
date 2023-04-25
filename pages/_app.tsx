// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { LoginWrapper } from '../context/loginstate';
import '../public/reset.css'
import '../public/font.css'

function App({ Component, pageProps }: AppProps) {


  return (
    <LoginWrapper>
      <Component {...pageProps} />
    </LoginWrapper>
  )
}


export default App;