import React, { Fragment } from 'react'
import './assets/styles/global.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Routes from './Navigation/Routes'

const App: React.FC = () => (
  <Fragment>
    <Router>
      <Switch>
        <Routes />
      </Switch>
    </Router>
  </Fragment>
)

export default App
