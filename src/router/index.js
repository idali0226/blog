import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated || false,
})

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}

class PrivateRoute extends React.Component {
  render() {
    const { authenticated, component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  }
}
PrivateRoute.propTypes = propTypes
export default connect(mapStateToProps)(PrivateRoute)
