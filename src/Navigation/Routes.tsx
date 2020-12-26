import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from '../screens/Home'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route path='/' exact component={Home} />
  </BrowserRouter>
)

export default Routes
