import React, { Component } from 'react';
import { getCurrentWeather } from '../../api';
import CurrentDetails from '../CurrentDetails';
import './CurrentWeather.scss';

const FIREBASE_DATABASE_NAME = 'testfbase-4df92';
const FIREBASE_API_KEY = 'AIzaSyC6hQ7AiUH5C4scA8UPU1yqtYWb_hhXxxM';
const FIREBASE_AUTH_DOMAIN = `${ FIREBASE_DATABASE_NAME }.firebaseapp.com`;
const FIREBASE_DATABASE_URL = `https://${ FIREBASE_DATABASE_NAME }.firebaseio.com`;
const FIREBASE_PROJECT_ID = '';
const FIREBASE_STORAGE_BUCKET = `${ FIREBASE_DATABASE_NAME }.appspot.com`;
const FIREBASE_MESSAGING_SENDER_ID = '103034036295';

const Firebase_config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(Firebase_config);

let ref = firebase.database().ref('history');

console.log(ref);

export default class CurrentWeather extends Component {
    constructor (props) {
        super(props);
    
        this.state = {
            currentWeather: []
        };
    }

    componentDidMount () {
        getCurrentWeather()
            .then(currentWeather => this.setState({ currentWeather }));
    }

    

    
    render () {
        const { currentWeather } = this.state;
        
        // console.log(currentWeather);

        if (currentWeather.length === 0) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div>
                <h1 className="city">{ currentWeather.city }</h1>
                <p className="date">{ currentWeather.currentDate }</p>

                <section className="main-info">
                    <div className="icon">
                        <img className="img-icon" src={`../../assets/images/icons/${ currentWeather.icon }.svg`} alt=""/>
                        <p className="description">{ currentWeather.icon }</p>
                    </div>
                    <div className="temperature">{ currentWeather.temperature }°</div>
                </section>

                <section className="widget-extra">
                    <CurrentDetails 
                        type = 'humidity'
                        icon = 'Humidity'
                        format = '%'
                        value = { currentWeather.humidity }
                    />

                    <CurrentDetails 
                        type = 'wind-speed'
                        icon = 'Wind-Direction'
                        windDirection = { currentWeather.windDirection }
                        format = 'km/h'
                        value = { currentWeather.windSpeed.toFixed(0) }
                    />

                    <CurrentDetails 
                        type = 'wind-speed'
                        icon = 'Rainy'
                        format = 'km/h'
                        value = { currentWeather.windSpeed.toFixed(0) }
                    />
                </section>
            </div>    
        );
    }
}
