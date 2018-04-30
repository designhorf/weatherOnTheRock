import React from 'react';
import './Weather.scss';
import FiveDaysForecast from './../FiveDaysForecast';
import CurrentWeather from './../CurrentWeather';

export default function Weather () {
    return (
        [
            <CurrentWeather />,
            <FiveDaysForecast />
        ]
    )
}