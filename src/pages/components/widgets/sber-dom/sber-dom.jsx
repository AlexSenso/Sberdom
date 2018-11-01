import React from 'react'

import style from './style.scss'
import { SensorData } from './components'

export class SberDom extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <SensorData />
            </div>
        )
    }
}

