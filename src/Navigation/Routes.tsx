import React from 'react'
import { Route } from 'react-router-dom'

import { Column, Footer, TopBar } from '../components'

import { Home } from '../screens/Home'
import { linksMenu } from '../helpers/topbar'

const Routes: React.FC = () => (
  <Column width='100%' height='100%'>
    <TopBar />
    <Column width='100%' height='100%'>
      <Route exact path={linksMenu.urlHome}>
        <Home />
      </Route>
      <Footer />
    </Column>
  </Column>
)

export default Routes
