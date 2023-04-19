import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <nav>
      <div className="navigation-wrapper">
        <div className="navigation-item">
          <Link style={{
            fontSize: "25px",
            color: "#000000"
          }} href="/">
            <FontAwesomeIcon icon={faSearch} style={{ transform: 'scaleX(-1)' }} />
          </Link>
        </div>
        <div className="navigation-item">
          <div className="logo-wrapper">
            <Image width={100} src={logo} alt=" News Room" placeholder="blur" />
          </div>
        </div>
        <div className="navigation-item">
          <Link style={{
            fontSize: "25px",
            color: "#000000"
          }} href="/customKeywordList">
            <FontAwesomeIcon icon={faCartPlus} />
          </Link>
        </div>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          height:90px;
        }

        .navigation-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .navigation-item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #5D5FEF;
        }

        .logo-wrapper {
            display: flex;
            justify-content: center;
          width: 200px;
          height: 100%;
        }

        ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li:not(:last-child) {
          margin-right: 20px;
        }

        a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
        }
      `}</style>
    </nav>
  )
}

export default Navigation
