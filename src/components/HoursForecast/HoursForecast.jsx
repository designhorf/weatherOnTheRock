import React from 'react';
import './HoursForecast.scss';

export default function HoursForecast ({ icon, temperature, hour, windSpeed, humidity }) {
    return (
        <div className="three-hours-forecast-widget" data-hour={ hour } >
            <img src={ icon } alt="" className="three-hours-icon"/>
            <div className="three-hours-info-box">
                <p className="three-hours-temp three-hours-paragraph">{ temperature }°</p>
                <p className="three-hours-small-text">{ hour }:00</p>
            </div>
            <div className="three-hours-info-box">
                <p className="three-hours-windspeed three-hours-paragraph">{ windSpeed }km/h</p>
                <p className="three-hours-small-text">wind</p>
            </div>
            <div className="three-hours-info-box">
                <p className="three-hours-humidity three-hours-paragraph">{ humidity }%</p>
                <p className="three-hours-small-text">humidity</p>
            </div>
        </div>
    )
}