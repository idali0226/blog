import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Dropdown, Menu } from 'semantic-ui-react'

import { logout } from '../../actionCreators/authActions'

const mapDispatchToProps = {
  logout,
  push,
}

const propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

class TopMenu extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(event) {
    event.preventDefault()
    this.props.logout()
    this.props.push('/')
  }

  render() {
    const { authenticated } = this.props

    return (
      <Menu inverted>
        <Menu.Item as={NavLink} exact name="home" to="/" />
        {authenticated ? (
          <Dropdown item text="Manage Posts">
            <Dropdown.Menu>
              <Dropdown.Item
                as={NavLink}
                text="Create Post"
                to="/admin/create"
              />
              <Dropdown.Item as={NavLink} text="List" to="/admin" />
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
        <Menu.Menu position="right">
          {authenticated ? (
            <Menu.Item
              as={NavLink}
              name="logout"
              onClick={this.handleLogout}
              to="/"
            />
          ) : (
            <Menu.Item as={NavLink} name="login" to="/login" />
          )}
        </Menu.Menu>
      </Menu>
    )
  }
}
TopMenu.propTypes = propTypes
export default connect(null, mapDispatchToProps)(TopMenu)
