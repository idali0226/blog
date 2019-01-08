import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { LoginForm } from '../Form'
import Template from '../Template'

import { login } from '../../actionCreators/authActions'

const mapDispatchToProps = {
  login,
  push,
}

const propTypes = {
  header: PropTypes.string,
  login: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
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
    this.props.push('/admin')
  }

  render() {
    const { header, ...rest } = this.props

    return (
      <Template authenticated={false} header={header} {...rest}>
        <LoginForm onLogin={this.handleLogin} />
      </Template>
    )
  }
}

Login.propTypes = propTypes
Login.defaultProps = defaultProps
export default connect(null, mapDispatchToProps)(Login)
