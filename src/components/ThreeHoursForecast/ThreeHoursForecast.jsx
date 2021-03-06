import React, { Component } from 'react';
import HoursForecast from './../HoursForecast';
import { getThreeHoursForecast } from '../../api';
import moment from 'moment';


export default class ThreeHoursForecast extends Component {
    constructor (props) {
        super(props);
    
        this.state = {
            threeHoursForecast: []
        };
    }

    componentDidMount () {
        const today = moment().format('dddd');
        getThreeHoursForecast(today)
            .then(threeHoursForecast => this.setState({ threeHoursForecast }));
    }

    render () {
        const { threeHoursForecast } = this.state;

        if (threeHoursForecast.length === 0) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        // console.log(threeHoursForecast);

        return (
            <section className="three-hours-forecast">
                {
                    threeHoursForecast.map(day =>
                        <HoursForecast 
                            icon={ day.icon } 
                            temperature={ day.mainTemperature } 
                            hour = { day.hour }
                            windSpeed = { day.windSpeed }
                            humidity = { day.humidity }
                        />
                    )
                }
            </section>    
        );
    }
}