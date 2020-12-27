import React from 'react'
import { Box } from '@material-ui/core'
import { Route } from 'react-router-dom'

import { TopBar } from '../components'

import { Home } from '../screens/Home'
import { linksMenu } from '../helpers/topbar'

const Routes: React.FC = () => (
  <Box width='100%' height='100%' position='relative'>
    <TopBar />
    <Box width='100%' mt='5rem'>
      <Route exact path={linksMenu.urlHome}>
        <Home />
      </Route>
    </Box>
  </Box>
)

export default Routes
