import React from 'react'

import style from './style.css'
import { SensorData, Content, Console } from './components'

export class SberDom extends React.Component {
    render() {
        // if (true) {
        //     return (
        //         <div className={style.prev} />
        //     )
        // }
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.title}>Сбербанк Умный дом</div>
                    <div className={style.close} />
                </div>
                <div className={style.sensorData}>
                    <SensorData />
                </div>
                <div className={style.content}>
                    <Content />
                </div>
                <div className={style.console}>
                    <Console />
                </div>
            </div>
        )
    }
}

