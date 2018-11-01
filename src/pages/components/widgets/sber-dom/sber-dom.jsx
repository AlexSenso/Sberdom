import React from 'react'

import style from './style.scss'
import { SensorData, Content, Console } from './components'

export class SberDom extends React.Component {
    render() {
        return (
            <div className={style.container}>
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

