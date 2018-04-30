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

export function getCurrentWeather () {
    return fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const cityName = data.name;
            const icon = data.weather[0].main;
            const windSpeed = data.wind.speed;
            const windDirection = data.wind.deg;
            const humidity = data.main.humidity;
            const temperature = data.main.temp;

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

    


    // let displayWind = function (data) {
    //     const windDirectionIcon = document.getElementById('windDirectionIcon')          
    //     const windSpeedElement = document.getElementById('windDirectionValue')          // Wind Speed
    //     const wind = data.wind
    //     const windSpeed = wind.speed*3.6

    //     windDirectionIcon.style.transform = `rotate(${wind.deg}deg)`
    //     windSpeedElement.innerHTML = `${windSpeed.toFixed(2)} km/h`
    // };

    // let displayTemperature = function (data) {
    //     const temp = data.main;
    //     const temperature = document.getElementById('temp');
    //     temperature.innerHTML = `${temp.temp}°`;
    // };

    // fetch(`${API_URL}`)
    //     .then(function (response) { 
    //         return response.json(); 
    //     })
    //     .then(function (data) {
    //         console.log(data)

    //         const date = document.getElementById('date')
    //         date.innerHTML = `${moment().format('dddd')} - ${moment().format('DD MMMM')}`   // Date

    //         // apiData.push({'name': data.name})
    //         // console.log(apiData)

    //         // City
    //         // console.log(data.name)
    //         const city = document.getElementById('city');
    //         city.innerHTML = data.name;                                                     // City Name

    //         // Humidity + Temperature
    //         const temp = data.main
    //         // console.log(temp.temp)
    //         // console.log(`${temp.humidity}%`)
    //         const humidity = document.getElementById('humidityValue')
    //         humidity.innerHTML = `${temp.humidity}%`                                        // Humidity

    //         // Temperature
    //         displayTemperature(data);

    //         // Weather Icon + description            
    //         // Weather type
    //         const weather = data.weather[0]
    //         const desc = document.getElementById('description')
    //         desc.innerHTML = weather.main                                                   // Cloudy, etc.
    //         // console.log(weather.main)

    //         // Icon
    //         const imgIcon = document.getElementById('imgIcon');
    //         imgIcon.setAttribute('src', `./assets/images/icons/${weather.main}.svg`);       // Icon
    //         if (weather.description == 'few clouds') {
    //             const icon = document.getElementById('icon');
    //             // icon.setAttribute('src', './assets/images/icons/fewclouds.svg');
    //         }

    //         displayWind(data)

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