import React from 'react'

import style from './style.scss'

export const SensorData = ({  }) => {
    return (
        <div className={style.container}>
            <div className={style.sensors}>
                <div className={style.sensorsItem}>
                    <div className={style.tempIcon}></div>
                    <div className={style.value}>30°C</div>
                </div>
                <div className={style.sensorsItem}>
                    <div className={style.humIcon}></div>
                    <div className={style.value}>90%</div>
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