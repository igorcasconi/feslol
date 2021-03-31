import React, { Fragment } from 'react'
import './assets/styles/global.css'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Routes from './Navigation/Routes'
import { UserProvider } from 'contexts/user'

import '@elastic/eui/dist/eui_theme_light.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const App: React.FC = () => (
  <Fragment>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <Switch>
            <Routes />
          </Switch>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  </Fragment>
)

export default App
