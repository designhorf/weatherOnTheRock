import React, { Component } from 'react';
import DailyForecast from './../DailyForecast';
import { getFiveDaysForecast } from '../../api';

export default class FiveDaysForecast extends Component {
    constructor (props) {
        super(props);
    
        this.state = {
            fiveDaysForecast: []
        };
    }

    componentDidMount () {
        getFiveDaysForecast()
            .then(fiveDaysForecast => this.setState({ fiveDaysForecast }));
    }

    render () {
        const { fiveDaysForecast } = this.state;

        if (fiveDaysForecast.length === 0) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <section className="five-days-forecast">
                {
                    fiveDaysForecast.map(day =>
                        <DailyForecast 
                            icon = { day.icon } 
                            temperature = { day.mainTemperature } 
                            dayString = { day.dayAsString }
                        />
                    )
                }
            </section>    
        );
    }
}