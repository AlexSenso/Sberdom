import React from 'react'

import { SberDom } from '../widgets/sber-dom'

import style from './style.css'

export const Layout = ({ children }) => {
    return (
        <div className={style.container}>
            <div className={style.header}></div>
            <div className={style.body}>
                {children}
                <SberDom />
            </div>
            <div className={style.footer}></div>
        </div>
    )
}
