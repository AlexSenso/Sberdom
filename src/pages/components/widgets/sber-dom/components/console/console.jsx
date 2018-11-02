import React from 'react'
import { connect } from 'react-redux'

import style from './style.css'

// import {Content, SensorData} from '../index'
import { fetchSmartBox } from '../../../../../../__data__/actions'

class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}
    }

    handleSubmit(e) {
        e.preventDefault()
        const value = e.target[0]['value']
        if (value === '/getMoneyBoxes') {
            fetchSmartBox(this.props.dispatch)
        }
        if (value === '/getLastNotification') {

        }
        if (value === '/help') {

        }
        this.setState({ value: 'test' })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input defaultValue={this.state.value} className={style.console} placeholder="Введите команду" />
                <span className={style.info}>Введите /getMoneyBoxes для получения списка копилок.</span>
            </form>
        )
    }
}

export const Console = connect(null)(Component)