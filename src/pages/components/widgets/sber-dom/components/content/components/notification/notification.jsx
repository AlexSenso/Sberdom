import React from 'react'

import style from './style.css'

export const Notification = ({ cash, id, info, name }) => {
    return (
        <div className={style.container}>
            <div className={style.info}>{info}</div>
            <div className={style.boxState}>
                <div className={style.name}>{name}</div>
                <div className={style.info}>{cash}</div>
            </div>
            <button className={style.action}>Закрыть</button>
        </div>
    )
}
