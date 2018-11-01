import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { pages } from './pages'

export const Root = () => (
    <Router>
        <Route path="/" component={pages.Home} />
    </Router>
)
