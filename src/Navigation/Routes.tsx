import React from 'react'
import { Route } from 'react-router-dom'

import { Column, TopBar } from '../components'

import { Home } from '../screens/Home'
import { linksMenu } from '../helpers/topbar'

const Routes: React.FC = () => (
  <Column width='100%' height='100%' position='relative'>
    <TopBar />
    <Column width='100%' height='100%' mt='60px'>
      <Route exact path={linksMenu.urlHome}>
        <Home />
      </Route>
    </Column>
  </Column>
)

export default Routes
