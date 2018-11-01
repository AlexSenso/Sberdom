import React from 'react'

import style from './style.scss'
import { SmartBox, CommandList } from './components'

export const Content = ({  }) => {
    return (
        <div className={style.container}>
            <CommandList />
        </div>
    )
}