import React, { Component } from 'react';
import { getCurrentWeather } from '../../api';
import CurrentDetails from '../CurrentDetails';
import './CurrentWeather.scss';

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
