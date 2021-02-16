import React from 'react'
import { Route } from 'react-router-dom'

import { Column, Footer, TopBar } from 'components'

import { Home, ListNews, ListTeams, ListPlayers, Login } from 'screens'
import { linksMenu } from 'helpers/topbar'

const Routes: React.FC = () => (
  <Column width='100vw' height='100vh' mb='0'>
    <TopBar />
    <Column width='100%' height='100%'>
      <Route exact path={linksMenu.urlHome}>
        <Home />
      </Route>
      <Route exact path={linksMenu.urlNews}>
        <ListNews />
      </Route>
      <Route exact path={linksMenu.urlTeams}>
        <ListTeams />
      </Route>
      <Route exact path={linksMenu.urlPlayers}>
        <ListPlayers />
      </Route>
      <Route exact path={linksMenu.urlLogin}>
        <Login />
      </Route>
      <Footer />
    </Column>
  </Column>
)

export default Routes
