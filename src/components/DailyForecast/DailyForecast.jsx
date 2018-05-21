import React from 'react';
// import './DailyForecast.scss';
import moment from 'moment';

export default function DailyForecast ({ icon, temperature, dayString }) {
    const today = moment().format('dddd');
    let xtraClass = '';

    if (dayString === today) {
        xtraClass = 'active-widget';
    }

    return (
        <div className={`five-days-forecast-widget ${xtraClass}`} data-day={ dayString } >
            <img src={ icon } alt="" className="five-days-icon"/>
            <p className="five-days-temp">{ temperature }</p>
            <p className="five-days-day">{ dayString }</p>
        </div>
    )
}