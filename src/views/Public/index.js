import React from 'react'
import { Route, Switch } from 'react-router-dom'

import List from './List'
import Post from './Post'
import Login from './Login'

const Public = () => (
  <Switch>
    <Route component={List} exact path="/" />
    <Route component={Login} exact path="/login" />
    <Route component={Post} exact path="/list/:slug" />
  </Switch>
)
export default Public
