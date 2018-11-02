import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import style from './style.css'
import { SmartBox, CommandList, Notification } from './components'
import {Console, SensorData} from '../index'

const mapStateToProps = (state) => ({
    notification: _.get(state, ['notification', 'notification']),
    smartBox: _.get(state, ['smartBox', 'smartBox'])
})

export class Content extends React.Component {
    render() {
        const { notification, smartBox } = this.props

        return (
            <div className={style.container}>
                <SmartBox list={smartBox}/>
                {notification && <Notification {...notification} />}
            </div>
        )
    }
}
