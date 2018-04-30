import React from 'react';
// import './DailyForecast.scss';

export default function DailyForecast ({ icon, temperature, dayString }) {
    return (
        <div className="five-days-forecast-widget" >
            <img src={ icon } alt="" className="five-days-icon"/>
            <p className="five-days-temp">{ temperature }</p>
            <p className="five-days-day">{ dayString }</p>
        </div>
    )
}