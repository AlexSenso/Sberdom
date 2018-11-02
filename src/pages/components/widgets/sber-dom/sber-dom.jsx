import React from 'react'

import style from './style.css'
import { SensorData, Content, Console } from './components'

export class SberDom extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isActive: false }
    }

    handleClickPrev() {
        this.setState({ isActive: true })
    }

    handleClickClose() {
        this.setState({ isActive: false })
    }

    render() {

        if (!this.state.isActive) {
            return (
                <div className={style.prev} onClick={this.handleClickPrev.bind(this)}/>
            )
        }
        return (

            <div className={style.container}>
                <div className={style.header}>
                    <div className={style.title}>Сбербанк Умный дом</div>
                    <div className={style.close} onClick={this.handleClickClose.bind(this)} />
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

