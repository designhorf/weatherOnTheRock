import moment from 'moment';

const API_KEY = '2562305';
const APP_ID = '5038acf73e9c710a01208c84e49abff0';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_URL = `${ API_BASE_URL }/weather?id=${ API_KEY }&units=metric&APPID=${ APP_ID }`;
const API_URL_FIVE_DAYS = `${ API_BASE_URL }/forecast?id=${ API_KEY }&units=metric&APPID=${ APP_ID }`;

// const FIREBASE_DATABASE_NAME = 'testfbase-4df92';
// const FIREBASE_API_KEY = 'AIzaSyC6hQ7AiUH5C4scA8UPU1yqtYWb_hhXxxM';
// const FIREBASE_AUTH_DOMAIN = `${ FIREBASE_DATABASE_NAME }.firebaseapp.com`;
// const FIREBASE_DATABASE_URL = `https://${ FIREBASE_DATABASE_NAME }.firebaseio.com`;
// const FIREBASE_PROJECT_ID = '';
// const FIREBASE_STORAGE_BUCKET = `${ FIREBASE_DATABASE_NAME }.appspot.com`;
// const FIREBASE_MESSAGING_SENDER_ID = '103034036295';

// (function () {
//     const Firebase_config = {
//         apiKey: FIREBASE_API_KEY,
//         authDomain: FIREBASE_AUTH_DOMAIN,
//         databaseURL: FIREBASE_DATABASE_URL,
//         projectId: FIREBASE_PROJECT_ID,
//         storageBucket: FIREBASE_STORAGE_BUCKET,
//         messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
//     };
    
//     firebase.initializeApp(Firebase_config);

//     let ref = firebase.database().ref('history');

//     ref.on('value', gotData, errorData);

//     function gotData (data) {
//         const temps = data.val();
//         const tempsArray = Object.values(temps);
//         console.log(tempsArray);

//         tempsArray.map(akarmi => {
//             console.log(akarmi);
//         });
//     }

//     function errorData (data) {
//         console.log('Error');
//         console.log(err);
//     }
// })();

export function getFiveDaysForecast () {
    return fetch(API_URL_FIVE_DAYS)
        .then(response => response.json())
        .then(data => data.list)
        .then(dataList => {
            // console.log(dataList);
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
            const currentDate = `${ moment().format('dddd') } - ${ moment().format('DD')} ${ moment().format('MMMM') }`;

            return {
                city: cityName,
                icon: icon,
                temperature: temperature,
                humidity: humidity,
                windSpeed: windSpeed,
                windDirection: windDirection,
                currentDate: currentDate
            }
        });
}
