import React from 'react'

import style from './style.scss'

export const Console = ({  }) => {
    const handleSubmit = (e) => {
        // Вынести из рендера
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit}>
            <input className={style.console} placeholder="Введите команду" />
            <span className={style.info}>Введите /help для получения полного списка команд.</span>
        </form>
    )
}