import { useState } from 'react';

export default function TogglePeriod({ isTodayOnlyActive, setIsTodayOnlyActive }) {


    const handleClick = () => {
        setIsTodayOnlyActive(prevState => !prevState);
    };

    return (
        <div className="rectangle" onClick={handleClick}>
            <div className={`inner-circle ${isTodayOnlyActive ? 'active' : ''}`}></div>
            <style jsx>{`
        .rectangle {    
            display: flex;
            align-items: center;
          width: 50px;
          height: 23px;
          background: ${isTodayOnlyActive ? '#D2D3FB' : '#D9D9D9'};
          border-radius: 93px;
          cursor: pointer;
        }

        .inner-circle {
            position: relative;
          width: 17px;
          height: 18px;
          background: #5D5FEF;
          border-radius: 80px;
          left: ${isTodayOnlyActive ? '5px' : '28px'};

          transition: left 0.2s ease-in-out;
        }
      `}</style>
        </div>
    );
}
