import React from 'react'

import { Header } from './components'
import style from './style.scss'

export const Layout = ({ children }) => {
    return (
        <div className={style.test}>
            <Header />
            <div>{children}</div>
        </div>
    )
}
