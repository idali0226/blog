import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { LoginForm } from '../Form'
import Templete from '../Templete'

import { login } from '../../actions/authActions'

const mapDispatchToProps = {
  login,
}

const propTypes = {
  header: PropTypes.string,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
}

const defaultProps = {
  header: undefined,
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(value) {
    this.props.login(value)
    this.props.history.push('/admin')
  }

  render() {
    const { header, ...rest } = this.props

    return (
      <Templete authenticated={false} header={header} {...rest}>
        <LoginForm onLogin={this.handleLogin} />
      </Templete>
    )
  }
}

Login.propTypes = propTypes
Login.defaultProps = defaultProps
export default withRouter(connect(null, mapDispatchToProps)(Login))
