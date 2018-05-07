import moment from 'moment';

const API_KEY = '2562305';
const APP_ID = '5038acf73e9c710a01208c84e49abff0';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_URL = `${ API_BASE_URL }/weather?id=${ API_KEY }&units=metric&APPID=${ APP_ID }`;
const API_URL_FIVE_DAYS = `${ API_BASE_URL }/forecast?id=${ API_KEY }&units=metric&APPID=${ APP_ID }`;

export function getFiveDaysForecast () {
    return fetch(API_URL_FIVE_DAYS)
        .then(response => response.json())
        .then(data => data.list)
        .then(dataList => {
            console.log(dataList);
            return dataList.filter(day => Number(moment.unix(day.dt).format('kk')) === 14);
        })
        .then(days => {
            return days.map(day => {
                const timestamp = day.dt;
                const weatherType = day.weather[0].main;
                const mainTemperature = day.main.temp.toFixed(0);
                const dayAsString = moment.unix(day.dt).format('dddd');

                return {
                    icon: `./assets/images/icons/${ weatherType }.svg`,
                    mainTemperature,
                    dayAsString,
                    timestamp
                }
            });
        });
}

export function getThreeHoursForecast (activeDay) {
    return fetch(API_URL_FIVE_DAYS)
        .then(response => response.json())
        .then(data => data.list)
        .then(dataList => {
            return dataList.filter(day => moment.unix(day.dt).format('dddd') === activeDay);
        })
        .then(days => {
            return days.map(day => {
                const weatherType = day.weather[0].main;
                const mainTemperature = day.main.temp.toFixed(0);
                const hour = Number(moment.unix(day.dt).format('HH')) + 1;
                const windSpeed = (day.wind.speed * 3.6).toFixed(0);
                const humidity = day.main.humidity;
                const dayAsString = moment.unix(day.dt).format('dddd');
                const timestamp = day.dt;

                return {
                    icon: `./assets/images/icons/${ weatherType }.svg`,
                    mainTemperature,
                    hour,
                    windSpeed,
                    humidity,
                    dayAsString,
                    timestamp
                }
            });
        });
}

export function getCurrentWeather () {
    return fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name;
            const icon = data.weather[0].main;
            // converted m/s to km/h
            const windSpeed = data.wind.speed * 3.6;
            const windDirection = data.wind.deg;
            const humidity = data.main.humidity;
            const temperature = data.main.temp.toFixed(0);

            return {
                city: cityName,
                icon: icon,
                temperature: temperature,
                humidity: humidity,
                windSpeed: windSpeed,
                windDirection: windDirection
            }
        });
}


    // fetch(`${API_URL}`)
    //     .then(function (response) { 
    //         return response.json(); 
    //     })
    //     .then(function (data) {
    //         // Sunrise - Sunset
    //         let timee = data.sys
    //         let sunrise = Number(timee.sunrise)
    //         let sunset = Number(timee.sunset)
            
    //         function convertTimeStamp (number) {
    //             let date = new Date(number * 1000),
    //                 hours = date.getHours(),
    //                 minutes = `0  ${date.getMinutes()}`,
    //                 formattedTime = `${hours}:${minutes.substr(-2)}`;

    //             // console.log(formattedTime)

    //             return formattedTime
    //         }

    //         convertTimeStamp(sunrise)
    //         convertTimeStamp(sunset)
    //     });