import React from 'react'

import style from './style.css'
import {Console, Content, SensorData} from '../../../index'

const response = {
    "cash": "200 ₽",
    "id": "9a3aa811-9e68-4d2a-a2c1-2c75f8d9d56b",
    "info": "Холодильник был открыт во время запрета, откладываем на тренировки",
    "name": "Ограничение ночного холодильника"
}

export const Notification = ({  }) => {
    return (
        <div className={style.container}>
            <div className={style.info}>{response.info}</div>
            <div className={style.boxState}>
                <div className={style.name}>{response.name}</div>
                <div>{" - "}</div>
                <div className={style.info}>{response.cash}</div>
            </div>
            <button className={style.action}>Закрыть</button>
        </div>
    )
}
