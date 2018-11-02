import React from 'react'
import _ from 'lodash'

import style from './style.css'

export const SmartBox = ({ list }) => {
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