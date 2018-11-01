import React from 'react';

import { Header } from './components'
// import style from "./style.scss"

export const Layout = ({ children }) => {

    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    )
}