import React from 'react'
import _ from 'lodash'

import style from './style.css'

const list =  [
    {
        "info": "Вывести список копилок.",
        "name": "/getMoneyBoxes"
    },
    {
        "info": "Вывести последнее оповещение.",
        "name": "/getLastNotification"
    },


]

export const CommandList = ({  }) => {
    return (
        <div className={style.container}>
            {
                _.map(list, (item, index) => (
                    <div key={index} className={style.item}>
                        <div className={style.name}>{item.name}</div>
                        <div>{" - "}</div>
                        <div className={style.info}>{item.info}</div>
                    </div>
                ))
            }
        </div>
    )
}