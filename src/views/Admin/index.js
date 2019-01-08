import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import List from './List'
import Create from './Create'
import Post from './Post'
import Edit from './Edit'

const propTypes = {
  match: PropTypes.object.isRequired,
}

const Admin = ({ match }) => {
  return (
    <Switch>
      <Route component={List} exact path={`${match.path}/`} />
      <Route component={Post} exact path={`${match.path}/list/:slug`} />
      <Route component={Create} exact path={`${match.path}/create`} />
      <Route component={Edit} exact path={`${match.path}/list/:slug/edit`} />
    </Switch>
  )
}

Admin.propTypes = propTypes

export default Admin
