import React from 'react'

import style from './style.css'
import { SmartBox, CommandList, Notification } from './components'
import {Console, SensorData} from '../index'

export class Content extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <SmartBox />
                <Notification />
            </div>
        )
    }
}
