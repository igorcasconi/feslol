import React, { Fragment } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'

import { Column, Footer, TopBar } from 'components'
import { useUser } from 'contexts/user'

import { Home, ListNews, ListTeams, ListPlayers, Login, Dashboard } from 'screens'
import { linksMenu, linksControlPanel, controlPanel } from 'helpers/topbar'

interface RouteAuthhenticatedProps {
  path: string
}

const RouteAuthhenticated: React.FC<RouteAuthhenticatedProps> = ({ path }) => {
  const { currentToken } = useUser()
  const route = useLocation()

  return (
    <Fragment>
      {currentToken && route.pathname.includes(path) ? (
        <Route path={linksControlPanel.urlDashboard}>
          <Dashboard />
        </Route>
      ) : (
        <Redirect to={linksMenu.urlLogin} />
      )}
    </Fragment>
  )
}

const Routes = () => {
  return (
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
        <RouteAuthhenticated path={controlPanel} />
        <Footer />
      </Column>
    </Column>
  )
}

export default Routes
