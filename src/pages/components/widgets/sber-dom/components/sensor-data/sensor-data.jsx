import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

import style from './style.css'

const mapStateToProps = (state) => {
    //TODO перенести в селекторы
    const temperature = _.get(state, ['sensors', 'sensor_data', 'temperature'], {})
    const humidity = _.get(state, ['sensors', 'sensor_data', 'humidity'], {})

    return {
        temperature: temperature.value,
        humidity: humidity.value,
    }
}

export const SensorData =connect(mapStateToProps, null)(
    ({temperature, humidity }) => {

    return (
        <div className={style.container}>
            <div className={style.sensors}>
                <div className={style.sensorsItem}>
                    <div className={style.tempIcon}></div>
                    <div className={style.sensorsValue}>{temperature ? `${temperature}°C` : null}</div>
                </div>
                <div className={style.sensorsItem}>
                    <div className={style.humIcon}></div>
                    <div className={style.sensorsValue}>{humidity ? `${humidity}%`: null}</div>
                </div>
            </div>
            <div className={style.actions}>
                <label className={style.action}>
                    <input className={style.actionInput} type="radio" name="segmented" value="1" />
                    <span className={style.actionValue}>Весь дом</span>
                </label>
                <label className={style.action}>
                    <input className={style.actionInput} type="radio" name="segmented" value="2" />
                    <span className={style.actionValue}>Детская</span>
                </label>
                <label className={style.action}>
                    <input className={style.actionInput} type="radio" name="segmented" value="3" />
                    <span className={style.actionValue}>Спальня</span>
                </label>
            </div>
        </div>
    )
}
)
