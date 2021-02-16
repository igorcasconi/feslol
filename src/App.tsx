import React, { Fragment } from 'react'
import './assets/styles/global.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Routes from './Navigation/Routes'
import { UserProvider } from 'contexts/user'

const App: React.FC = () => (
  <Fragment>
    <UserProvider>
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </UserProvider>
  </Fragment>
)

export default App
