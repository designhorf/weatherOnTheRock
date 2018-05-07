import React from 'react';

export default function CurrentDetails ({ type, icon, value, format, windDirection }) {
    const iconUrl = `./assets/images/icons/${ icon }.svg`;
    const rotationValue = { transform: `rotate(${ windDirection }deg)` };

    return (
        <div className={ `widget-extra-box ${ type }` }>
            <img src={ iconUrl } alt="" className={ `widget-extra-icon ${ type }-icon` } style={ rotationValue } />
            <p className={ `${ type }-value` }>
                { value }{ format }
            </p>
        </div>
    )
}