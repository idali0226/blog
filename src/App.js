import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store/configureStore'
import browserHistory from './history'

import PrivateRoute from './router'

import './styles/styles.css'

import Admin from './views/Admin'
import Public from './views/Public'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={browserHistory}>
        <Switch>
          <PrivateRoute component={Admin} path="/admin" />
          <Route component={Public} path="/" />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default App
