import React from 'react'
import _ from 'lodash'

import style from './style.scss'

const list =  [
    {
        "cash": "0 ₽",
        "info": "5 дней подряд расход электричества не выше среднего",
        "name": "Контроль потребления электричества"
    },
    {
        "cash": "100 ₽",
        "info": "4 дня подряд без открывния холодильника после ограниченного времени",
        "name": "Ограничение ночного холодильника"
    }
]

export const SmartBox = ({  }) => {
    return (
        <div className={style.container}>
            {
                _.map(list, (item, index) => (
                    <div key={index} className={style.field}>
                        <div className={style.label}>{item.name}</div>
                        <div className={style.value}>{item.cash}</div>
                    </div>
                ))
            }
        </div>
    )
}