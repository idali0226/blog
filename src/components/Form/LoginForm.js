import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'

import { TextInput } from './Fields'

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const required = value => (value ? undefined : 'Required')

class Login extends Component {
  render() {
    const {
      onLogin: handleLogin,
      handleSubmit,
      pristine,
      submitting,
    } = this.props
    return (
      <form onSubmit={handleSubmit(val => handleLogin(val))}>
        <Grid
          container
          style={{
            marginBottom: '8.5em',
            marginTop: '7em',
            paddingLeft: '10em',
            paddingRight: '10em',
          }}
        >
          <Grid.Column width={16}>
            <Field
              component={TextInput}
              name="username"
              pleaceholder="Username"
              type="text"
              validate={[required]}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field
              component={TextInput}
              name="password"
              pleaceholder="Password"
              type="password"
              validate={[required]}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Button disabled={pristine || submitting} positive type="submit">
              Login
            </Button>
          </Grid.Column>
        </Grid>
      </form>
    )
  }
}

Login.propTypes = propTypes

export default reduxForm({
  form: 'login',
})(Login)
