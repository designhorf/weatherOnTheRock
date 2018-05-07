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

                    
                    {/* <div className="widget-extra-box wind-speed">
                        <img src="./assets/images/icons/Rainy.svg" alt="" className="widget-extra-icon wind-speed-icon"/>
                        <p className="wind-speed-value"></p>
                    </div> */}
                 </section>
            </div>    
        );
    }
}


// export default function CurrentWeather ({ city, date }) {
//     return (
//         <div>
//             <h1 className="city">{ city }</h1>
//             <p className="date">{ date }</p>

//             <section className="main-info">
//                 <div className="icon">
//                     <img className="img-icon" src="" alt=""/>
//                     <p className="description"></p>
//                 </div>
//                 <div className="temperature"></div>
//             </section>

//             <section className="widget-extra">
//                 <div className="widget-extra-box humidity">
//                     <img src="./assets/images/icons/Humidity.svg" alt="" className="widget-extra-icon humidity-icon"/>
//                     <p className="humidity-value"></p>
//                 </div>

//                 <div className="widget-extra-box wind-direction">
//                     <img src="./assets/images/icons/Wind-Direction.svg" alt="" className="widget-extra-icon wind-direction-icon"/>
//                     <p className="wind-direction-value"></p>
//                 </div>

//                 <div className="widget-extra-box wind-speed">
//                     <img src="./assets/images/icons/Rainy.svg" alt="" className="widget-extra-icon wind-speed-icon"/>
//                     <p className="wind-speed-value"></p>
//                 </div>
//             </section>
//         </div>
//     )
// }