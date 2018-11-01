import React from 'react'

import style from './style.scss'

export const Layout = ({ children }) => {
    return (
        <div className={style.container}>


            <img src="./images/1.jpg" alt="альтернативный текст" />
            <div className={style.header}></div>
            <div>{children}</div>
            <div className={style.footer}></div>
        </div>
    )
}
